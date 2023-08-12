const express = require('express')
const rateLimit = require("express-rate-limit")
const mongoose = require('mongoose')
const Product = require('./models/racketModel')
const UserProduct = require('./models/userProduct')
const fs = require('fs')
const { ifError } = require('assert')
const { ObjectId } = require('mongodb')
const app = express()
const PORT = process.env.PORT || 8080
require("dotenv").config()

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
    message: "Too many requests from this IP, please try again later"
})

// Extracts/parses any Json data so we can use it into handlers
app.use(express.json());

// Limits Api call rate
app.use(limiter)

// move to environment variable file
const uri = process.env.uri

async function connect(){
    try{
        await mongoose.connect(uri)
        console.log("connected to MongoDb")
    }catch(error){
        console.error(error)
    }
}

connect()
function getItem() {
    try {
      const content = fs.readFileSync('racketList.json');
      return JSON.parse(content);
    } catch (error) {
      fs.writeFileSync('racketList.json', '{}');
      return [];
    }
}


app.get("/api", (req,res) => {
    res.json({message:"Hello from server!"})
});

app.get("/", (req,res) => {
    res.send("Hello from server!")
});

app.post("/api/rackets", limiter, (req,res) => {
    Product
    .find()
    .collation({locale: "en" })
    .sort({name: 1})
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

// Create favourite counter, then sort by favourites
app.post("/api/favRackets", limiter, (req,res) => {
    const page = req.query.p || 0
    const racketsPerPage = 3

    Product
    .find()
    .collation({locale: "en" })
    .sort({name: 1})
    .skip(page * racketsPerPage)
    .limit(racketsPerPage)
    .then((data)=>{
        res.send(data)
    })
    .catch((err)=>{
        console.log(err)
    })
})

app.get("/api/oneRacket/:id", (req, res) => {
    Product.findOne({ _id: req.params.id })
  .then((product) => {
    if (product) {
      console.log('Found product:', product);
      res.send(product)
    } else {
      console.log('Product not found');
      res.status(404).json({message:"Product not found"})
    }
  })
  .catch((error) => {
    console.error('Error finding product:', error);
    res.status(404).json({message:"Product not found"})
  });

})

// Creating user
app.post('/user', async (req, res) => {
    try {
        const user = await UserProduct.create(req.body);
        res.status(200).json(user);
    } catch(err) {
        console.log(err);
        res.status(500).json({message: err.message});
    }
});

// Deleting user
app.delete('/user/:id', async (req, res) => {
    const userId = req.params.id
    if(mongoose.Types.ObjectId.isValid(userId)){
        try{
            const result = await UserProduct.deleteOne({_id: userId})
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }else{
        res.status(400).json({error: "Invalid ObjectId format"})
    }
})

// Updating user
app.patch('/user/:id', async (req,res)=>{
    const userUpdate = req.body

    const userId = req.params.id
    if(mongoose.Types.ObjectId.isValid(userId)){
        try{
            const result = await UserProduct.updateOne({_id: userId}, {$set:userUpdate})
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }else{
        res.status(400).json({error: "Invalid ObjectId format"})
    }

    
})

// Rate limiter middleware for each Racket api request, deleting objects from DB if requests exceeds limit/flagging spam requests
const ipRequestCounts = new Map()
const clearRequestCount = (ip) => {
    ipRequestCounts.delete(ip);
  };

  const rateLimitMiddleWare = async (req, res, next) => {
    const ip = req.ip;
    const racketId = req.params.id;
    const userId = req.body.userId;

    
  
    if (ipRequestCounts.has(ip)) {
      const requestCountData = ipRequestCounts.get(ip);

      if(!requestCountData[racketId]) {
        requestCountData[racketId] = {count: 0, ip: [], _id:[]};
      }
      const requestCount = requestCountData[racketId].count;
      const product = await Product.findById(racketId)


      if (requestCount && requestCount >= 10) {
        return res.status(429).json({ error: 'Too many requests. Try again later.' });
      }
    //If multiple _ids are created under same ip and requests fall under same racket within same interval, request is most likely spam, and therefore deleted from db.   
      if(requestCountData[racketId]._id.length>=2){
        requestCountData[racketId]._id.forEach(el => {
            const deleteFromDb = async ()=>{
                if(product.favourites.includes(el)){
                    const result = await Product.updateOne({ _id: racketId }, { $pull: { favourites: el } });
                }
            }
            deleteFromDb()
        });
        return res.status(429).json({ error: 'Too many of the same requests. (≖_≖ ) Try again later.', type:'limit'});
      }
  
      // Increment the request count for the specific racketId
      requestCountData[racketId].count = (requestCount || 0) + 1;
      requestCountData[racketId].ip.push(ip)

      if(!product.favourites.includes(userId)){
        requestCountData[racketId]._id.push(userId)
      }
      
  
      console.log(`Request count for ${racketId}: ${requestCountData[racketId].count}/n ip:${requestCountData[racketId].ip}`);
    } else {
      ipRequestCounts.set(ip, { [racketId]: {count:1, ip:[ip], _id:[userId]} });
    }
  
    // Clear the request count for the IP address after 60 seconds
    setTimeout(() => {
      clearRequestCount(ip);
    }, 180000);
  
    next();
  };

app.patch('/favouriteRacket/:id', rateLimitMiddleWare, async (req, res) => {
    const racketId = req.params.id;
    const userId = req.body.userId;

    if (mongoose.Types.ObjectId.isValid(racketId)) {
        try {
            const product = await Product.findById(racketId);

            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }

            if (product.favourites.includes(userId)) {
                // If userId is already a favourite, remove it
                const result = await Product.updateOne({ _id: racketId }, { $pull: { favourites: userId } });
                res.status(200).json({message:`Item Removed: ${result}`, type:'removed'});
            } else {
                // If userId is not a favourite, add it
                const result = await Product.updateOne({ _id: racketId }, { $push: { favourites: userId } });
                res.status(200).json({message:`Item Added: ${result}`, type:'added'});
            }
        } catch (err) {
            console.log(err);
            res.status(500).json({ message: err.message });
        }
    } else {
        res.status(400).json({ error: "Invalid ObjectId format" });
    }
})

// app.patch('/wishRacket/:id', rateLimitMiddleWare, async (req, res) => {
//     const racketId = req.params.id;
//     const userId = req.body.userId;

//     if (mongoose.Types.ObjectId.isValid(userId)) {
//         try {
//             const product = await UserProduct.findById(userId);

//             if (!product) {
//                 res.status(404).json({ error: "User not found" });
//                 return;
//             }

//             if (product.wishList.includes(racketId)) {
//                 // If userId is already a favourite, remove it
//                 const result = await Product.updateOne({ _id: userId }, { $pull: { favourites: racketId } });
//                 res.status(200).json({message:`Item Removed: ${result}`, type:'removed'});
//             } else {
//                 // If userId is not a favourite, add it
//                 const result = await Product.updateOne({ _id: userId }, { $push: { favourites: racketId } });
//                 res.status(200).json({message:`Item Added: ${result}`, type:'added'});
//             }
//         } catch (err) {
//             console.log(err);
//             res.status(500).json({ message: err.message });
//         }
//     } else {
//         res.status(400).json({ error: "Invalid ObjectId format" });
//     }
// })


// Getting user
app.get('/user/:id', async (req,res)=>{

    const userId = req.params.id
    if(mongoose.Types.ObjectId.isValid(userId)){
        try{
            const result = await UserProduct.findOne({_id: userId})
            res.status(200).json(result)
        }catch(err){
            console.log(err);
            res.status(500).json({message: err.message})
        }
    }else{
        res.status(400).json({error: "Invalid ObjectId format"})
    }
})

// Getting Most favourite rackets
app.get('/communityFavourites', async (req,res)=>{
    Product
        .aggregate([{
                $project:{
                    _id:1,
                    favourites:1,
                    favouritesCount: {$size: '$favourites'},
                    name:1,
                    label:1,
                    url:1,
                    cost:1,
                },
            },
            {
                $sort: {favouritesCount:-1, name:1},
            },
            {
                $limit:10,
            }
        ])
        .collation({locale: "en" })
        .then((data)=>{
            res.send(data)
        })
        .catch((err)=>{
            console.log(err)
        })
})

// test
app.listen(PORT, () => {
    console.log(`Server is listening on ${PORT}`)
})

app.post('/product', async(req,res)=>{
    try {
        const product = await Product.create(req.body)
        // await collection.insertOne(product);
        res.status(200).json(product)
    }catch(error){
        console.log(error.message)
        res.status(500).json({message: error.message})
    }
})

app.post('/import', async(req,res)=>{
    const data = getItem()

    await Promise.all(data.map(async (item)=>{
        const product = await Product.create(item)
    }))
    res.status(200).json(data)
})


// test
// test


    // useEffect(()=>{
    //     const fetchData = async () => {
    //         try {
    //           const response = await fetch('/import', {
    //             method: 'POST',
    //             headers: {
    //               'Content-Type': 'application/json'
    //             }
    //           });
    //           const data = await response.json();
    //           console.log('Response:', data);
        
    //           if (response.ok) {
    //             console.log('Success');
    //           } else {
    //             console.error('Fail');
    //           }
    //         } catch (error) {
    //           console.error('Error:', error);
    //         }
    //       };
        
    //       fetchData();
    // },[])
  
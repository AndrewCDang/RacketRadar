import { useEffect, useContext } from "react";
import { RacketContext } from "../App"



function RacketData(){
    const [state, dispatch] = useContext(RacketContext)

    useEffect(()=>{
        const fetchData = async () =>{
            try{
                const response = await fetch('/api/rackets', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                const data = await response.json()
                dispatch({type:'racketList', payload: data})
            }catch(error){
                console.error('Error:', error)
            }
    
        }

        fetchData()
    },[])

    return(null)

}

export default RacketData;


// Fetching single document

// const fetchOne = async () => {
//     try {
//       const response = await fetch('/api/oneRacket/64b2f3930f8a48255f09e16f');
//       const data = await response.json();
//       console.log(data);
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };


// fetchOne()
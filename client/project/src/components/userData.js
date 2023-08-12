import { useEffect, useContext } from "react";
import { RacketContext } from "../App";

const UserData = () => {
    const [state, dispatch] = useContext(RacketContext)

    const importFavourites = (favList) => {
        dispatch({type:'importFavRackets', payload:favList})
    }

    useEffect(()=>{
        const createUser = async () => {
          const createUser = await fetch('/user',{
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            }
          })
    
          const data = await createUser.json()    
          const dataJSON = JSON.stringify(data)
          localStorage.setItem("userId",dataJSON)    
        }
        
        const userId = localStorage.getItem("userId")
        if(userId == null){
          createUser()
        }else{
          const userData = JSON.parse(userId)
          if(userData.userFav.length>0){
            importFavourites(userData.userFav)
          }
          if(userData.userStats.length>0){
            dispatch({type:'importUserStats', payload:{flex:userData.userStats[0].flex, balance:userData.userStats[0].balance}})
          }
          if(userData.wishList.length>0){
            dispatch({type:'importWishList', payload:userData.wishList})
          }
        }
    },[])

}

export default UserData
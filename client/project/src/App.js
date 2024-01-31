
import React from 'react';
import { createContext, useReducer } from 'react';
import { Route, Routes} from "react-router-dom"
import './App.css';
import NavBar from './components/navBar'
import HomePage from './components/homePage';
import CommunityFav from './components/communityFav'
import Notification from './components/notification'
import RacketItem from "./components/racketItem";
import RacketData from './context/racketData'



export const RacketContext = createContext()

function App() {

  const updateLocalStorage = async (userId) =>{
    try{
      const response = await fetch(`api/user/${userId}`,{
        method:'GET',
        headers:{
          'Content-Type': 'application/json'
        }
      })
      if(!response.ok){
        throw new Error('Failed to get User Object')
      }
      const data = await response.json()
      localStorage.setItem("userId", JSON.stringify(data))

    }catch(err){
      console.log(err)
    }
  }

  const updateRacket = (type, payload) =>{
    const userId = JSON.parse(localStorage.getItem("userId"))._id
    console.log(userId)

    const updateFavAdd = async () =>{
      try{
        const response = await fetch(`api/user/${userId}`,{
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userFav: payload })
        })
        if(!response.ok) {
          throw new Error('Failed to update user favorite.');
        }
        const data = await response.json();
        console.log("User favorite updated successfully:", data)
      }catch(err){
        console.log(err)
      }
    }

    const updateUserStats = async () =>{
      try{
        const response = await fetch(`api/user/${userId}`,{
          method:'PATCH',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ userStats: payload })
        })
        if(!response.ok) {
          throw new Error('Failed to update user favorite.');
        }
        const data = await response.json();
        console.log("User favorite updated successfully:", data)
      }catch(err){
        console.log(err)
      }
    }

    const updateWishRackets = async () =>{
      try{
        const response = await fetch(`api/user/${userId}`,{
          method:'PATCH',
          headers: {
            'Content-Type':'application/json'
          },
          body: JSON.stringify({ wishList: payload})
        })
        if(!response.ok) {
          throw new Error('Failed to update user wish-list.');
        }
        const data = await response.json();
      }catch(err){
        console.log(err)
      }
    }

    switch (type){
      case 'fav':
        updateFavAdd()
        break;
      case 'stats':
        updateUserStats()
        break;
      case 'wish':
        updateWishRackets()
        break;
      default:
        break;
    }
    
    updateLocalStorage(userId)
  }

  const reducer = (state, action) => {
    switch(action.type){
      case 'racketFilter': 
        return {...state, filterValues: action.payload }
      case 'racketList':
        return {...state, racketList: action.payload }
      case 'menuSelection':
        return {...state, menuSelection: action.payload }
      case 'filterSelection':
        console.log(action.payload)
        return {...state, filterSelection: action.payload }
      case 'userRacket':
        return {...state, userRacket: action.payload }
      case 'selectRacket':
        if(!action.payload.condition){
          return {...state, selectedRackets:{condition: false, objects: [...state.selectedRackets.objects, action.payload.objects]}}
        }else{
          return {...state, selectedRackets:{condition: true, objects:action.payload.objects}}
        }
      case 'deleteId':
        return {...state, deleteId: action.payload }
      case 'userStats':
        updateRacket('stats', [action.payload])
        return {...state, userStats: action.payload }
      case 'favRackets':
        if(!state.favRackets.includes(action.payload)){
          updateRacket('fav',[...state.favRackets, action.payload])
          return {...state, favRackets: [...state.favRackets, action.payload] }
        }else{
          const delIndex = state.favRackets.indexOf(action.payload)
          const newFavArray = state.favRackets.slice()
          newFavArray.splice(delIndex,1)
          updateRacket('fav',newFavArray)
          return {...state, favRackets: newFavArray }
        }
      case 'wishRackets':
        if(!state.wishRackets.includes(action.payload)){
          updateRacket('wish',[...state.wishRackets, action.payload])
          return {...state, wishRackets: [...state.wishRackets, action.payload] }
        }else{
          const delIndex = state.wishRackets.indexOf(action.payload)
          const newWishArray = state.wishRackets.slice()
          newWishArray.splice(delIndex,1)
          updateRacket('wish', newWishArray)

          return {...state, wishRackets: newWishArray}
        }
      case 'importFavRackets':
        return {...state, favRackets: action.payload}
      case 'importWishList':
        return {...state, wishRackets: action.payload}
      case 'importUserStats':
        return {...state, userStats: action.payload}
      case 'favouriteToggle':
        return {...state, favouriteToggle: !state.favouriteToggle}
      case 'favouriteToggleOff':
        return {...state, favouriteToggle: false}
      case 'wishToggle':
        return {...state, wishToggle: !state.wishToggle}
      case 'wishToggleOff':
        return {...state, wishToggle: false}
      case 'cardAnimation':
        return {...state, cardAnimation: action.payload}
      case 'navUnderline':
          return {...state, navUnderline: action.payload}
      case 'selectedRacketsFromNav':
        return {...state, selectedRackets:{condition:false, objects:[...state.selectedRackets.objects]}}
      case 'clientNotification':
          return {...state, clientNotification:action.payload}
      case 'scrolledFirstItem':
          return {...state, scrolledFirstItem:true}
      default:
        throw new Error()
    }
    }

  const [state, dispatch] = useReducer(reducer, {racketList:{}, filterValues:{null:null}, menuSelection:{searchMenu: false}, filterSelection:{filterMenu: false}, userRacket:{userRacket: false}, favouriteToggle:false, wishToggle:false, selectedRackets:{condition: false, objects:[]}, deleteId: {deletedId:'', deletedFrom:''}, userStats:{flex:'',balance:''}, favRackets: [], wishRackets: [], cardAnimation:true, navUnderline:{width:0, start:0}, clientNotification:'', scrolledFirstItem:false})

  return (
    <main className="App">
        <RacketContext.Provider value={[state, dispatch]}>
        < NavBar />
        <Routes>
          <Route path="/" element={ <HomePage /> } />
          <Route path="/community" element = { <CommunityFav /> } />
          <Route path="/racket/:racketId" element={<RacketItem />} />
        </Routes>
        < RacketData />
        < Notification />
        </RacketContext.Provider>
    </main>
  );
} 


export default App;

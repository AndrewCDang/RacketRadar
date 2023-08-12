import React, { useEffect, useRef, useState } from 'react'
import { useContext } from 'react'
import { RacketContext } from '../App'
import StickySearch from './stickySearch'
import StickyBtns from './stickyBtns'
import UserFav from './userFav'
import UserWish from './userWish'

function StickyBtn(){
    // Context
    const [state, dispatch] = useContext(RacketContext)
      
    // Search Sttes
    const [searchValue, setSearchValue] = useState('')

    const handleSearch = (event) => {
        setSearchValue(event.target.value);
    };

    // References
    const racketsRef = useRef()
    const searchRef = useRef()
    const userFavRef = useRef()
    const userWishRef = useRef()
    const userFavIcon = useRef()
    const userWishIcon = useRef()
    const searchBarRef = useRef()
    const searchButton = useRef(null)

    // Filter States
    const NONE= { display: 'none' }

    return(
        <aside className="sticky-container">
            < StickySearch searchBarRef={searchBarRef} NONE={NONE} searchRef={searchRef} handleSearch={handleSearch} racketsRef={racketsRef} searchValue={searchValue} />
            < UserFav userFavRef = {userFavRef}/>
            < UserWish userWishRef = {userWishRef} userWishIcon={userWishIcon}/>
            < StickyBtns userFavIcon={userFavIcon} userFavRef = {userFavRef} userWishRef = {userWishRef} userWishIcon={userWishIcon} searchButton={searchButton} searchRef={searchRef}  /> 
        </aside>

    )
}

export default StickyBtn
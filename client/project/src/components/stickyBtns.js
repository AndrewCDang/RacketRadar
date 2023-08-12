import React, {useCallback, useContext, useEffect, useMemo, useState, useRef} from 'react';
import { RacketContext } from '../App'


const StickyBtns = ({searchButton, searchRef,userFavRef, userFavIcon, userWishIcon, userWishRef,}) =>{

    const [state,dispatch] = useContext(RacketContext)
    const isTouch = useMemo(()=>{
        return matchMedia('(hover: none)').matches;
    },[])

    const checkMenu = useCallback((e) =>{
        if(e.key === 'Escape'){
            if(state.favouriteToggle){
                dispatch({type:'favouriteToggleOff'})
            }
            else if(state.menuSelection.searchMenu){
                dispatch({type:'menuSelection', payload:{searchMenu: false}})
            }
            return
        }
        if(searchButton && searchRef.current){
            if(!searchButton.current.contains(e.target) && !searchRef.current.contains(e.target)){
                if(state.menuSelection.searchMenu){
                    dispatch({type:'menuSelection', payload:{searchMenu: false}})
                }
            }
        }
        if(userFavRef){
            if(!userFavRef.current.contains(e.target) && !userFavIcon.current.contains(e.target)){
                if(state.favouriteToggle){
                    dispatch({type:'favouriteToggleOff'})
                }
            }
        }
        if(userWishRef){
            if(!userWishRef.current.contains(e.target) && !userWishIcon.current.contains(e.target)){
                if(state.wishToggle){
                    dispatch({type:'wishToggleOff'})
                }
            }
        }
    
    },[state.menuSelection.searchMenu, state.favouriteToggle, state.wishToggle]);
    
    useEffect(() => {
        const handleClick = (e) => checkMenu(e);
    
        window.addEventListener('click', handleClick);

        window.addEventListener('keydown', handleClick);
    
        return () => {
            window.removeEventListener('click', handleClick);
            window.removeEventListener('keydown', handleClick);

        };
    }, [checkMenu]);

    const searchToggle = useMemo(()=>{
        if(state.menuSelection.searchMenu == true){
            return true 
        }else{
            return false
        }
    },[state.menuSelection.searchMenu])
    

    const searchText = useRef()
    const favText = useRef()
    const wishText = useRef()

    const [ favWidth, setfavWidth ] = useState(0)
    const [ favHover, setFavHover ] = useState(false)
    
    const [ searchWidth, setSearchWidth ] = useState(0)
    const [ searchHover, setSearchHover ] = useState(false)


    const [ wishWidth, setWishWidth ] = useState(0)
    const [ wishHover, setWishHover ] = useState(0)

    
    
    const resetFavWidth = useCallback(()=>{
        if (favText.current) {
            setTimeout(()=>{
                setfavWidth(favText.current.offsetWidth)
            },0)
        }
    },[favText])

    const resetWishWidth = useCallback(()=>{
        if (wishText.current) {
            setTimeout(()=>{
                setWishWidth(wishText.current.offsetWidth)
            },0)
        }
    },[wishText])

    const resetSearchWidth = useCallback(()=>{
        if (searchText.current) {
            setTimeout(()=>{
                setSearchWidth(searchText.current.offsetWidth)
            },0)
          }
    },[searchText])



    useEffect(() => {

        if (userFavIcon.current && !isTouch) {
          const expandFav = () => {
            resetFavWidth();
            setFavHover(true);
          };
          const favLeave = () => {
            setFavHover(false);
          };
          userFavIcon.current.addEventListener('mouseenter', expandFav);
          userFavIcon.current.addEventListener('mouseleave', favLeave);
      
          return () => {
            if(userFavIcon.current){
                userFavIcon.current.removeEventListener('mouseenter', expandFav);
                userFavIcon.current.removeEventListener('mouseleave', favLeave);
            }
          };
        }
      }, [userFavIcon]);

      useEffect(() => {

        if (userWishIcon.current && !isTouch) {
          const expandWish = () => {
            resetWishWidth();
            setWishHover(true);
          };
          const wishLeave = () => {
            setWishHover(false);
          };
          userWishIcon.current.addEventListener('mouseenter', expandWish);
          userWishIcon.current.addEventListener('mouseleave', wishLeave);
      
          return () => {
            if(userWishIcon.current){
                userWishIcon.current.removeEventListener('mouseenter', expandWish);
                userWishIcon.current.removeEventListener('mouseleave', wishLeave);
            }
          };
        }
      }, [userWishIcon]);
    
      useEffect(() => {
        if (searchButton.current && !isTouch) {
          const expandSearch = () => {
            resetSearchWidth();
            setTimeout(()=>{
                setSearchHover(true);
            },0)
          };
          const searchLeave = () => {
            setSearchHover(false);
          };
          searchButton.current.addEventListener('mouseenter', expandSearch);
          searchButton.current.addEventListener('mouseleave', searchLeave);
    
          return() => {
            if(searchButton.current){
                searchButton.current.removeEventListener('mouseenter', expandSearch);
                searchButton.current.removeEventListener('mouseleave', searchLeave);
            }
          };
        }
      }, [searchButton]);
        
    return(
        <section className="sticky">
            <article ref={searchButton}  className="circle-container" onClick={()=>!searchToggle ? dispatch({type:'menuSelection', payload:{searchMenu: true,filterMenu: false,addMenu: false}}) : dispatch({type:'menuSelection', payload:{searchMenu: false,filterMenu: false,addMenu: false}}) }>
                <div style={{width: searchHover ? `${searchWidth +  16 + 50}px` : null }} className="search-circle circle-container-outline">
                    <div ref={searchText} className="hover-text">Search Racket</div>
                </div>
                <svg version="1.1" id="search-icon" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                    viewBox="0 0 408.1 408">
                    <path d="M402,372L298,268c51-65,46-160-14-219C253,18,211,0,166,0S80,17,49,49C17,80,0,122,0,166s17,86,49,118c31,31,73,49,118,49
                    c37,0,73-12,102-35l104,104c4,4,9,6,15,6c6,0,11-2,15-6C410,394,410,380,402,372z M78,254c-23-23-36-55-36-88s13-64,36-88
                    c24-23,55-36,88-36s64,13,88,36c48,49,48,127,0,176c-23,23-55,36-88,36C133,291,102,278,78,254z"/>
                </svg>
            </article>
            <article ref={userWishIcon} className="circle-container" onClick={()=>dispatch({type:'wishToggle'})}>
                <div style={{width: wishHover ? `${wishWidth +  16 + 50}px` : null }} className="filter circle-container-outline">
                    <div ref={wishText} className="hover-text">View rackets in Wish-list</div>
                </div>
                <svg className="sticky-svg-heart" data-name="Layer 1" viewBox="0 0 666.67 597.43">
                    <path d="M80.87,331.56l191.21,205.83c33.08,35.61,89.44,35.61,122.52,0l191.21-205.83c63.38-68.22,63.38-178.84,0-247.06-63.38-68.22-166.14-68.22-229.52,0h0c-12.39,13.34-33.51,13.34-45.9,0h0c-63.38-68.22-166.14-68.22-229.52,0-63.38,68.22-63.38,178.84,0,247.06Z"/>
                </svg>
            </article>
            <article ref={userFavIcon} className="circle-container" onClick={()=>dispatch({type:'favouriteToggle'})}>
                <div style={{width: favHover ? `${favWidth +  16 + 50}px` : null }} className="filter circle-container-outline">
                    <div ref={favText} className="hover-text">View my favourite rackets</div>
                </div>
                <svg className="sticky-svg-star" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <path style={{strokeWidth:4}} d="M38.144 12.6219C38.8158 10.949 41.1841 10.949 41.8559 12.6219L47.8081 27.4441C48.0941 28.1565 48.7628 28.6422 49.5287 28.6942L65.4647 29.7747C67.2634 29.8967 67.9952 32.149 66.6118 33.3049L54.3544 43.5461C53.7652 44.0383 53.5099 44.8243 53.6972 45.5688L57.594 61.0588C58.0338 62.8071 56.1178 64.1992 54.591 63.2406L41.0634 54.7478C40.4132 54.3396 39.5867 54.3396 38.9365 54.7478L25.4089 63.2406C23.882 64.1992 21.9661 62.8071 22.4059 61.0588L26.3027 45.5688C26.49 44.8243 26.2346 44.0383 25.6455 43.5461L13.3881 33.3049C12.0047 32.149 12.7365 29.8967 14.5352 29.7747L30.4712 28.6942C31.2371 28.6422 31.9057 28.1565 32.1918 27.4441L38.144 12.6219Z"  strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </article>
        </section>
    )
}

export default StickyBtns
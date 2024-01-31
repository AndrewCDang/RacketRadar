import React from 'react';
import { useCallback, useRef, useState, useLayoutEffect, useContext } from 'react'
import { Link } from "react-router-dom"
import { RacketContext } from '../App'



const NavBar = () => {
    const [state, dispatch] = useContext(RacketContext)
    
    const homeRef = useRef()
    const communityRef = useRef()

    const [ navWidth, setNavWidth ] = useState()
    const [ navStart, setNavStart ] = useState(0)
    const [ underlineLoad, setUnderlineLoad ] = useState(true)

    useLayoutEffect(()=>{
        // setNavWidth(homeRef.current.offsetWidth)
        dispatch({type:'navUnderline', payload:{width:homeRef.current.offsetWidth,start:0}})
        setTimeout(()=>{
            setUnderlineLoad(false)

        },0)
    },[homeRef])


    const setUnderline = useCallback((nav) => {
        switch (nav) {
            case 'home':
                // setNavWidth(homeRef.current.offsetWidth)
                // setNavStart(0)
                dispatch({type:'navUnderline', payload:{width:homeRef.current.offsetWidth,start:0}})
                break;
                
            case 'community':
                // setNavWidth(communityRef.current.offsetWidth)
                // setNavStart(homeRef.current.offsetWidth + 24)
                dispatch({type:'navUnderline', payload:{width:communityRef.current.offsetWidth,start:homeRef.current.offsetWidth + 24}})

                break;
        
            default:
                break;
        }

    },[homeRef, communityRef])

    const disableAnimation = () =>{
        if(state.cardAnimation == true){
            dispatch({type:'selectedRacketsFromNav'})
            dispatch({type:'cardAnimation', payload:false})
        }
    }

 




    return(
        <nav className='navBar-container'>
            <div>
                <Link to="/" onClick={()=> setUnderline('home')} className='title'>Racket Radar</Link>
                <div style={{marginBottom:'8px'}} className='subtitle'>Find your next badminton racket</div>
                <div className='subtitle title-header-text'>
                    <svg className="title-svg" data-name="Layer 1" viewBox="0 0 666.67 597.43">
                        <path d="M80.87,331.56l191.21,205.83c33.08,35.61,89.44,35.61,122.52,0l191.21-205.83c63.38-68.22,63.38-178.84,0-247.06-63.38-68.22-166.14-68.22-229.52,0h0c-12.39,13.34-33.51,13.34-45.9,0h0c-63.38-68.22-166.14-68.22-229.52,0-63.38,68.22-63.38,178.84,0,247.06Z"/>
                    </svg>
                    <a>Add rackets to your wish-list</a>
                </div>
                <div className='subtitle title-header-text'>
                    <svg className="title-svg-star" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                            <path d="M38.144 12.6219C38.8158 10.949 41.1841 10.949 41.8559 12.6219L47.8081 27.4441C48.0941 28.1565 48.7628 28.6422 49.5287 28.6942L65.4647 29.7747C67.2634 29.8967 67.9952 32.149 66.6118 33.3049L54.3544 43.5461C53.7652 44.0383 53.5099 44.8243 53.6972 45.5688L57.594 61.0588C58.0338 62.8071 56.1178 64.1992 54.591 63.2406L41.0634 54.7478C40.4132 54.3396 39.5867 54.3396 38.9365 54.7478L25.4089 63.2406C23.882 64.1992 21.9661 62.8071 22.4059 61.0588L26.3027 45.5688C26.49 44.8243 26.2346 44.0383 25.6455 43.5461L13.3881 33.3049C12.0047 32.149 12.7365 29.8967 14.5352 29.7747L30.4712 28.6942C31.2371 28.6422 31.9057 28.1565 32.1918 27.4441L38.144 12.6219Z"  strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <a>Favourite rackets you own and reccommend to others</a>
                </div>


            </div>
            <div className="nav-container">
                <div className="nav-link-container">
                    <Link to="/" ref={homeRef} onClick={()=> setUnderline('home')} className="nav-link" >Home</Link>
                    <Link to="/community" ref={communityRef} onClick={()=> {setUnderline('community'); disableAnimation()}} className="nav-link">Community Favourites</Link>
                </div>
                <span style={{width: state.navUnderline.width, transition: underlineLoad ? 'none' : 'width 0.2s ease-out, transform 0.4s ease-out', transform:`translateX(${state.navUnderline.start}px)`}} className="nav-underline"></span>
            </div>
        </nav>
    )
}

export default NavBar
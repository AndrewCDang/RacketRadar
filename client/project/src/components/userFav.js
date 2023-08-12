import { useContext, useMemo, useEffect, useRef, useCallback } from 'react'
import { RacketContext } from '../App'

const UserFav = ({userFavRef}) => {    
    const [state, dispatch] = useContext(RacketContext)

    const racketList = useMemo(()=>{
        return state.racketList
    },[state.racketList])

    const favArray = useMemo(()=>{
        if(state.favRackets.length>0){
            return state.favRackets
        }
    },[state.favRackets])

    const racketFavList = useMemo(()=>{
        if(favArray){
            const filteredArray = Array.from(racketList).filter((el)=>{
                if(favArray.includes(el._id)){
                    return el
                }
            })
            return filteredArray
        }
    }, [racketList, favArray])

    const viewToggle = useMemo(()=>{
        let array = [];
        if(racketFavList){
            racketFavList.forEach(element => {
                if(state.selectedRackets.objects.includes(element._id)){
                    array.push(true)
                }else{
                    array.push(false)
                }
            })
        }
        return array

    },[racketFavList, state.selectedRackets.objects])

    const viewRacket = (id) => {
        if(!state.selectedRackets.objects.includes(id)){
            dispatch({type:'selectRacket', payload:{condition:false, objects: id}})
        }else{
            dispatch({type:'deleteId', payload: {deletedId: id, deletedFrom:'landing'}})
        }

    }

    const favToggle = useMemo(()=>{
        return state.favouriteToggle
    },[state.favouriteToggle])

    // const userFavRef = useRef();
    
    // const checkFav = useCallback((e) => {
    //     if(userFavRef.current){
    //         if(!userFavRef.current.contains(e.target)){
    //             if(favToggle){
    //                 console.log(userFavRef.current)
    //                 dispatch({type:'favouriteToggleOff'})
    //             }
    //         }
    //     }
    // }, [favToggle]);
    
    // useEffect(() => {
    //     const handleClick = (e) => checkFav(e);
    
    //     window.addEventListener('click', handleClick);
    
    //     return () => {
    //         window.removeEventListener('click', handleClick);
    //     };
    // }, [checkFav]);

    
// !buttonActive[index] ? dispatch({type:'selectRacket', payload:{condition:false, objects: racket._id}}) : dispatch({type:'deleteId', payload: {deletedId: racket._id, deletedFrom:'landing'}
    return(
        <article ref={userFavRef}   className='userFav-container' style={{display: favToggle? 'block' : 'none', transition: 'all 0.6s ease-out'} }>
            <section className='userFav-section'>
                <div className='userFav-title'>My Favourite Rackets</div>
                <div className="f-close-container" title='Close' onClick={()=>dispatch({type:'favouriteToggle'})}>
                    <svg className="filter-close"  viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                    </svg>
                </div>
                <div className="userFav-Scroll">
                    {
                    racketFavList ? racketFavList.map((el,index)=>{
                        return(
                            <section key={index} className='userFav-item'>
                                <div className='userFav-svg-container'>
                                    <div className='userFav-svg-ctn' onClick={()=>viewRacket(el._id)} title="View Racket Details" >
                                        <svg stroke={viewToggle[index] ? 'white' : 'grey'} className='userFav-svg'   viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M71.0144 39.9996C69.8841 37.582 68.4643 35.2823 66.7672 33.1542C60.271 25.0082 50.4189 20.2637 39.9998 20.2637C29.5807 20.2637 19.7286 25.0082 13.2324 33.1542C11.5348 35.2828 10.1148 37.5832 8.98438 40.0014"   strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M71.0144 39.9995C69.884 42.4177 68.4639 44.7181 66.7664 46.8467C60.2702 54.9927 50.4181 59.7372 39.9989 59.7372C29.5798 59.7372 19.7277 54.9927 13.2315 46.8467C11.5344 44.7186 10.1146 42.4189 8.98438 40.0013"   strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M35.3092 49.7415C38.2736 51.1691 41.7268 51.1691 44.6912 49.7415C47.6556 48.3139 49.8086 45.6142 50.5408 42.4064C51.2729 39.1987 50.5045 35.8321 48.4531 33.2597C46.4016 30.6872 43.2904 29.189 40.0002 29.189C36.71 29.189 33.5988 30.6872 31.5473 33.2597C29.4959 35.8321 28.7275 39.1987 29.4596 42.4064C30.1918 45.6142 32.3448 48.3139 35.3092 49.7415Z"  strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    <div className='userFav-svg-ctn' title="Remove from Favourites" onClick={()=>{dispatch({type:'favRackets', payload: el._id})}}>
                                        <svg stroke='grey' className='userFav-svg' viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M61 20L56.3735 64.4144C56.1612 66.4521 54.4437 68 52.395 68H27.605C25.5563 68 23.8388 66.4521 23.6265 64.4144L19 20"  strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M65 20H15"  strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M27.8555 19.9986L33.926 12.3865H46.0747L52.1452 19.9986"  strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                </div>
                                <p onClick={()=>viewRacket(el._id)}  className='userFav-txt'><a>{el.name}</a>&nbsp;&nbsp;&nbsp;{el.label}</p>
                            </section>
                        )
                    }):
                    <div className='userFav-item'>
                        <p className='userFav-txt'>No rackets currently favourited </p>
                    </div>
                }
                </div>
            </section>

        </article>
    )
}

export default UserFav


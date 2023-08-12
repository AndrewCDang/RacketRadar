import React,{useState, useRef, useMemo, useLayoutEffect, useCallback} from "react";
import errorImage from '../images/error-racket.png'



const CardProfiles = ({el, toggleOpacity, dispatchDelete, toggleAnimation, translateState, opacityState, index, invsRef, contentRef, imgRefs, cardToggle, tag1, tag2, tag3, flexChart, balanceChart, difficultyChart, linearRefs, setCardToggle, cardStyle, setcardStyle, textRefs, state, dispatch, cardTextHeight, setCardTextHeight}) =>{

    // Images
    const imageUrl = useMemo(()=>{
        const imageUrl = `${process.env.PUBLIC_URL}/images/${el.name.replace(/\s+/g, '')}.png`;
        return imageUrl;
    },[])
    

    

    // const [state, dispatch] = useContext(RacketContext)
    const [racketObject, setRacketObject] = useState()
    const [ cardHeightToggle, setCardHeightToggle ] = useState(true)
    const [maxHeight,setMaxHeight] = useState('1000px')

    const localRef = useRef()    
    const copyHeightRef = useRef()



    useLayoutEffect(()=>{
        if (el) {
            const racketImport = (
                <div
                    className='dot-btns-container' 
                    style={{
                        left: `calc(${el.balance}% - 22px)`,
                        top: `calc(${100 - el.stiff}% - 22px)`,
                        transition: 'transform 0.3s ease-out',
                    }}
                >
                    
                    <div className='card-graph-racket-dot'>
                        
                        <div className='card-graph-dot-bg'>
                            <div style={{
                                backgroundImage:
                                    `radial-gradient(at 25% 100%, hsla(183,95%,43%,1) 0px), 
                                    radial-gradient(at 85% 25%, hsla(97,77%,60%,1) 0px), 
                                    radial-gradient(at 35% 20%, hsla(43,100%,66%,1) 0px), 
                                    radial-gradient(at 75% 100%, hsla(347,100%,66%,1) px,}%)`,
                                transition: "all 0.3s ease-in-out",
                                }} 
                            className='card-icon-dot-bg'></div>
                        </div>
                    </div>
                </div>
            );
            setRacketObject(racketImport)
        }
    },[state.selectedRackets.objects])  


    const favItem = useMemo(()=>{
        let condition = false;
        state.favRackets.forEach(item => {
            if(el._id == item){
                condition = true
            }
        });
        return condition
    }, [state.favRackets, state.selectedRackets.objects])

    const wishItem = useMemo(()=>{
        let condition = false;
        state.wishRackets.forEach(item=>{
            if(el._id == item){
                condition = true
            }
        })
        return condition
    },[state.wishRackets, state.selectedRackets.objects])


    const [ clickedHeart, setClickedHeart ] = useState(false)
    const [ clickedStar, setClickedStar ] = useState(false)

    const toggleHeart = () =>{
        setClickedHeart(true)
        setTimeout(()=>{
            setClickedHeart(false)
        },250)
    }

    const toggleStar = () =>{
        setClickedStar(true)
        setTimeout(()=>{
            setClickedStar(false)
        },250)
    }

    const appendFavWish = async (type, racketId, label) => {
        const userIdJSON = localStorage.getItem("userId");
        
        if (!userIdJSON) {
            console.log('User ID not found in local storage.');
            return;
        }
        
        const userId = JSON.parse(userIdJSON)._id;
        
        const updateFav = async () => {
            try{
                const response = await fetch(`/favouriteRacket/${racketId}`, {
                    method: 'PATCH',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({userId: userId})
                });
                
                if (!response.ok) {
                    const error = await response.json()
                    if(error.type =='limit'){
                        dispatch({type:'clientNotification', payload:'Too many of the same requests. (≖_≖ )\nTry again later.'})
                    }
                    console.log('Failed to update user favorite.');
                    return;
                }
        
                const data = await response.json();
                const type = data.type
                if(type == 'added'){
                    dispatch({type:'clientNotification', payload:`${label} added to Favourites`})
                }
    
                console.log("User favorite updated successfully:", data);
    
    
            } catch(err) {
                console.log(err);
            }  
        }
        updateFav()
    }
    const clientNotification = useCallback((name,id)=>{
        if(!state.wishRackets.includes(id)){
            dispatch({type:'clientNotification', payload:`${name} added to Wish-list`})
        }
    },[state.wishRackets])

    useLayoutEffect(()=>{
        if(localRef){
            if(cardTextHeight[0]==0){
                console.log(localRef.current.offsetHeight)
                setCardTextHeight([localRef.current.offsetHeight])
                setMaxHeight(localRef.current.offsetHeight + 48)
            }else{
                setCardTextHeight([...cardTextHeight,localRef.current.offsetHeight])
                setMaxHeight(localRef.current.offsetHeight + 48)
            }
        }
    },[localRef])

    const toggleText = () => {
        if(cardHeightToggle){
            localRef.current.style.display ='block'
            setCardHeightToggle(!cardHeightToggle)
    
        }else{
            setCardHeightToggle(!cardHeightToggle)
            setTimeout(()=>{
                localRef.current.style.display ='-webkit-box'
            },210)
           
        }

    }

    return(
        <article style={{transition: toggleAnimation ? 'all 0.5s ease' : toggleOpacity, order: 100 - index, opacity: opacityState[index] ? 1 : 0, transform: toggleAnimation ? translateState[index] : 'translate(0px,0px)'}} ref={el => invsRef.current[index+1]=el} className="card-box" key={index}>
            <div ref={el=>contentRef.current[index]=el} onClick={(e)=>{const newArray = [...cardToggle]; newArray[index]=!newArray[index]; setCardToggle(newArray); const newStyleArray = [...cardStyle]; newStyleArray[index]= imgRefs.current[index].offsetHeight - contentRef.current[index].offsetHeight; setcardStyle(newStyleArray);}} className="img-container">
                <img ref={el=>imgRefs.current[index]=el}  src={imageUrl} alt={`${el.name} Image`} onError={(e) => e.target.src = errorImage} className="card-thumbnail"></img>
            </div>
            <content style={{transform: cardToggle[index] ? `translateY(${cardStyle[index]}px)` : `translateY(0px)`, transition: 'transform 0.3s ease'}} className="card-row-2">
                <div className="card-tag-container">
                    <div className="card-tag">{tag1}</div>
                    <div className="card-tag">{tag2}</div>
                </div>
                <div className="card-title-container">
                    <p className="card-title">{el.brand}</p>
                    <p className="card-title">{el.name}</p>
                    <p className="card-price">£{el.cost}</p>
                </div>
                <p ref={copyHeightRef} className="card-text card-absolute">
                    {el.description}
                </p>
                <div className="card-text-container"  style={{ transition: 'all 0.2s ease-in-out',overflow:'hidden', maxHeight: cardHeightToggle ? cardTextHeight[index] ? maxHeight : '1000px' : `${copyHeightRef.current.offsetHeight + 48}px`}}>
                    <p ref={localRef} className="card-text">
                        {el.description}
                    </p>
                    <div className="card-text-toggler">
                        {(cardTextHeight) ? (cardTextHeight[index] >= 175) ? <div onClick={()=>{toggleText()}}><a>{cardHeightToggle ? 'Expand Text' : 'Collapse Text'}</a></div> : null : null}
                    </div>
                </div>
                <article className="card-graph-main-container">
                    <article className='card-graph'>
                        <section className='graph-dots-container'>
                            <>{racketObject}</>
                        </section>
                        <div className='card-graph-text stiff'>High Stiffness</div>
                        <div className='card-graph-text flex'>High Flex</div>
                        <div className='card-graph-text heavy'>H<span>ead</span><br></br>Heavy</div>
                        <div className='card-graph-text light'>H<span>ead</span><br></br>Light</div>
                        <section className='graph-container'>
                            <div className='card-circle-1'></div>
                            <div className='card-circle-2'></div>
                            <div className='card-circle-3'></div>
                            <div className='card-vertical-line'></div>
                            <div className='card-horizontal-line'></div>
                        </section>
                    </article>
                </article>
                <div style={{opacity: cardToggle[index] ? '0' : 1, transition: 'opacity 0.3s ease'}} className="charts-container">
                    <div className='chart-group'>
                        <p>{tag2 ? tag2 : '-'}</p>
                        <div className="chart-container">
                            <svg className="chart-back-container" viewBox="0 0 36 36">
                                <path className="chart-back"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <svg viewBox="0 0 36 36">
                                <path style={flexChart} className="chart"
                                    d="M18 2.0845
                                    a 15.9155 15.9155 0 0 1 0 31.831
                                    a 15.9155 15.9155 0 0 1 0 -31.831"
                                />
                            </svg>
                            <div className="chart-score">
                            <div>
                                <div>
                                    {el.stiff}%  
                                </div>
                                    <div className="chart-circle-text bold">Stiffness</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='chart-group'>
                    <p>{tag1 ? tag1 : '-'}</p>
                    <div className="chart-container">
                        <svg className="chart-back-container" viewBox="0 0 36 36">
                            <path className="chart-back-bal"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <svg viewBox="0 0 36 36">
                            <path style={balanceChart} className="chart-bal"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="chart-score">
                            <div>
                                <div>
                                    {el.balance}%  
                                </div>
                                    <div className=" chart-circle-text bold">Balance</div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='chart-group'>
                    <p>{tag3 ? tag3 : '-'}</p>
                    <div className="chart-container">
                        <svg className="chart-back-container" viewBox="0 0 36 36">
                            <path className="chart-back"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <svg viewBox="0 0 36 36">
                            <path style={difficultyChart} className="chart"
                                d="M18 2.0845
                                a 15.9155 15.9155 0 0 1 0 31.831
                                a 15.9155 15.9155 0 0 1 0 -31.831"
                            />
                        </svg>
                        <div className="chart-score">
                            <div>
                                <div>
                                    {el.difficulty}%  
                                </div>
                                    <div className="chart-circle-text bold">Difficulty</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </content>
        <div className="card-linear" ref={el=>linearRefs.current[index]=el} style={{opacity: cardToggle[index] ? '0' : 1, transition: 'opacity 0.3s ease'}} ></div>
        <aside className="card-circle-container">
            <div  className="card-circle c-1" onClick={(e)=>{{dispatchDelete(index)}; dispatch({type:'deleteId', payload: {deleteId: el._id, deletedFrom:'card'}}); }} title="Close">
                <div className="card-outline">
                    <svg className="card-svg" viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                        <path  d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                    </svg>
                </div>
            </div>
            <div  className="card-circle c-2" title="Wish Racket">
                <div className="card-outline" onClick={()=>{dispatch({type:'wishRackets', payload: el._id}); toggleHeart(); clientNotification(el.name,el._id) }}>
                    <svg className={`card-svg svg-heart ${clickedHeart ? 'clickSvg' : null}`} data-name="Layer 1" viewBox="0 0 666.67 597.43" >
                    <defs>
                        <linearGradient id="MyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                            <stop offset="10%" stop-color="hsl(183, 95%, 43%)" />
                            <stop offset="33%" stop-color="#87e84b" />
                            <stop offset="66%" stop-color="#FFD056" />
                            <stop offset="100%" stop-color="#FF5678" />
                        </linearGradient>
                    </defs>
                    <path style={{fill: wishItem == true ? 'url(#MyGradient)' : 'none', transition: 'all 0.2s ease'}}  className="cls-1" d="M80.87,331.56l191.21,205.83c33.08,35.61,89.44,35.61,122.52,0l191.21-205.83c63.38-68.22,63.38-178.84,0-247.06-63.38-68.22-166.14-68.22-229.52,0h0c-12.39,13.34-33.51,13.34-45.9,0h0c-63.38-68.22-166.14-68.22-229.52,0-63.38,68.22-63.38,178.84,0,247.06Z"/>
                    <path style={{stroke: wishItem == true ? 'url(#MyGradient)' : 'rgba(20,20,20,0.5'}} className="cls-2" d="M80.87,331.56l191.21,205.83c33.08,35.61,89.44,35.61,122.52,0l191.21-205.83c63.38-68.22,63.38-178.84,0-247.06-63.38-68.22-166.14-68.22-229.52,0h0c-12.39,13.34-33.51,13.34-45.9,0h0c-63.38-68.22-166.14-68.22-229.52,0-63.38,68.22-63.38,178.84,0,247.06Z"/>
                    </svg>
                </div>
            </div>
            <div  className="card-circle c-2" title="Favourite-list Racket">
                <div className="card-outline" onClick={()=>{dispatch({type:'favRackets', payload: el._id}); toggleStar();appendFavWish('fav',el._id, el.label)}}>
                    <svg className={`card-svg fav-heart ${clickedStar ? 'clickSvg' : null}`}  viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="MyGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="10%" stop-color="hsl(183, 95%, 43%)" />
                                <stop offset="33%" stop-color="#87e84b" />
                                <stop offset="66%" stop-color="#FFD056" />
                                <stop offset="100%" stop-color="#FF5678" />
                            </linearGradient>
                        </defs>
                        <path style={{fill: favItem == true ? 'url(#MyGradient)' : 'none', transition: 'all 0.2s ease'}}   d="M38.144 12.6219C38.8158 10.949 41.1841 10.949 41.8559 12.6219L47.8081 27.4441C48.0941 28.1565 48.7628 28.6422 49.5287 28.6942L65.4647 29.7747C67.2634 29.8967 67.9952 32.149 66.6118 33.3049L54.3544 43.5461C53.7652 44.0383 53.5099 44.8243 53.6972 45.5688L57.594 61.0588C58.0338 62.8071 56.1178 64.1992 54.591 63.2406L41.0634 54.7478C40.4132 54.3396 39.5867 54.3396 38.9365 54.7478L25.4089 63.2406C23.882 64.1992 21.9661 62.8071 22.4059 61.0588L26.3027 45.5688C26.49 44.8243 26.2346 44.0383 25.6455 43.5461L13.3881 33.3049C12.0047 32.149 12.7365 29.8967 14.5352 29.7747L30.4712 28.6942C31.2371 28.6422 31.9057 28.1565 32.1918 27.4441L38.144 12.6219Z"  stroke-linecap="round" stroke-linejoin="round" />
                    </svg>
                </div>
            </div>
        </aside>
    </article>
    )
}

export default CardProfiles
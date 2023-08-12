import { useContext, useEffect, useMemo, useRef, useState, useLayoutEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { RacketContext } from '../App';
import errorImage from '../images/error-racket.png'



const RacketItem = () => {
    const { racketId } = useParams();
    const [ state, dispatch ] = useContext(RacketContext)
    const [cardToggle, setCardToggle] = useState(false)
    const [cardStyle, setcardStyle] = useState([])
    const imgRefs = useRef()
    const textRefs = useRef()
    const [racketIcon, setRacketIcon] = useState()

    const racketObject = useMemo(()=>{
        if(state.racketList.length>0){
            const object = state.racketList.find(el=>el.label == racketId)
            return object

        }
    },[state.racketList])

    const tag1 = useMemo(()=>{
        if(racketObject){
            if(racketObject.balance >= 40 && racketObject.balance <= 60){
                return 'Balanced'
            }else if(racketObject.balance >60){
                return 'Head Heavy'
            }else if(racketObject.balance <40){
                return 'Head Light'
            }
        }
    },[racketObject]);

    const tag2 = useMemo(()=>{
        if(racketObject){
        if(racketObject.stiff > 40 && racketObject.stiff <= 60){
            return 'Medium Flex'
        }else if(racketObject.stiff >=60){
            return 'High Stiff'
        }else if(racketObject.stiff <=40){
            return 'Low Flex'
        }}
    },[racketObject]);

    const tag3 = useMemo(()=>{
        if(racketObject){
        if(racketObject.difficulty > 65 && racketObject.difficulty <= 75){
            return 'Intermediate'
        }else if(racketObject.difficulty > 75){
            return 'Advanced'
        }else if(racketObject.difficulty <40){
            return 'Beginner'
        }else if(racketObject.difficulty >= 40 && racketObject.difficulty <= 65){
            return 'Novice'
        }}
    },[racketObject]);

    const flexChart = useMemo(()=>{
        if(racketObject){
            return ({"stroke-dashoffset": `-${100-racketObject.stiff}`})
        }
    },[racketObject]) 

    const balanceChart = useMemo(()=>{
        if(racketObject){
            return({"stroke-dashoffset": `-${100-racketObject.balance}`})
        }
    },[racketObject]) 

    const difficultyChart = useMemo(()=>{
        if(racketObject){
            return({"stroke-dashoffset": `-${100-racketObject.difficulty}`})
        }
    },[racketObject]) 

    useLayoutEffect(()=>{
        if (racketObject) {
            const racketImport = (
                <div
                    className='dot-btns-container' 
                    style={{
                        left: `calc(${racketObject.balance}% - 22px)`,
                        top: `calc(${100 - racketObject.stiff}% - 22px)`,
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
            setRacketIcon(racketImport)
        }
    },[racketObject])  

    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1);
    };


    const copyHeightRef = useRef()
    const [ cardTextHeight, setCardTextHeight ] = useState(0)
    const [maxHeight,setMaxHeight] = useState('1000px')
    const [ cardHeightToggle, setCardHeightToggle ] = useState(true)




    useLayoutEffect(()=>{
        if(textRefs.current){
                setCardTextHeight(textRefs.current.offsetHeight)
                setMaxHeight(textRefs.current.offsetHeight + 48)
        }
    },[textRefs.current])


    const toggleText = () => {
        if(cardHeightToggle){
            textRefs.current.style.display ='block'
            setCardHeightToggle(!cardHeightToggle)
    
        }else{
            setCardHeightToggle(!cardHeightToggle)
            setTimeout(()=>{
                textRefs.current.style.display ='-webkit-box'
            },210)
        }

    }
    

    return(
        racketObject ? 
        <article className='racketItem-container'>
            <div className='racketItem-relative'>
                <div className="marg-btm card-box" >
                <div className="card-img-container">
                    <img ref={el=>imgRefs.current=el}  src={racketObject.url} alt={`${racketObject.name} Image`} onError={(e) => e.target.src = errorImage} className="item-thumb card-thumbnail"></img>
                </div>
                <div style={{transform: cardToggle ? `translateY(${cardStyle}px)` : `translateY(0px)`, transition: 'transform 0.3s ease'}} className="card-row-2">
                    <div className="card-title-container">
                        <p className="card-title">{racketObject.name}</p>
                            {/* <div className="indiv-card-tag-container">
                                <div className="card-tag">{tag1}</div>
                                <div className="card-tag">{tag2}</div>
                            </div> */}
                        <p className="card-price">£{racketObject.cost}</p>
                    </div>
                    <p ref={copyHeightRef} className="card-text card-absolute">
                        {racketObject.description}
                    </p>
                    <div className="card-text-container" style={{ transition: 'all 0.2s ease-in-out',overflow:'hidden', maxHeight: cardHeightToggle ? cardTextHeight ? maxHeight : '1000px' : `${copyHeightRef.current.offsetHeight + 48}px`}} >
                        <p className="card-text" ref={textRefs}>
                            {racketObject.description}
                        </p>
                        <div className="card-text-toggler">
                            {(cardTextHeight >= 175) ? <div onClick={()=>{toggleText()}}><a>{cardHeightToggle ? 'Expand Text' : 'Collapse Text'}</a></div> : null}
                        </div>
                    </div>
                    <article className="card-graph-main-container">
                        <article className='card-graph'>
                            <section className='graph-dots-container'>
                                <>{racketIcon}</>
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
                    <div style={{opacity: cardToggle ? '0' : 1, transition: 'opacity 0.3s ease'}} className="charts-container">
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
                                            {racketObject.stiff}%  
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
                                            {racketObject.balance}%  
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
                                <   div>
                                        <div>
                                            {racketObject.difficulty}%  
                                        </div>
                                            <div className="chart-circle-text bold">Difficulty</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <button className='racketItem-back' onClick={()=>handleGoBack()} title='Back to prev page'>
                <svg width="56" height="56" viewBox="0 0 80 80" xmlns="http://www.w3.org/2000/svg">
                    <path d="M40.3432 28.9995L19.6569 28.9995C17.5694 28.9995 16.524 26.4756 18.0001 24.9995L27.8787 15.1209C29.0503 13.9493 30.9498 13.9493 32.1214 15.1209L42.0001 24.9995C43.4762 26.4756 42.4307 28.9995 40.3432 28.9995Z"  stroke-linecap="round" stroke-linejoin="round" />
                    <path d="M30 29L30 39C30 54.464 42.536 67 58 67L66 67"  stroke-linecap="round" stroke-linejoin="round" />
                </svg>
            </button>
        </div>
    </article>
    : null
    )
}

export default RacketItem

import React, { useContext, useEffect, useState, useRef, useCallback, useMemo } from 'react'
import './loadingSpin.css'
import { RacketContext } from '../App'


function Landing(){

    const [state, dispatch] = useContext(RacketContext)
    const [racketObjects, setRacketObjects] = useState()
    const [currentZIndex, setCurrentZIndex] = useState(1000)
    const [bgIconCol, setBgIconCol ] = useState([])
    const [buttonActive, setButtonActive] = useState([])
    const [falseObjects, setFalseObjects] = useState([])
    const [ defZIndex, setDefZIndex ] = useState([]);
    const [count, setCount ] = useState(0)
    const [ userDot, setUserDot ] = useState()
    const [ displayIcon, setDisplayIcon ] = useState([])
    const [ scaleIcon, setScaleIcon ] = useState([])
    const [ focusIndex, setFocusIndex ]= useState()

    const dotRef = useRef([])
    const dotBtnRef = useRef([])
    const dotBack = useRef([])

    const NONE = {display: 'none'}

    useEffect(()=>{
        if(state.racketList){
            const defaultFilter = Object.values(state.racketList).map((el)=>{
                return true
            })
            setDisplayIcon(defaultFilter)
            setScaleIcon(defaultFilter)
        }
    },[state.racketList])

    const toggleFunction = useCallback((filter) => {
        setScaleIcon(filter)
    }, [scaleIcon])

    useEffect(()=>{
        if(Object.values(state.filterValues)[0]){
          const filter = Object.values(state.racketList).map((el, index)=>{
            let filterItem = true
            if(!(el.cost >= state.filterValues.cost.min && el.cost <= state.filterValues.cost.max )){
                filterItem = false
            }
            if(!(el.stiff >= state.filterValues.stiff.min && el.stiff <= state.filterValues.stiff.max )){
                filterItem = false
            }
            if(!(el.balance >= state.filterValues.balance.min && el.balance <= state.filterValues.balance.max )){
                filterItem = false
            }
            if(!(el.difficulty >= state.filterValues.difficulty.min && el.difficulty <= state.filterValues.difficulty.max )){
                filterItem = false
            }
            if(state.filterValues.bestSelling){
                if(!el.bestSelling){
                    filterItem = false
                }
            }
            if(state.filterValues.currentlySelected){
                if(state.selectedRackets.objects.length==0){
                    filterItem = false
                }
                state.selectedRackets.objects.forEach((obj)=>{
                    if(!(obj == el._id)){
                        filterItem = false
                    }
                })
            }
            if(state.filterValues.brandSelected){
                if(!state.filterValues.brandSelected.includes(el.brand.toLowerCase())){
                    filterItem = false
                }
            }
            return filterItem
          })
        toggleFunction(filter)
        }
    },[state.filterValues])

    
    useMemo(()=>{
        if (state.racketList.length) {

            const buttonActiveArray = state.racketList.map(()=>{
                return false
            })
            setFalseObjects(buttonActiveArray)

            const zIndexDef = state.racketList.map((el,index)=>{
                return index
            })
            setDefZIndex(zIndexDef)
    }
    },[state.racketList])

    useEffect(()=>{
    },[state.selectedRackets.objects])

    useEffect(()=>{
            if(state.selectedRackets.objects && state.selectedRackets.objects.length>0){
                const list = state.racketList
                const indexesId = state.selectedRackets.objects
                indexesId.filter(item => item !== undefined )
                
                const matchedIndexes = []
                list.forEach((el,index)=>{
                    indexesId.forEach((id)=>{
                        if(el._id.indexOf(id) !== -1 ){
                            matchedIndexes.push(index)
                        }
                    })
                })
                const updatedActive = [...falseObjects]
                matchedIndexes.forEach((el)=>{
                    updatedActive[el] = true
                })
                setButtonActive(updatedActive)
            }else if(state.selectedRackets.objects && state.selectedRackets.objects.length==0){
                let falseCheck = false
                buttonActive.map((el)=>{
                    if(el == true){
                        falseCheck = true
                    }
                })
                if(falseCheck){
                    setButtonActive(falseObjects)
                }
            }
    }, [state.selectedRackets.objects, state.selectedRackets.deleteId,])

    const [forceUpdate, setForceUpdate] = useState(0);


    useEffect(()=>{

        const sendBack = (e, index) => {
            setDefZIndex(prevZIndex => {
                const newZIndex = [...prevZIndex];
                newZIndex[index] = -1000 - count;
                return newZIndex;
            });
            setCount(prev => prev + 1)
            setForceUpdate(prev => prev + 1);

            if(dotRef.current[index].classList.contains('z-hover')){
                dotRef.current[index].classList.remove('z-hover')
            }

        }


        if (state.racketList.length) {
            const racketImport = state.racketList.map((racket, index) => {    
              return (
                <div key={index} ref={el=>dotRef.current[index]=el} onClick={(e)=>{
                    if (!e.target.classList.contains('dot-btn-a')) {
                        const zArray = defZIndex
                        zArray[index] = currentZIndex;
                        setFocusIndex(index)
                        setDefZIndex(zArray)                       
                        setCurrentZIndex(prev => prev + 1);
                        console.log(window.innerWidth)
                      }
                    }}
                    className='dot-btns-container' 
                    style={{
                    display: displayIcon[index] ? 'block' : 'none',
                    transform: scaleIcon[index] || buttonActive[index] ? 'scale(1)' : 'scale(0)',
                    left: `calc(${racket.balance}% - 22px)`,
                    top: `calc(${100 - racket.stiff}% - 22px)`,
                    transition: 'transform 0.3s ease-out ',
                    zIndex: buttonActive[index] && defZIndex == index ? state.racketList.length + index : defZIndex[index],
                }}>
                    <div key={index} className='graph-racket-dot'>
                        <div className={focusIndex==index ? 'graph-dot-animation-outline' : 'graph-test'}></div>
                         <div className='graph-dot-bg graph-def'>
                            <a>{racket.label}</a>
                            <div style={{
                                backgroundImage:
                                    `radial-gradient(at 25% 100%, hsla(183,95%,43%,1) 0px, transparent ${racket.balance - 20}%), 
                                    radial-gradient(at 85% 25%, hsla(97,77%,60%,1) 0px, transparent ${100-racket.stiff - 20}%), 
                                    radial-gradient(at 35% 20%, hsla(43,100%,66%,1) 0px, transparent ${racket.stiff - 20}%), 
                                    radial-gradient(at 75% 100%, hsla(347,100%,66%,1) 0px, transparent ${100 - racket.balance - 10}%)`,
                                transition: "all 0.3s ease-in-out",
                                opacity: buttonActive[index] ? 1 : 0,
                                border: buttonActive[index] ? '3px solid white' : 'unset' ,
                                }} 
                            className={`icon-dot-bg ${buttonActive[index] ? 'icon-dot-ani' : ''}`}></div>
                        </div>
                        
                    </div>
                    <div style={{
                        backgroundImage:
                            `radial-gradient(at 25% 100%, hsla(183,95%,43%,1) 0px, transparent ${racket.balance - 20}%), 
                            radial-gradient(at 85% 25%, hsla(97,77%,60%,1) 0px, transparent ${100-racket.stiff - 20}%), 
                            radial-gradient(at 35% 20%, hsla(43,100%,66%,1) 0px, transparent ${racket.stiff - 20}%), 
                            radial-gradient(at 75% 100%, hsla(347,100%,66%,1) 0px, transparent ${100 - racket.balance - 10}%)`,
                        transition: "all 0.3s ease-in-out",
                        opacity: buttonActive[index] ? 1 : 0,
                        }} 
                        className='icon-dot-bg-blur'>
                    </div>
                    <div className='dot-btns' style={NONE} ref={el => dotBtnRef.current[index] = el}>
                        <a className='dot-btn-a' onClick={()=>{!buttonActive[index] ? dispatch({type:'selectRacket', payload:{condition:false, objects: racket._id}}) : dispatch({type:'deleteId', payload: {deletedId: racket._id, deletedFrom:'landing'}})}}>
                        <svg className='svg-compare'  viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M71.0144 39.9996C69.8841 37.582 68.4643 35.2823 66.7672 33.1542C60.271 25.0082 50.4189 20.2637 39.9998 20.2637C29.5807 20.2637 19.7286 25.0082 13.2324 33.1542C11.5348 35.2828 10.1148 37.5832 8.98438 40.0014"  strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M71.0144 39.9995C69.884 42.4177 68.4639 44.7181 66.7664 46.8467C60.2702 54.9927 50.4181 59.7372 39.9989 59.7372C29.5798 59.7372 19.7277 54.9927 13.2315 46.8467C11.5344 44.7186 10.1146 42.4189 8.98438 40.0013"  strokeLinecap="round" strokeLinejoin="round" />
                                <path d="M35.3092 49.7415C38.2736 51.1691 41.7268 51.1691 44.6912 49.7415C47.6556 48.3139 49.8086 45.6142 50.5408 42.4064C51.2729 39.1987 50.5045 35.8321 48.4531 33.2597C46.4016 30.6872 43.2904 29.189 40.0002 29.189C36.71 29.189 33.5988 30.6872 31.5473 33.2597C29.4959 35.8321 28.7275 39.1987 29.4596 42.4064C30.1918 45.6142 32.3448 48.3139 35.3092 49.7415Z"  strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            <span> {buttonActive[index] ?  'Remove racket details' : 'View racket details' } </span>
                        </a>
                        <a className='dot-btn-a' ref={el=>dotBack.current[index]=el} onClick={(e) => sendBack(e, index)}>
                            <svg className='svg-back' data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 390.2 266.2">
                            <path d="M133,266C60,266,0,206,0,133S60,0,133,0s133,60,133,133-60,133-133,133Zm0-224c-50,0-91,41-91,91s41,91,91,91,91-41,91-91-41-91-91-91h0Z"/>
                            <path d="M257.2,0c-39.5,0-75.3,17.6-99.7,45.4,14.2,4,27.1,11.4,37.7,21.3,16.3-15.3,38.1-24.6,62.1-24.6h0c50,0,91,41,91,91s-41,91-91,91c-23.9,0-45.8-9.4-62.1-24.6-10.5,9.9-23.4,17.3-37.7,21.3,24.4,27.7,60.2,45.4,99.7,45.4,73,0,133-60,133-133S330.2,0,257.2,0Z"/>
                            </svg>
                            <span>Send to back</span>
                        </a>
                        
                    </div>
            </div>

              );
            });
            setRacketObjects(racketImport)
        }
    },[state, currentZIndex, bgIconCol, buttonActive, state.selectedRackets.objects, state.selectedRackets.deleteId, displayIcon, scaleIcon, forceUpdate, focusIndex])  



    const handleClick = useCallback((el, e, index) => {
        const styleBtn = dotBtnRef.current[index].style.display
        switch (styleBtn) {
            case 'none':
                dotBtnRef.current[index].style.display = ''
                if(dotBtnRef.current[index].offsetWidth + e.clientX > window.innerWidth){
                    dotBtnRef.current[index].style.left = '-8px';
                    dotBtnRef.current[index].style.transform = `translateY(-50%) translateX(-${dotBtnRef.current[index].offsetWidth}px)`
                }else{
                    dotBtnRef.current[index].style.left = '56px';
                    dotBtnRef.current[index].style.transform = `translateY(-50%) translateX(-10px)`
                }
                break;
            case '':
                dotBtnRef.current[index].style.display = 'none'
                break;
        
            default:
                break;
        }
    },[])
  

    useEffect(() => {
        if (dotRef.current) {
          // Initialising array to keep track of all the event handlers 
          const handlers = [];
      
          dotRef.current.forEach((el, index) => {
            const handleClickWithIndex = (e) => handleClick(el, e, index);
      
            el.addEventListener("click", handleClickWithIndex);
            
            handlers.push(handleClickWithIndex);
          });
      
          return () => {
            dotRef.current.forEach((el, index) => {
                if(el){
                    el.removeEventListener("click", handlers[index]);
                }
            });
          };
        }
      }, [racketObjects]);
      

      useEffect(()=>{
        const hoverOver = (e, el) => {
            el.classList.add('z-hover')
        }
        const hoverOut = (e, el) => {
            if(el.classList.contains('z-hover')){
                el.classList.remove('z-hover')
            }
        }
       
          if (dotRef.current.length>0) {
            const handlersOver = dotRef.current.map((el)=>{
                const handleMouseOver = (e) => hoverOver(e,el);
                el.addEventListener('mouseover', handleMouseOver)
                return handleMouseOver
            })
            const handlersOut = dotRef.current.map((el)=>{
                const handleMouseOut = (e) => hoverOut(e,el);
                el.addEventListener('mouseleave', handleMouseOut)
                return handleMouseOut
            })

            return () => {
                dotRef.current.forEach((el,index)=>{
                    if(el){
                        el.removeEventListener('mouseover', handlersOver[index])
                    }
                })
                dotRef.current.forEach((el,index)=>{
                    if(el){
                        el.removeEventListener('mouseleave', handlersOut[index])
                    }
                })
            }

        }

      },[racketObjects])

      // Clicking elsewehere besides racket dot icon, whilst one is toggled on, will close that icon
      useEffect(()=>{
        const clickOutsideBtn = (e) => {
            let clickedBtn = false
            dotRef.current.map((el,index)=>{
                if(!el.contains(e.target) && dotBtnRef.current[index].style.display ==''){
                    dotBtnRef.current[index].style.display = 'none'
                }
                if(el.contains(e.target)){
                    clickedBtn = true
                }
            })
            if(!clickedBtn){
                setFocusIndex(-1)
            }
        }      

        document.addEventListener('click',clickOutsideBtn)
        return () => {
            document.removeEventListener('click',clickOutsideBtn)
        }
    },[racketObjects])

    useEffect(()=>{
        if(state.userStats.flex){
            const userItem = 
                <div 
                    className='user-dot' 
                    style={{
                    left: `calc(${state.userStats.balance}% - 22px)`,
                    top: `calc(${100 - state.userStats.flex}% - 22px)`,
                    transition: 'all 0.3s ease-out ',
                    zIndex: state.racketList.length + 100}}
                >
                    <svg width="80" height="80" viewBox="0 0 70 70" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M68 40C68 55.464 55.464 68 40 68C24.536 68 12 55.464 12 40C12 24.536 24.536 12 40 12C55.464 12 68 24.536 68 40Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path className='svg-fill' d="M58.3013 61.192C53.3935 65.4341 46.9966 68 40.0004 68C33.0041 68 26.6071 65.434 21.6992 61.1918C23.0685 58.9261 25.1923 57.1319 27.8006 56.1934C35.6862 53.3561 44.3142 53.3561 52.1998 56.1934C54.8082 57.1319 56.9321 58.9262 58.3013 61.192Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    <path className='svg-fill' d="M44.9581 46.1552C48.0026 44.6538 50.2028 41.8537 50.9413 38.5404L51.0113 38.2265C51.7558 34.8862 50.9692 31.388 48.8665 28.688L48.7564 28.5466C46.6536 25.8465 43.4227 24.2676 40.0004 24.2676C36.5781 24.2676 33.3472 25.8465 31.2445 28.5466L31.1344 28.688C29.0316 31.388 28.245 34.8862 28.9895 38.2265L29.0595 38.5404C29.798 41.8537 31.9982 44.6538 35.0427 46.1552C38.1682 47.6964 41.8327 47.6964 44.9581 46.1552Z" stroke="#C2CCDE" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </div>
        setUserDot(userItem)

        }

    },[state.userStats])

    return(
        <main className='graph-main-container'>
            {
                racketObjects ? 
                    <article className='graph'>
                        <section className='graph-dots-container'>
                            <>{racketObjects}</>
                            {userDot}
                        </section>
                        <section className='graph-container'>
                            <div className='stiff'>High Stiffness</div>
                            <div className='flex'>High Flex</div>
                            <div className='heavy'>H<span>ead</span>-Heavy</div>
                            <div className='light'>H<span>ead</span>-Light</div>

                            <div className='circle-1'></div>
                            <div className='circle-2 ani-rotate'></div>
                            <div className='circle-3 ani-rotate'></div>
                            <div className='vertical-line'></div>
                            <div className='vertical-line line-blur'></div>
                            <div className='horizontal-line'></div>
                            <div className='horizontal-line line-blur'></div>
                        </section>
                    </article>
                    :
                    <div className='graph' id="wrapper">
                        <div id="wrapper">
                            <div className="profile-main-loader w-4">
                            <div className="loader">
                                <svg className="circular-loader" viewBox="0 0 108 108" xmlns="http://www.w3.org/2000/svg">
                                    <circle className="loader-path" cx="54" cy="54" r="50" fill="none" stroke="white" strokeWidth={8} />
                                </svg>
                            </div>
                            </div>     
                        </div>  
                        <div className='loading-text'>
                            <h3>Fetching Database...</h3>
                        </div> 
                    </div>
            }
        </main>
    )
}

export default Landing;

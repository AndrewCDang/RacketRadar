import React, { useContext, useRef, useEffect, useState, useLayoutEffect } from "react";
import { RacketContext } from "../App"
import CardProfiles from './cardProfiles'
function Card(){

    const [state, dispatch] = useContext(RacketContext)

    const [ selRacketArray, setSelRacketArray ] = useState([])
    const [ selectedCards, setSelectedCards ] = useState([])
    const [placeHeight, setPlaceHeight] = useState()
    const [placeWidth, setPlaceWidth] = useState()
    const [cardToggle, setCardToggle] = useState([])
    const [cardStyle, setcardStyle] = useState([])
    const [ refBox, setRefBox ] = useState(false)
    const [ opacityState, setOpacityState ] = useState([])
    const [ toggleOpacity, setToggleOpacity ] = useState('opacity 0.5s ease')
    const [ cardTextHeight, setCardTextHeight ] = useState([0])

    const [ translateState, setTranslateState ] = useState([null])
    const [ toggleAnimation, setToggleAnimation ] = useState(false)

    const linearRefs = useRef([])
    const imgRefs = useRef([])
    const textRefs = useRef([])
    const contentRef = useRef([])
    const invsRef = useRef([])

    // Style/Animation Functions
    // Function moves current card position into next card position

      const moveRackets = () => {
        console.log(invsRef.current)
        if(state.selectedRackets.objects.length >0){
            setRefBox(true)
            setPlaceHeight(invsRef.current[1].offsetHeight)
            setPlaceWidth(invsRef.current[1].offsetWidth)
        }

        setTimeout(()=>{
            const newRefs = [...invsRef.current];
            const filteredRefs = newRefs.filter((el)=>{
                return el !== null
            })
            invsRef.current = filteredRefs;


            const yArrays = invsRef.current.map((el)=>{
                return el.getBoundingClientRect().top
            })
            const xArrays = invsRef.current.map((el)=>{
                return el.getBoundingClientRect().left
            })

            const rect = invsRef.current[0].getBoundingClientRect()

            const dX = xArrays.map((el,index)=>{
                if(index==1){
                    return rect.left - el
                }
                else{
                    return xArrays[index-1] - el
                }
            })   

            const dY = yArrays.map((el,index)=>{
                if(index==1){
                    return rect.top - el
                }
                else{
                    let dHeight;
                    if(index !==0){
                        dHeight = (invsRef.current[index].offsetHeight - invsRef.current[index-1].offsetHeight)/2
                    }
                    return yArrays[index-1] - el - dHeight
                }            
            })   

            const translateArrays = invsRef.current.map((el,index) =>{
                return `translate(${dX[index]}px, ${dY[index]}px)`
            })
            const translateArray = translateArrays.slice(1)
            setToggleAnimation(true)
            setTranslateState(translateArray)
            setTimeout(()=>{
                setRefBox(false)
            },500)
        },0)
      }
   
    useLayoutEffect(()=>{
        if(state.selectedRackets.condition == false){
            let timeout;
            state.selectedRackets.objects.length==1 ? timeout = 0 : timeout = 500;
            

            if(state.selectedRackets.objects.length>1 && state.cardAnimation){
                moveRackets()
            }
            
            setTimeout(()=>{
                    if(state.selectedRackets.objects.length>0){
                        const racketList = state.racketList
                        const selectedArray =[]
    
                        const importSelected = state.selectedRackets.objects.filter((el)=>{
                            return el !== undefined
                        })
                
                        importSelected.forEach(el => {
                            const object = racketList.find(obj => obj._id == el)
                            selectedArray.push(object)
                        });
                            setSelRacketArray(selectedArray)
                    }
                    setToggleAnimation(false)
    
                    if(state.selectedRackets.objects.length>0){
                        setTimeout(()=>{
                            let opArray = []
                            state.selectedRackets.objects.forEach(()=>{
                                opArray.push(true)
                            })
                            setOpacityState(opArray)
                        },50)
                    }
                    
                },timeout)
        }else if(state.selectedRackets.condition == true){
            const racketList = state.racketList
            const selectedArray =[]

            const importSelected = state.selectedRackets.objects
    
            importSelected.forEach(el => {
                const object = racketList.find(obj => obj._id == el)
                selectedArray.push(object)
            });
            setSelRacketArray(selectedArray)
        }

        if(state.cardAnimation == false){
            dispatch({type:'cardAnimation', payload:true})
        }

    },[state.selectedRackets.objects])

    // 2.CardToggle is an array of true/false objects, designating if the image of the card should be expanded.
    // CardStyle dynamically translates the content down, making the image fully visible

    const setExpand = () =>{
        // resetTranslations()
        let tempRacketArray = []
        selRacketArray.map(el=> {
            tempRacketArray.push(false)
        })
        setCardToggle(tempRacketArray)

        let tempStyleArray = []
        selRacketArray.map(el=> {
            tempStyleArray.push('')
        })
        setcardStyle([tempStyleArray])
    }

    // 3.Card Component Template 
    const setCards = () => {
            const selectArray = selRacketArray.map((el,index)=>{

            const imgUrl = `${process.env.PUBLIC_URL}/images/${el.name.replace(/\s+/g, '')}.png`

            let tag1;
            if(el.balance >= 40 && el.balance <= 60){
                tag1 ='Balanced'
            }else if(el.balance >60){
                tag1 ='Head Heavy'
            }else if(el.balance <40){
                tag1 ='Head Light'
            }

            let tag2;
            if(el.stiff > 40 && el.stiff <= 60){
                tag2 ='Medium Flex'
            }else if(el.stiff >=60){
                tag2 ='High Stiff'
            }else if(el.stiff <=40){
                tag2 ='Low Flex'
            }

            let tag3;
            if(el.difficulty > 65 && el.difficulty <= 75){
                tag3 ='Intermediate'
            }else if(el.difficulty > 75){
                tag3 ='Advanced'
            }else if(el.difficulty <40){
                tag3 ='Beginner'
            }else if(el.difficulty >= 40 && el.difficulty <= 65){
                tag3 ='Novice'
            }

            const flexChart = {"strokeDashoffset": `-${100-el.stiff}`}
            const balanceChart = {"strokeDashoffset": `-${100-el.balance}`}
            const difficultyChart = {"strokeDashoffset": `-${100-el.difficulty}`}
            return(
               < CardProfiles key={index} el={el} toggleOpacity={toggleOpacity} dispatchDelete={dispatchDelete} opacityState={opacityState} toggleAnimation={toggleAnimation} translateState={translateState} index={index} invsRef={invsRef} contentRef={contentRef} imgRefs={imgRefs} cardToggle={cardToggle} tag1={tag1} tag2={tag2} tag3={tag3} flexChart={flexChart} balanceChart={balanceChart} difficultyChart={difficultyChart} linearRefs={linearRefs} setCardToggle={setCardToggle} cardStyle={cardStyle} setcardStyle={setcardStyle} textRefs={textRefs} dispatch={dispatch} state={state} cardTextHeight={cardTextHeight} setCardTextHeight={setCardTextHeight} imgUrl={imgUrl}  />
            )
        })

        setSelectedCards(selectArray)   
    }


    useLayoutEffect(()=>{
        if(selRacketArray){
            setExpand()
        }
        
    },[selRacketArray])

    useEffect(() =>{
            if(state.selectedRackets.objects.length==1 && state.selectedRackets.condition==false && !state.scrolledFirstItem){
                setTimeout(function () {
                    invsRef.current[0].scrollIntoView({behavior:"smooth", block:"end"})
                    dispatch({type:'scrolledFirstItem'})
                },150)
            }
               
    },[state.selectedRackets])

    
    useLayoutEffect(()=>{
        if(selRacketArray){
            setCards()
        }
    },[selRacketArray, cardToggle, toggleAnimation, translateState, opacityState, toggleOpacity, state.favRackets, state.wishRackets, cardTextHeight])


    // Deleting Items

    const dispatchDelete = (delInd) => {

        const itemsToDelId = invsRef.current.filter((el,index)=>{
            return index <= delInd + 1
        })
        const arrangeArray = itemsToDelId.slice(1)

        const opacityDel = opacityState
        opacityDel[delInd] = false
        setOpacityState(opacityDel)

        const translateVectors = arrangeArray.map((el,index)=>{
            if(index !== delInd){
                const diffHeight = (arrangeArray[index+1].offsetHeight - el.offsetHeight)/2
                const transX = arrangeArray[index+1].getBoundingClientRect().left - el.getBoundingClientRect().left
                const transY = arrangeArray[index+1].getBoundingClientRect().top - el.getBoundingClientRect().top + diffHeight
                return {difX: transX, difY: transY}
            }else if(index == delInd){
                return null
            }
        })
        const delTranslations = translateVectors.filter((el)=>{
            return el !== null
        })

        const translateRef = translateState

        const newTransformations = translateRef.map((el,index)=>{
            if(index < delInd){
                return `translate(${delTranslations[index].difX}px, ${delTranslations[index].difY}px)`
            }else{
                return `translate(0px, 0px)`
            }
        })

        setTranslateState(newTransformations)
        setToggleAnimation(true)

        const resetTransformations = translateRef.map((el,index)=>{
            return `translate(0px, 0px)`
        })

        setTimeout(()=>{
            setToggleAnimation(false)
            setTranslateState(resetTransformations)
            
            setTimeout(()=>{
                const resetOpacity = opacityState.map((el)=>{
                    return true
                })
                setOpacityState(resetOpacity)

                const spliceArray = Array.from(selRacketArray); 
                spliceArray.splice(delInd,1)
                
                let idArray = spliceArray.map((el)=>{
                    return el._id
                })
                setToggleOpacity('unset')
                setTimeout(()=>{
                    const cardTextHeightNew = cardTextHeight
                    cardTextHeightNew.splice(delInd,1)
                    setCardTextHeight(cardTextHeightNew)
                    dispatch({type:'selectRacket', payload:{condition:true, objects: idArray}})


                    setTimeout(()=>{
                        setToggleOpacity('opacity 0.5s ease')

                      
                    },0)
                },0)
            },0)  
          

        },510)
    }


    useLayoutEffect(()=>{
        if(state.deleteId && state.deleteId.deletedFrom == 'landing'){
            const selRackets = state.selectedRackets.objects
            const delIndex = selRackets.indexOf(state.deleteId.deletedId)
            if(delIndex !== -1){
                dispatchDelete(delIndex)
            }
        }
    },[state.deleteId])

    return(
        <>
            <article className="card-racket">
                <div className="card-container">
                    <div style={{order: 103}} className="card-invs"></div>
                    <div style={{order: 102}} className="card-invs" ></div>
                    <div
                        ref={el => invsRef.current[0] = el} 
                        className='invis-card' 
                        style={{ height: refBox ? `${placeHeight}px` : '0px', width: refBox ? `${placeWidth}px` : '0px', order:101}}
                    ></div>               
                    {selectedCards}
                </div>
            </article>
        </>
    )
}

export default Card;
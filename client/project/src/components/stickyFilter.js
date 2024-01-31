import React, { useState, useEffect, useContext, useMemo, useCallback} from "react"
import { RacketContext } from '../App'


const StickyFilter = ({filterRef, NONE, inputMin, inputMax, rangeFill, rangeMin, rangeMax, bestSellingCheck, currentlySelected, setFilterValues  }) => {

    const [state, dispatch] = useContext(RacketContext)

    const [selectedRadio, setSelectedRadio] = useState('yonex victor');

    const handleRadioChange = (e) => {
        setSelectedRadio(e.target.value);
    };

    useEffect(()=>{
        if(selectedRadio){
            updateFilterValues()
        }
    },[selectedRadio])

    const updateFilterValues = useCallback( ()=> {
        const minInput = Object.values(inputMin.current)
        const maxInput = Object.values(inputMax.current)
        let filterArray = {}
        for (let i = 0; i < maxInput.length; i++) {
            switch (i) {
            case 0:
                filterArray.cost = {
                  min: minInput[i].value * 1,
                  max: maxInput[i].value *1
                };
                break;
            case 1:
                filterArray.stiff = {
                  min: minInput[i].value * 1,
                  max: maxInput[i].value * 1
                };
                break;
                case 2:
                    filterArray.balance = {
                    min: minInput[i].value * 1,
                    max: maxInput[i].value * 1
                    };
                    break;
                case 3:
                filterArray.difficulty = {
                  min: minInput[i].value * 1,
                  max: maxInput[i].value * 1
                };
                break;
        
                default:
                break;
            }
        }
        filterArray.bestSelling = bestSellingCheck.current.checked
        filterArray.currentlySelected = currentlySelected.current.checked
        filterArray.brandSelected = selectedRadio
        setFilterValues(filterArray)
        dispatch({type:'racketFilter', payload:filterArray})

    },[selectedRadio])

    // Filter Feature

    const costSliderRight = (min, max, range, minInput, maxInput, e, costMultiplier) => {
        let inputValue;
        if(e.target.value> 10 * costMultiplier){
            inputValue = 100 * e.target.value/e.target.max
        }else{
            e.target.value = 10 * costMultiplier
            inputValue = 10;
        }
        const newValue = (`${100-inputValue}%`)

        const maxCost = Math.round(inputValue/5)*5
        if(e.target.className.includes('cost')){
            maxInput.value = 3 * maxCost
        }else{
            maxInput.value = maxCost
        }

        if(max.value - min.value < costMultiplier * 10){
            if(e.target.id == "input-max"){
                min.value--
                max.value = Number(min.value) + (costMultiplier * 10)
                if(e.target.className.includes('cost')){
                    minInput.value = 3 * maxCost - 30
                }else{
                    minInput.value = maxCost - 10
                }

                if(e.target.value > 10 * costMultiplier){
                    range.style.right = `${newValue}`
                    range.style.left = `${inputValue - 10}%`
                }
            }
        }else{
            range.style.right = `${newValue}`
        }

        updateFilterValues()

    }

    const costSliderLeft = (min, max, range, minInput, maxInput, e, costMultiplier) => {
        console.log(selectedRadio)
        let inputValue;
        if(e.target.value< costMultiplier * 90){
            inputValue = 100 * e.target.value/e.target.max
        }else if(e.target.value>=costMultiplier * 90){
            inputValue = 90;
        }
        if(e.target.value != min.input){
            min.input = e.target.value
        }

        const newValue = (`${inputValue}%`)
        const minCost = Math.round(inputValue/5)*5
        if(e.target.className.includes('cost')){
            minInput.value = 3 * minCost
        }else{
            minInput.value = minCost
        }

        if(max.value - min.value < costMultiplier * 10){
            if(e.target.id == "input-min"){
            max.value++
            min.value = Number(max.value) - (costMultiplier * 10)
            if(e.target.className.includes('cost')){
                maxInput.value = 3 * minCost + 30
            }else{
                maxInput.value = minCost + 10
            }
            }
            if(min.value< costMultiplier * 90){
                range.style.left = `${newValue}`;
                range.style.right = `${100 -inputValue - 10}%`;
            }
        }else{
            range.style.left = `${newValue}`;
        }

        updateFilterValues()

    }

    let timeout;
    function clearTimer(){
        clearTimeout(timeout)
    }

    const inputLeftSet = (min, max, range, minInput, maxInput, thisValue, costMultiplier, maxLength, maxValue) => {
        if(thisValue> costMultiplier * 90){
            minInput.value = costMultiplier * 90
        }
        const newValue = Number(minInput.value)
        const currentValue = Number(min.value)
        const difference = Math.abs(newValue - currentValue)

        for(let i =0; i<=difference;i++ ){
            setTimeout(()=>{
                if(newValue>currentValue){
                min.value = currentValue + i
                range.style.left = `${(currentValue + i)/costMultiplier}%`
                range.style.right = `${100-(max.value/costMultiplier)}%`
                }
                else{
                min.value = currentValue - i
                range.style.left = `${(currentValue - i)/costMultiplier}%`
                range.style.right = `${100-(max.value/costMultiplier)}%`
                }

                if(max.value - min.value < costMultiplier * 10){
                    max.value = (Number(min.value) + costMultiplier * 10)
                    range.style.right=`${100-(100 * min.value/maxValue)-10}%`
                    maxInput.value = (Number(min.value) + costMultiplier * 10)
                }
            },500*(1 - Math.cos((i/difference * Math.PI) / 3)))
        }
        updateFilterValues()
    }

    const inputLeft = (min, max, range, minInput, maxInput, thisValue, e, costMultiplier, maxLength, minValue, maxValue) => {
                const maxChar = 3;
                if(thisValue.slice(0,1) == 0 && thisValue.length>1){
                    minInput.value = thisValue.slice((1))
                }
                else if(thisValue.slice(0,3)== costMultiplier *100){
                    minInput.value = costMultiplier * 100
                }
                else if(thisValue > costMultiplier *100){
                    minInput.value = costMultiplier * 100
                }
                else if(thisValue.length>maxLength){
                    minInput.value = minInput.value.slice(0,maxLength)
                }
                else if(thisValue==''){
                    minInput.value = 0
                    thisValue=0
                }
                if(max.value - min.value < costMultiplier * 10){
                    max.value = (Number(min.value) + costMultiplier * 10)
                    range.style.right = `${100 - 100*(thisValue/maxValue) - 10}%`
                    maxInput.value = (Number(min.value) + costMultiplier * 10)
                }
                function startTimer(){
                    timeout = setTimeout(function(){
                        inputLeftSet(min, max, range, minInput, maxInput, thisValue, costMultiplier, maxLength, maxValue)
                    },1500);
                }

                if(timeout){
                    clearTimer()
                }

                if(minInput.value > 10){
                    inputLeftSet(min, max, range, minInput, maxInput, thisValue, costMultiplier, maxLength, maxValue)
                }else{
                    startTimer()
                }
    }

    const inputRightSet = (min, max, range, minInput, maxInput, thisValue, costMultiplier, maxValue) => {
        if(thisValue<10){
            maxInput.value = 10 * costMultiplier
        }
        const newValue = Number(maxInput.value)
        const currentValue = Number(max.value)
        const difference = Math.abs(newValue - currentValue)

        for(let i =0; i<=difference;i++ ){
            setTimeout(()=>{
                if(newValue>currentValue){
                max.value = currentValue + i
                range.style.right = `${100-(currentValue + i)/costMultiplier}%`
                }
                else{
                max.value = currentValue - i
                range.style.right = `${100-(currentValue - i)/costMultiplier}%`
                }

                if(Number(max.value) - Number(min.value) < costMultiplier * 10){
                    min.value = (Number(max.value) - costMultiplier * 10)
                    range.style.left=`${(100 * max.value/maxValue)-10}%`
                    minInput.value = (Number(max.value) - costMultiplier * 10)
                }
            },500*(1 - Math.cos((i/difference * Math.PI) / 3)))
        }
        updateFilterValues()
    }

    const inputRight = (min, max, range, minInput, maxInput, thisValue, e, costMultiplier, maxLength, minValue, maxValue) => {
                const maxChar = 3;
                if(thisValue.slice(0,1) == 0 && thisValue.length>1){
                    maxInput.value = thisValue.slice((1))
                }
                else if(thisValue.slice(0,3)== costMultiplier *100){
                    maxInput.value = costMultiplier * 100
                }
                else if(thisValue > costMultiplier *100){
                    maxInput.value = costMultiplier * 100
                }
                else if(thisValue.length>maxLength){
                    maxInput.value = thisValue.slice(0,maxLength)
                }
                else if(thisValue==''){
                    maxInput.value = 0
                    thisValue=0
                }

                function startTimer(){
                    timeout = setTimeout(function(){
                        inputRightSet(min, max, range, minInput, maxInput, thisValue, costMultiplier, maxValue)
                    },1500);
                }

                if(timeout){
                    clearTimer()
                }

                if(maxInput.value.length >= maxLength){
                    inputRightSet(min, max, range, minInput, maxInput, thisValue, costMultiplier, maxValue)
                }else{
                    startTimer()
                }
    }

      // Allowing only certain imputs

      useEffect(()=>{
        const minObjects = Object.values(rangeMin.current)
        const maxObjects = Object.values(rangeMax.current)
        const rangeObjects = Object.values(rangeFill.current)
        const minInputs = Object.values(inputMin.current)
        const maxInputs = Object.values(inputMax.current)


        const rightEventListeners = () => {
            minObjects.forEach((min,i) =>{
                const max = maxObjects[i]
                const range = rangeObjects[i]
                const minInput = minInputs[i]
                const maxInput = maxInputs[i]

                let costMultiplier = 1
                    let maxLength = 2
                    let minValue = 10
                    let maxValue = 100
                    if(min.className.includes('cost')){
                        costMultiplier = 3
                        maxLength = 3
                        minValue = 30
                        maxValue = 300
                    }
                    
                min.addEventListener("input", (e)=>{
                    costSliderLeft(min, max, range, minInput, maxInput, e, costMultiplier)
                })
    
                max.addEventListener("input", (e)=>{
                    costSliderRight(min, max, range, minInput, maxInput, e, costMultiplier)
                })
    
                minInput.addEventListener("input", function(e){

                    const thisValue = this.value
                    inputLeft(min, max, range, minInput, maxInput, thisValue, e, costMultiplier, maxLength, minValue, maxValue )
                    
                })
    
                maxInput.addEventListener("input", function(e){

                    const thisValue = this.value
                    inputRight(min, max, range, minInput, maxInput, thisValue, e, costMultiplier, maxLength, minValue, maxValue )
                    
                })
            })
        }

        rightEventListeners()

        return(
            minObjects.forEach((min,i) =>{
                const max = maxObjects[i]
                const range = rangeObjects[i]
                const minInput = minInputs[i]
                const maxInput = maxInputs[i]

                let costMultiplier = 1
                let maxLength = 2
                let minValue = 10
                let maxValue = 100
                if(min.className.includes('cost')){
                    costMultiplier = 3
                    maxLength = 3
                    minValue = 30
                    maxValue = 300
                }
    
                min.removeEventListener("input", (e, costMultiplier, maxLength, maxValue)=>{
                    costSliderLeft(min, max, range, minInput, maxInput, e)
                })
    
                max.removeEventListener("input", (e, costMultiplier, maxLength, maxValue)=>{
                    costSliderRight(min, max, range, minInput, maxInput, e)
                })
    
                minInput.removeEventListener("input", function(e){
                    const thisValue = this.value
                    inputLeft(min, max, range, minInput, maxInput, thisValue )
                    
                })
    
                maxInput.removeEventListener("input", function(e){
                    const thisValue = this.value
                    inputRight(min, max, range, minInput, maxInput, thisValue, costMultiplier, maxLength, minValue, maxValue )
                })
            })
        )

    },[selectedRadio])

    // useEffect(()=>{
    //     state.filterSelection.filterMenu ? setDisplayMenu(true) : setDisplayMenu(false)
    // },[state.filterSelection])

    const closeFilter = () => {
        dispatch({type:'filterSelection', payload:{filterMenu: false}})
    }

    useEffect(()=>{
        // if(state.filterSelection.filterMenu == true){
        //     setTimeout(function () {
        //         rangeFill.current.ref3.scrollIntoView({behavior:"smooth", block:"end"})
        //     },150)
        // }

    },[state.filterSelection])

    const displayMenu = useMemo(()=>{
        if(state.filterSelection.filterMenu){
            return '1fr'
        }else{
            return '0fr'
        }
    },[state.filterSelection])


    return (
        <section style={{zIndex:100, transition: 'grid-template-rows 0.3s ease-out', display:'grid', gridTemplateRows: displayMenu} } className='filter-container' >
        <aside className="f-close-container" onClick={()=>closeFilter()}>
            <svg className="filter-close"  viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
            </svg>
        </aside>
        <article ref={filterRef} className="filterOverflow" >
            <div className="sticky-interact-2">
                <fieldset className="filter-group">
                    <div>
                        <span className='filter-title'>Cost</span>
                        <div className='filter-num-container'>
                            <div className='filter-num'>
                                <span className="sub-text">Min Cost (£)</span>
                                <input ref={el => inputMin.current.ref1 = el} type='number' defaultValue='0'></input>
                            </div>
                            <div className='filter-num filter-2'>
                                <span className="sub-text">Max Cost (£)</span>
                                <input ref={el => inputMax.current.ref1 = el}  type='number' defaultValue='300'></input>
                            </div>
                        </div>
                        <div className='range-container'>
                            <div className='range-background'></div>
                            <div  ref={el => rangeFill.current.ref1 = el} className='range-fill'></div>
                            <input ref={el => rangeMin.current.ref1 = el} id='input-min' className='cost input-range' type='range' min='0' max='300' defaultValue='0'></input>
                            <input ref={el => rangeMax.current.ref1 = el} id='input-max' className='cost input-range' type='range'min='0' max='300' defaultValue='300'></input>
                        </div>
                    </div>
                    <div>
                        <span className='filter-title'>Difficulty</span>
                        <div className='filter-num-container'>
                            <div className='filter-num'>
                                <span className="sub-text">Min Difficulty</span>
                                <input ref={el => inputMin.current.ref4 = el} type='number' defaultValue='0'></input>
                            </div>
                            <div className='filter-num filter-2'>
                                <span className="sub-text">Max Difficulty</span>
                                <input ref={el => inputMax.current.ref4 = el}  type='number' defaultValue='100'></input>
                            </div>
                        </div>
                        <div className='range-container'>
                            <div className='range-background'></div>
                            <div  ref={el => rangeFill.current.ref4 = el} className='range-fill'></div>
                            <input ref={el => rangeMin.current.ref4 = el} id='input-min' className='input-range' type='range' min='0' max='100' defaultValue='0'></input>
                            <input ref={el => rangeMax.current.ref4 = el} id='input-max' className='input-range' type='range'min='0' max='100' defaultValue='100'></input>
                        </div>
                    </div>
                </fieldset>
                <fieldset className="filter-group">
                    <div>
                        <span className='filter-title'>Stiffnesss</span>
                        <div className='filter-num-container'>
                            <div className='filter-num'>
                                <span className="sub-text">High Flex</span>
                                <input ref={el => inputMin.current.ref2 = el} type='number' defaultValue='0'></input>
                            </div>
                            <div className='filter-num filter-2'>
                                <span className="sub-text">High Stiffness</span>
                                <input ref={el => inputMax.current.ref2 = el}  type='number' defaultValue='100'></input>
                            </div>
                        </div>
                        <div className='range-container'>
                            <div className='range-background'></div>
                            <div  ref={el => rangeFill.current.ref2 = el} className='range-fill'></div>
                            <input ref={el => rangeMin.current.ref2 = el} id='input-min' className='input-range' type='range' min='0' max='100' defaultValue='0'></input>
                            <input ref={el => rangeMax.current.ref2 = el} id='input-max' className='input-range' type='range'min='0' max='100' defaultValue='100'></input>
                        </div>
                    </div>
                    <div>
                        <span className='filter-title'>Balance</span>
                        <div className='filter-num-container'>
                            <div className='filter-num'>
                                <span className="sub-text">Head <br/>Light</span>
                                <input ref={el => inputMin.current.ref3 = el} type='number' defaultValue='0'></input>
                            </div>
                            <div className='filter-num filter-2'>
                                <span className="sub-text">Head <br/>Heavy</span>
                                <input ref={el => inputMax.current.ref3 = el}  type='number' defaultValue='100'></input>
                            </div>
                        </div>
                        <div className='range-container'>
                            <div className='range-background'></div>
                            <div  ref={el => rangeFill.current.ref3 = el} className='range-fill'></div>
                            <input ref={el => rangeMin.current.ref3 = el} id='input-min' className='input-range' type='range' min='0' max='100' defaultValue='0'></input>
                            <input ref={el => rangeMax.current.ref3 = el} id='input-max' className='input-range' type='range'min='0' max='100' defaultValue='100'></input>
                        </div>
                    </div>
                </fieldset>
            </div>
            <article className='filter-display-buttons'>
                <fieldset>
                    <span className='f-button-text'>Only display  <strong>popular</strong> rackets</span> 
                    <input className="f-checkbox'" type="checkbox" onClick={()=>{updateFilterValues()}} ref={bestSellingCheck}></input>
                </fieldset>
                <fieldset>
                    <span className='f-button-text'>Only display my <strong>selected</strong> rackets</span>
                    <input className='f-checkbox' type="checkbox" onClick={()=>{updateFilterValues()}} ref={currentlySelected}></input>
                </fieldset>
                <fieldset className="f-radio">
                    <div className="f-button-text radio-item">
                        <input type="radio" id="all" name="drone" value="yonex victor" checked={selectedRadio == 'yonex victor'} onChange={(e)=>{handleRadioChange(e)}} />
                        <label htmlFor="all"><strong>All</strong> brands</label>
                    </div>
                    <div className="f-button-text radio-item">
                        <input type="radio" id="yonex" name="drone" value="yonex" checked={selectedRadio == 'yonex'} onChange={(e)=>{handleRadioChange(e)}} />
                        <label htmlFor="yonex"><strong>Yonex</strong> rackets only</label>
                    </div>

                    <div className="f-button-text radio-item">
                        <input type="radio" id="victor" name="drone" value="victor" checked={selectedRadio == 'victor'} onChange={(e)=>{handleRadioChange(e)}} />
                        <label htmlFor="victor"><strong>Victor</strong> rackets only</label>
                    </div>
                </fieldset>
            </article>
        </article>
    </section>
    )
}

export default StickyFilter
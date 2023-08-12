
import React, { useEffect, useContext, useState, useRef} from "react"
import { RacketContext } from '../App'


function UserPref(){

    const [state, dispatch] = useContext(RacketContext)
    // const diffRef = useRef([false,false,false])
    const [diffState, setDiffState] = useState({level:[null,null,null], style:[null,null,null], singleDoubles:[null,null,null], rely:[null,null,null], speedPower:[null,null,null,null,null], generationControl:[null,null,null,null,null], fitness:[null,null,null,null,null]})
    const [ stateHover, setStateHover ] =useState({level:false, style:false, singleDoubles: false, rely:false, speedPower:false, generationControl:false, fitness:false})

    const [userStats, setUserStats] = useState({stiff:null,balance:null})
    const [ firstUserSet, setFirstUserSet ] = useState(true)


    const diffRef = useRef({})
    const userRef = useRef()

    // useEffect(()=>{
    //     if(state.userRacket.userRacket == true){
    //         setTimeout(function () {
    //         userRef.current.scrollIntoView({behavior:"smooth", block:"end"})
    //         },100)
    //     }

    // },[state.userRacket])

    useEffect(()=>{
        if(diffState.level[0] !== null && diffState.style[0] !== null && diffState.singleDoubles[0] !== null && diffState.rely[0] !== null && diffState.speedPower[0] !== null && diffState.generationControl[0] !== null && diffState.fitness[0] !== null  ){
            let level;
            let style;
            let singleDoubles;
            let rely;
            let speedPower;
            let generationControl;
            let fitness;

            if(diffState.level[0] == false){
                level = {flex:30,balance:30}
            }else if(diffState.level[1] == false){
                level = {flex:60, balance:50}
            }else if(diffState.level[2] == false){
                level = {flex:80, balance:55}
            }
            
            if(diffState.style[0] == false){
                style = {flex:80, balance:70}
            }else if(diffState.style[1] == false){
                style = {flex:50, balance:50}
            }else if(diffState.style[2] == false){
                style = {flex:50, balance:30}
            }
            
            if(diffState.singleDoubles[0] == false){
                singleDoubles = {flex:70,balance:70}
            }else if(diffState.singleDoubles[1] == false){
                singleDoubles = {flex:50, balance:50}
            }else if(diffState.singleDoubles[2] == false){
                singleDoubles = {flex:50, balance:30}
            }
            
            if(diffState.rely[0] == false){
                rely = {flex:10,balance:15}
            }else if(diffState.rely[1] == false){
                rely = {flex:5, balance:0}
            }else if(diffState.rely[2] == false){
                rely = {flex:-10, balance:0}
            }
            
            if(diffState.speedPower[0] == false){
                speedPower = {flex:0,balance:20}
            }else if(diffState.speedPower[1] == false){
                speedPower = {flex:0, balance:-10}
            }else if(diffState.speedPower[2] == false){
                speedPower = {flex:0, balance:0}
            }else if(diffState.speedPower[3] == false){
                speedPower = {flex:0, balance:10}
            }else if(diffState.speedPower[4] == false){
                speedPower = {flex:0, balance:20}
            }
            
            if(diffState.generationControl[0] == false){
                generationControl = {flex:-20,balance:0}
            }else if(diffState.generationControl[1] == false){
                generationControl = {flex:-10, balance:0}
            }else if(diffState.generationControl[2] == false){
                generationControl = {flex:0, balance:0}
            }else if(diffState.generationControl[3] == false){
                generationControl = {flex:5, balance:0}
            }else if(diffState.generationControl[4] == false){
                generationControl = {flex:10, balance:0}
            }
            
            if(diffState.fitness[0] == false){
                fitness = {flex:-10,balance:0}
            }else if(diffState.fitness[1] == false){
                fitness = {flex:-5, balance:0}
            }else if(diffState.fitness[2] == false){
                fitness = {flex:0, balance:0}
            }else if(diffState.fitness[3] == false){
                fitness = {flex:5, balance:0}
            }else if(diffState.fitness[4] == false){
                fitness = {flex:10, balance:0}
            }           
            

            
            
            const userFlex = ((level.flex + style.flex + singleDoubles.flex)/3) + rely.flex + speedPower.flex + generationControl.flex + fitness.flex
            const userbalance = ((level.balance + style.balance + singleDoubles.balance)/3) + rely.balance + speedPower.balance + generationControl.balance + fitness.balance

            setUserStats({stiff:Math.round(userFlex),balance:Math.round(userbalance)})
            dispatch({type:'userStats',payload:{flex:Math.round(userFlex), balance: Math.round(userbalance) }})
        }

    },[diffState])

    useEffect(()=>{
        if(firstUserSet && userStats.stiff){
            window.scrollTo({ top: 0, behavior: 'smooth' })
            closeFilter()
            setFirstUserSet(false)
        }
    },[userStats, firstUserSet])

    useEffect(()=>{
        const hoverCheck = (index) => {
            if(index >= 0 && index < 3){
                setStateHover({...stateHover, level:true})
            }
            else if(index >= 3 && index < 6){
                setStateHover({...stateHover, style:true})
            }
            else if(index >= 6 && index < 9){
                setStateHover({...stateHover, singleDoubles:true})
            }
            else if(index >= 9 && index < 12){
                setStateHover({...stateHover, rely:true})
            }
            else if(index >= 12 && index < 17){
                setStateHover({...stateHover, speedPower:true})
            }
            else if(index >= 17 && index < 22){
                setStateHover({...stateHover, generationControl:true})
            }
            else if(index >= 22 && index < 27){
                setStateHover({...stateHover, fitness:true})
            }
        }

        const hoverOff = (index) => {
            if(index >= 0 && index < 3){
                setStateHover({...stateHover, level:false})
            }
            else if(index >= 3 && index < 6){
                setStateHover({...stateHover, style:false})
            }
            else if(index >= 6 && index < 9){
                setStateHover({...stateHover, singleDoubles:false})
            }
            else if(index >= 9 && index < 12){
                setStateHover({...stateHover, rely:false})
            }
            else if(index >= 12 && index < 17){
                setStateHover({...stateHover, speedPower:false})
            }
            else if(index >= 17 && index < 22){
                setStateHover({...stateHover, generationControl:false})
            }
            else if(index >= 22 && index < 27){
                setStateHover({...stateHover, fitness:false})
            }
        }

        if(Object.entries(diffRef.current).length){
                Object.entries(diffRef.current).forEach((el,index)=>{
                    // const hoverFunction = () => hoverCheck()
                    diffRef.current[index].addEventListener('mouseenter', function(){
                        hoverCheck(index)
                    })

                    diffRef.current[index].addEventListener('mouseleave', function(){
                        hoverOff(index)
                    })

                })

              return()=>{
                Object.entries(diffRef.current).forEach((el,index)=>{
                    if(diffRef.current[index]){
                        diffRef.current[index].removeEventListener('mouseenter', function(){
                            hoverOff(index)
                        })
                    }

                    if(diffRef.current[index]){
                        diffRef.current[index].removeEventListener('mouseleave', function(){
                            hoverOff(index)
                        })
                    }

                })
              }

        }

    },[diffRef])

    const [ displayMenu, setDisplayMenu ] = useState(false)

    useEffect(()=>{
        state.userRacket.userRacket ? setDisplayMenu(true) : setDisplayMenu(false)
    },[state.userRacket])

    const closeFilter = () => {
        dispatch({type:'userRacket', payload:{userRacket: false}})
    }


    return(
        <div ref={userRef} style={{zIndex:100, transition: 'all 0.6s ease-out', display:'grid', gridTemplateRows: displayMenu ? '1fr' : '0fr'} } className="userPref-container">
            <div style={{position:'relative'}} >
                <div className="f-close-container" onClick={()=>closeFilter()}>
                    <svg className="filter-close"  viewBox="-8.5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" >
                        <path d="M8.48 16l5.84-5.84c0.32-0.32 0.32-0.84 0-1.2-0.32-0.32-0.84-0.32-1.2 0l-5.84 5.84-5.84-5.84c-0.32-0.32-0.84-0.32-1.2 0-0.32 0.32-0.32 0.84 0 1.2l5.84 5.84-5.84 5.84c-0.32 0.32-0.32 0.84 0 1.2 0.16 0.16 0.4 0.24 0.6 0.24s0.44-0.080 0.6-0.24l5.84-5.84 5.84 5.84c0.16 0.16 0.36 0.24 0.6 0.24 0.2 0 0.44-0.080 0.6-0.24 0.32-0.32 0.32-0.84 0-1.2l-5.84-5.84z"></path>
                    </svg>
                </div>
                <p className="pref-title-main">Find out what racket specs suits you</p>
                <p className="pref-title"><span>What is your</span> skill level<span>? [ 1/7 ]</span></p>

                <div className="style-container">
                    <div ref={el=>diffRef.current[0]=el}  style={{backgroundColor: diffState.level[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.level[0] == false && stateHover.level == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, level:[false,true,true]})} className="style-grid">
                        <div style={{opacity: diffState.level[0] ? 0.5 : null }} className="media-height user-style-card">
                            <svg className="svg-badminton-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 265.35">
                                <path d="M159.5,70.25v124.86h-31.58V70.25h31.58m6-6h-43.58V201.11h43.58V64.25h0Z"/>
                                <g>
                                    <path d="M68.74,198.11h-.68c-35.88-.2-65.06-29.55-65.06-65.43s29.19-65.23,65.06-65.42h.88s23.63,0,23.63,0V198.11h-23.83Z"/>
                                    <path d="M89.57,70.25v124.86h-21.49c-16.6-.1-32.2-6.63-43.91-18.4-11.72-11.78-18.17-27.41-18.17-44.03s6.45-32.25,18.17-44.03c11.71-11.77,27.31-18.31,43.91-18.4h.75s20.74,0,20.74,0m6-6h-27.52C30.43,64.46,0,95.01,0,132.68H0c0,37.66,30.43,68.22,68.05,68.42h0s27.52,0,27.52,0V64.25h0Z"/>
                                </g>
                                <path d="M361.8,6c18.86,0,34.2,15.38,34.2,34.28V225.08c0,18.9-15.34,34.28-34.2,34.28-4.27,0-8.51-.81-12.59-2.42l-152.07-59.91V68.33L349.21,8.42c4.08-1.61,8.31-2.42,12.59-2.42h0M361.8,0c-4.87,0-9.87,.9-14.79,2.84l-155.87,61.41V201.11l155.87,61.41c4.92,1.94,9.91,2.84,14.79,2.84,21.27,0,40.2-17.19,40.2-40.28V40.28C402,17.19,383.08,0,361.8,0h0Z"/>
                            </svg>
                            <div className="user-style">
                                Beginner
                            </div>
                        </div>
                        <div className="style-card-text">
                            <ul>
                                <li className="user-card-text">Basic Technique (Grip, Footwork, Strokes)</li>
                                <li className="user-card-text">Understanding of Rules</li>
                                <li className="user-card-text">Court Awareness</li>
                                <li className="user-card-text">Consistency</li>
                                <li className="user-card-text">Control (Clears, Smash, Front-line serves )</li>
                            </ul>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[1]=el}  style={{backgroundColor: diffState.level[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.level[1] == false && stateHover.level == false ? 4 : null }} onClick={()=>setDiffState({...diffState, level:[true,false,true]})} className="style-grid">
                        <div style={{opacity: diffState.level[1] ? 0.5 : null }} className="media-height user-style-card">
                            <svg className="svg-badminton-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 265.35">
                            <g>
                                    <rect x="124.92" y="67.25" width="37.58" height="130.86"/>
                                    <path d="M159.5,70.25v124.86h-31.58V70.25h31.58m6-6h-43.58V201.11h43.58V64.25h0Z"/>
                                </g>
                                <g>
                                    <path d="M68.74,198.11h-.68c-35.88-.2-65.06-29.55-65.06-65.43s29.19-65.23,65.06-65.42h.88s23.63,0,23.63,0V198.11h-23.83Z"/>
                                    <path d="M89.57,70.25v124.86h-21.49c-16.6-.1-32.2-6.63-43.91-18.4-11.72-11.78-18.17-27.41-18.17-44.03s6.45-32.25,18.17-44.03c11.71-11.77,27.31-18.31,43.91-18.4h.75s20.74,0,20.74,0m6-6h-27.52C30.43,64.46,0,95.01,0,132.68H0c0,37.66,30.43,68.22,68.05,68.42h0s27.52,0,27.52,0V64.25h0Z"/>
                                </g>
                                <path d="M361.8,6c18.86,0,34.2,15.38,34.2,34.28V225.08c0,18.9-15.34,34.28-34.2,34.28-4.27,0-8.51-.81-12.59-2.42l-152.07-59.91V68.33L349.21,8.42c4.08-1.61,8.31-2.42,12.59-2.42h0M361.8,0c-4.87,0-9.87,.9-14.79,2.84l-155.87,61.41V201.11l155.87,61.41c4.92,1.94,9.91,2.84,14.79,2.84,21.27,0,40.2-17.19,40.2-40.28V40.28C402,17.19,383.08,0,361.8,0h0Z"/>
                            </svg>
                            <div className="user-style">
                                Intermediate
                            </div>
                        </div>
                        <div className="style-card-text">
                            <ul>
                                <li className="user-card-text">Advanced Technique (Refined Strokes)</li>
                                <li className="user-card-text">Tactical Awareness</li>
                                <li className="user-card-text">Footwork and Agility</li>
                                <li className="user-card-text">Shot Variety (Drop Shots, Drives, Cross-court Shots)</li>
                                <li className="user-card-text">Control (Slices, Netplay )</li>
                            </ul>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[2]=el}  style={{backgroundColor: diffState.level[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.level[2] == false && stateHover.level == false ? 4 : null }} onClick={()=>setDiffState({...diffState, level:[true,true,false]})} className="style-grid">
                        <div style={{opacity: diffState.level[2] ? 0.5 : null }} className="media-height user-style-card">
                        <svg className="svg-badminton-2" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 402 265.35">
                                <g>
                                    <rect x="124.92" y="67.25" width="37.58" height="130.86"/>
                                    <path d="M159.5,70.25v124.86h-31.58V70.25h31.58m6-6h-43.58V201.11h43.58V64.25h0Z"/>
                                </g>
                                <g>
                                    <path d="M68.74,198.11h-.68c-35.88-.2-65.06-29.55-65.06-65.43s29.19-65.23,65.06-65.42h.88s23.63,0,23.63,0V198.11h-23.83Z"/>
                                    <path d="M89.57,70.25v124.86h-21.49c-16.6-.1-32.2-6.63-43.91-18.4-11.72-11.78-18.17-27.41-18.17-44.03s6.45-32.25,18.17-44.03c11.71-11.77,27.31-18.31,43.91-18.4h.75s20.74,0,20.74,0m6-6h-27.52C30.43,64.46,0,95.01,0,132.68H0c0,37.66,30.43,68.22,68.05,68.42h0s27.52,0,27.52,0V64.25h0Z"/>
                                </g>
                                <g>
                                    <path d="M361.8,262.35c-4.65,0-9.26-.89-13.69-2.63l-153.97-60.66V66.29L348.11,5.63c4.43-1.75,9.04-2.63,13.69-2.63,20.51,0,37.2,16.72,37.2,37.28V225.08c0,20.55-16.69,37.28-37.2,37.28Z"/>
                                    <path d="M361.8,6c18.86,0,34.2,15.38,34.2,34.28V225.08c0,18.9-15.34,34.28-34.2,34.28-4.27,0-8.51-.81-12.59-2.42l-152.07-59.91V68.33L349.21,8.42c4.08-1.61,8.31-2.42,12.59-2.42h0M361.8,0c-4.87,0-9.87,.9-14.79,2.84l-155.87,61.41V201.11l155.87,61.41c4.92,1.94,9.91,2.84,14.79,2.84,21.27,0,40.2-17.19,40.2-40.28V40.28C402,17.19,383.08,0,361.8,0h0Z"/>
                                </g>
                            </svg>
                            <div className="user-style">
                                Advanced
                            </div>
                        </div>
                        <div className="style-card-text">
                            <ul>
                                <li className="user-card-text">Advanced Tactics (Exploiting Weaknesses, Setting up Winning Opportunities)</li>
                                <li className="user-card-text">Shot Precision</li>
                                <li className="user-card-text">Deception and Skill Variation (Deceptive Shots)</li>
                                <li className="user-card-text">Physical Fitness (Strength, Endurance, Agility)</li>
                            </ul>
                        </div>
                    </div>
                    
                </div>

                <p className="pref-title">Aggressive <span>or</span> Balanced <span>or</span> Defensive<span> style? [ 2/7 ]</span></p>

                <div className="style-container">
                    <div ref={el=>diffRef.current[3]=el}  style={{backgroundColor: diffState.style[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.style[0] == false && stateHover.style == false ? 4 : null }} onClick={()=>setDiffState({...diffState, style:[false,true,true]})} className="style-grid">
                        <div style={{opacity: diffState.style[0] ? 0.5 : null }} className="media-height user-style-card">
                            <svg className="svg-badminton" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.88 1231.71">
                                <path d="M420.24,991.92c-4.36-2.17-6.86-.5-9.32,.56-62.11,26.77-126.66,27.16-192.06,17.62-10.67-1.56-21.09-4.43-29.72-11.82-21.79-18.66-22.9-53.36-3.05-79.14,17.16-22.29,40.04-25.08,65.69-22.07,39.81,4.67,78.85,2.87,116.52-13.54,13.96-6.08,20.32-14.41,20.87-29.62,2.17-60.73-2.17-120.65-19.03-179.35-2.04-7.12-4.31-9.78-12.31-8.46-40.26,6.65-80.93,9.8-121.59,12.92-5.57,.43-11.24,.56-16.68,1.72-32.34,6.92-54.37-10.19-58.87-42.43-6.12-43.84-8.8-88.29-6.07-132.79,1.89-30.79,4.34-61.44,13.17-91.2,.57-1.92,.55-4.2,1.63-5.74,11.07-15.83,5.98-31.55,.67-47.76-12.32-37.61-24.01-75.44-35.95-113.18-1.7-5.36-2.66-10.95-10.89-9.54-23.88,4.1-44.74-3.74-64.59-16.43C6.65,188.44-15.41,111.37,11.56,55.87,37.52,2.44,90.09-14.6,143.29,13.17c66.57,34.75,88,133.06,41.8,192.1-6.7,8.56-14.77,15.69-24.53,20.7-5.48,2.81-8.67,5.95-6.37,13.21,13.39,42.31,26.58,84.69,39.24,127.22,2.93,9.83,7.99,12.13,17.55,10.86,30.32-4.02,55.69,29.01,50.15,53.05-8.44,36.61-14.92,73.71-12.73,111.69,.66,11.55,.74,23.14,.69,34.71-.03,6.31,3.12,7.69,8.38,6.56,25.91-5.57,52.51-4.92,78.61-8.91,8.18-1.25,13.18-4.39,17.15-12.34,18.14-36.38,46.28-57.35,88.83-54.89,14.91,.86,28.42,5.14,39.65,14.89,5.41,4.7,9.45,5.16,15.77,1.58,44.94-25.46,88.18-53.51,129.81-84.07,6.77-4.97,13.63-9.83,20.7-14.36,18.12-11.61,37.62-8.62,51.69,7.66,18.28,21.15,17.82,52.61-2.84,71.5-25.44,23.27-54.95,41.27-83.76,60-22.79,14.81-45.67,29.6-70.01,41.83-7.84,3.94-9.28,8.83-6.59,17.48,20.6,66.19,29.75,133.87,27.38,203.33-1.49,43.67-5.43,87.05-12.71,129.98-15.12,89.08-58.04,161.72-131.99,214.93-38.8,27.92-81.73,46.79-128.2,57.8-27.81,6.59-52.45-3.2-64.87-26.13-13.4-24.73-9.84-56.59,8.15-73.36,6.91-6.44,15.14-10.45,24.18-12.69,45.47-11.27,86.35-31.13,120.4-63.91,18.3-17.61,30.76-38.94,41.44-61.68ZM20.22,117.34c.8,24.95,12.67,51.37,33.54,73.78,30.66,32.92,92.22,44.78,123.51-10.78,27.22-48.32,7.72-118.76-39.47-148.07C108.23,13.91,54.63,13.56,31.63,61.63c-7.62,15.92-11.37,32.25-11.41,55.71Z"/>
                                <path d="M533.88,388.69c1.43,58.13-40.29,102.87-99.02,104.05-51.54,1.04-98.81-37.21-100.75-98.77-1.7-54,42.4-99.1,97.83-100.36,54.33-1.24,100.63,41.95,101.94,95.09Z"/>
                            </svg>
                            <div className="user-style">
                                Aggressive
                            </div>
                        </div>
                        <div className="style-card-text user-card-text">An aggressive player in badminton is someone who focuses on attacking and putting pressure on their opponents. They tend to play powerful shots, such as smashes and aggressive clears, to force their opponents into defensive positions. </div>
                    </div>
                    <div ref={el=>diffRef.current[4]=el}  style={{backgroundColor: diffState.style[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.style[1] == false && stateHover.style == false ? 4 : null }} onClick={()=>setDiffState({...diffState, style:[true,false,true]})} className="style-grid">
                        <div style={{opacity: diffState.style[1] ? 0.5 : null }} className="media-height user-style-card">
                            <svg className="svg-badminton" data-name="Layer 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.89 1231.7">
                            <ellipse cx="288.16" cy="398.37" rx="91.14" ry="94.21"/>
                            <path d="M666,229.51c-34.78-16.81-83.11,14.07-107.94,68.97-23.14,51.17-17.7,105.13,11.3,125.84l-59.06,130.58-46,.44c-28.35,.27-56.72-3.1-84.29-10.02l-54.37-13.64c-.63-.08-1.27-.13-1.9-.19-12.89-7.3-25.62-9.11-37.89-6.34-17.31-4.69-40.07,4.17-56.69,23.77l-58.97,58.46c-25.94,25.71-49.42,54.25-69.73,84.76l-26.64,40.01c-21.12,24.91-24.31,57.71-7.14,73.26h0c17.17,15.56,48.21,7.98,69.33-16.93l35.55-51.85c2.88-4.2,5.83-8.36,8.83-12.48-4.69,34.84-5.16,65.07-1.85,89.91-2.36,5.11-3.77,10.78-3.99,16.79l-2.33,64.44c-1.25,34.56-18.25,66.47-45.84,86.04l-96.02,68.1c-22.69,16.09-28.46,48.14-12.89,71.59h0c15.57,23.45,46.57,29.42,69.26,13.33l44.93-31.87s0,0,0,0c101.26-71.49,130.35-153.26,138.48-199.99,18.8,24.39,26.72,56.09,21.42,87.09l-20.26,118.54c-4.79,28,13.3,54.72,40.39,59.66h0c27.09,4.95,52.94-13.74,57.72-41.75l9.48-55.47s0,0,0,0c24.03-138.91-23.4-220.78-49.61-253.89l-14.62-15.99c4.31-20.42,8.47-45.06,13.2-74.7,6.86-42.94,16.58-75.39,23.24-101.03l28.9,6.88c28.23,6.72,57.23,9.73,86.15,8.95l37.92-1.03c25.59,3.15,48.52-13.29,51.23-36.73h0c2.25-19.54-10.28-37.77-29.34-45.11l57.35-126.81c33.97,9.72,77.52-20.58,100.66-71.74,24.83-54.9,16.76-113.03-18.02-129.84Zm6.5,124.27c-20.29,44.86-59.77,70.09-88.19,56.36-28.42-13.73-35.01-61.23-14.73-106.09,20.29-44.86,59.77-70.09,88.19-56.36,28.42,13.73,35.01,61.23,14.73,106.09Z"/>
                            </svg>
                            <div className="user-style">
                                Balanced
                            </div>
                        </div>
                        <div className="style-card-text user-card-text">A balanced player in badminton refers to someone who combines elements of both aggressive and defensive playstyles. They possess a versatile approach to the game, adapting their strategies based on the situation and the opponent they are facing</div>
                    </div>
                    <div ref={el=>diffRef.current[5]=el}  style={{backgroundColor: diffState.style[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.style[2] == false && stateHover.style == false ? 5 : null }} onClick={()=>setDiffState({...diffState, style:[true,true,false]})}  className="style-grid">
                        <div style={{opacity: diffState.style[2] ? 0.5 : null }} className="media-height user-style-card">
                            <svg className="svg-badminton" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 712.88 1231.71">
                                <circle cx="381.95" cy="393.17" r="99.59"/>
                                <path d="M647.42,299.16c-49.03-13.25-101.65,23.66-117.53,82.43-14.8,54.77,7.55,109.2,50.34,127.08l-41.56,153.82-24.08-18.19c-24.72-18.67-47.11-40.41-66.51-64.57l-38.27-47.67c-8.78-8.6-19.53-13.73-30.31-15.3-5.42-5.93-13.72-10.94-25.81-15.19-19.23-6.77-39.05-3.73-57.85,6.7-1.19,.42-2.39,.87-3.58,1.36l-46.93,12.7c-35.79,9.68-70.67,23.34-103.6,40.57l-74.86,39.18c-30.64,12.57-47.7,41.72-38.1,65.11h0c9.6,23.39,42.21,32.17,72.85,19.6l63.24-33.92c14.94-8.01,30.3-15.28,45.98-21.78-8.79,28.61-13.89,59.86-13.89,91.68,0,55.51,14.55,98,36.08,126.73l-8.39,88.25h0s-2.44,25.64-2.44,25.64c-4.46,16.26-15.9,36.36-44.45,48.07,0,0,0,0,0,0l-113.04,46.36c-27.81,11.41-41.11,43.2-29.7,71.02h0c11.41,27.81,43.2,41.11,71.02,29.7l112.32-46.07s0,0,0,0c88.52-36.31,109.02-120.55,113.74-154.64,.47-4.91,.93-9.81,1.4-14.72h0s0,0,0,0c.46-4.89,.93-9.78,1.39-14.67,.83-8.68,1.65-17.36,2.48-26.05l16.01,7.77c32.89,15.97,56.27,46.56,63.06,82.48l23.61,125.03c5.58,29.54,34.04,48.97,63.58,43.39h0c29.54-5.58,48.97-34.04,43.39-63.58l-11.05-58.51s0,0,0,0c-27.37-146.64-106.45-209.26-145.62-231.88l-22.54-10.94h0s-7.18-3.49-7.18-3.49c-2.17-21.46-4.17-47.72-4.17-80.07,0-34.97,5.44-64.56,11.81-89.67l24.07,29.26c20.11,24.44,43.28,46.3,68.82,64.92l33.5,24.42c20.12,19.7,50.58,21.21,68.04,3.38h0c17.45-17.83,15.29-48.25-4.83-67.95l-1.58-1.19,43.7-161.77c45.98,6.11,92.69-29.66,107.49-84.44,15.88-58.77-11-117.15-60.03-130.4Zm43.79,126.01c-12.97,48.02-55.97,78.18-96.03,67.35-40.06-10.82-62.02-58.53-49.05-106.55s55.97-78.17,96.03-67.35c40.06,10.82,62.02,58.53,49.05,106.55Z"/>
                            </svg>
                            <div className="user-style">
                                Defensive
                            </div>
                        </div>
                        <div className="style-card-text user-card-text">A defensive player in badminton emphasises strong defensive skills and the ability to retrieve shots effectively. They prioritize maintaining good court coverage, returning opponents' shots with accuracy and precision.</div>
                    </div>
                </div>

                <p className="pref-title"> <span>Do you play </span>Singles <span>or</span>Doubles<span>? [ 3/7 ]</span></p>


                <div className="style-container">
                    <div ref={el=>diffRef.current[6]=el}  style={{backgroundColor: diffState.singleDoubles[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.singleDoubles[0] == false && stateHover.singleDoubles == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, singleDoubles:[false,true,true]})} className="style-grid-2">
                        <div style={{opacity: diffState.singleDoubles[0] ? 0.5 : null }} className="media-height user-style-card">
                            <svg viewBox="-8 0 32 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M13.84 16.48c-0.76-0.76-1.64-1.36-2.64-1.72 0.88-0.8 1.44-2 1.44-3.28 0-2.44-2-4.48-4.48-4.48s-4.48 2-4.48 4.48c0 1.32 0.56 2.48 1.44 3.28-1 0.36-1.88 0.92-2.64 1.72-2.64 2.88-2.48 7.52-2.48 7.72 0.040 0.48 0.4 0.8 0.88 0.8s0.8-0.4 0.8-0.88c0-0.040-0.16-4.12 2.12-6.52 1.080-1.12 2.56-1.68 4.4-1.68s3.32 0.56 4.4 1.68c2.28 2.36 2.12 6.44 2.12 6.52-0.040 0.48 0.32 0.84 0.8 0.88h0.040c0.44 0 0.8-0.36 0.84-0.8 0.040-0.2 0.24-4.84-2.56-7.72zM5.44 11.48c0-1.52 1.24-2.8 2.8-2.8 1.52 0 2.8 1.24 2.8 2.8 0 1.52-1.24 2.8-2.8 2.8-1.56-0.040-2.8-1.28-2.8-2.8z"></path>
                            </svg>
                            <div className="user-style">
                                Singles Player
                            </div>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[7]=el}  style={{backgroundColor: diffState.singleDoubles[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.singleDoubles[1] == false && stateHover.singleDoubles == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, singleDoubles:[true,false,true]})} className="style-grid-2">
                        <div style={{opacity: diffState.singleDoubles[1] ? 0.5 : null }} className="media-height user-style-card">
                                <svg data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 680.15 232.14">
                                    <path d="M177.38,122.94c-9.74-9.74-21.02-17.43-33.83-22.04,11.28-10.25,18.45-25.63,18.45-42.03,0-31.27-25.63-57.41-57.41-57.41S47.18,27.09,47.18,58.87c0,16.92,7.18,31.78,18.45,42.03-12.81,4.61-24.09,11.79-33.83,22.04C-2.03,159.84,.02,219.3,.02,221.87c.51,6.15,5.13,10.25,11.28,10.25s10.25-5.13,10.25-11.28c0-.51-2.05-52.8,27.17-83.55,13.84-14.35,32.81-21.53,56.38-21.53s42.54,7.18,56.38,21.53c29.22,30.24,27.17,82.53,27.17,83.55-.51,6.15,4.1,10.76,10.25,11.28h.51c5.64,0,10.25-4.61,10.76-10.25,.51-2.56,3.08-62.02-32.81-98.93ZM69.74,58.87c0-19.48,15.89-35.88,35.88-35.88s35.88,15.89,35.88,35.88-15.89,35.88-35.88,35.88c-19.99-.51-35.88-16.4-35.88-35.88h0Z"/>
                                    <path d="M527.73,100.88c11.28-10.25,18.45-25.63,18.45-42.03,0-31.78-25.63-57.41-57.41-57.41s-57.41,25.63-57.41,57.41c0,16.92,7.18,31.78,18.45,42.03-12.81,4.61-24.09,11.79-33.83,22.04-34.34,36.91-32.29,96.37-32.29,98.93,.51,6.15,5.13,10.76,11.28,10.25,6.15-.51,10.25-5.13,10.25-11.28,0-.51-2.05-52.8,27.17-83.55,13.84-14.35,32.81-22.04,56.9-22.04s42.54,7.18,56.38,21.53c29.22,30.24,27.17,83.04,27.17,83.55-.51,6.15,4.1,10.76,10.25,11.28h.51c5.64,0,10.25-4.61,10.76-10.25,0-2.56,2.56-62.02-33.32-98.93-9.23-9.74-20.5-16.92-33.32-21.53h0Zm-74.32-42.03c0-19.48,15.89-35.88,35.88-35.88s35.88,15.89,35.88,35.88-15.89,35.88-35.88,35.88-35.88-16.4-35.88-35.88h0Zm204.52,24.09c-5.13-5.64-11.28-9.74-17.94-12.81,5.64-7.18,9.23-15.89,9.23-25.63,0-22.55-17.94-40.49-40.49-40.49s-40.49,17.94-40.49,40.49c0,9.74,3.59,18.45,9.23,25.63-5.13,2.56-10.25,5.64-14.35,9.74-4.61,4.1-4.61,10.76-1.03,15.38,4.1,4.61,10.76,4.61,15.38,1.03,8.2-7.18,18.45-10.76,31.27-10.76,14.35,0,25.12,4.1,33.32,12.81,17.43,18.45,16.4,50.23,16.4,50.75-.51,6.15,4.1,10.76,10.25,11.28h.51c5.64,0,10.25-4.61,10.76-10.25,.51-2.05,1.54-42.03-22.04-67.15h0Zm-68.17-37.93c0-10.25,8.71-18.97,18.97-18.97s18.97,8.71,18.97,18.97-8.71,18.97-18.97,18.97-18.97-8.71-18.97-18.97Z"/>
                                    <line className="single-double-line" x1="302.6" y1="223.18" x2="302.6" y2="4"/>
                                </svg>
                            <div className="user-style">
                                I play both equally
                            </div>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[8]=el}  style={{backgroundColor: diffState.singleDoubles[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.singleDoubles[2] == false && stateHover.singleDoubles == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, singleDoubles:[true,true,false]})} className="style-grid-2">
                        <div style={{opacity: diffState.singleDoubles[2] ? 0.5 : null }} className="media-height user-style-card">
                            <svg viewBox="-4.5 0 32 24" version="1.1" xmlns="http://www.w3.org/2000/svg">
                                <path d="M11.24 14.76c0.88-0.8 1.44-2 1.44-3.28 0-2.48-2-4.48-4.48-4.48s-4.48 2-4.48 4.48c0 1.32 0.56 2.48 1.44 3.28-1 0.36-1.88 0.92-2.64 1.72-2.68 2.88-2.52 7.52-2.52 7.72 0.040 0.48 0.4 0.84 0.88 0.8s0.8-0.4 0.8-0.88c0-0.040-0.16-4.12 2.12-6.52 1.080-1.12 2.56-1.72 4.44-1.72 1.84 0 3.32 0.56 4.4 1.68 2.28 2.36 2.12 6.48 2.12 6.52-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0-0.2 0.2-4.84-2.6-7.72-0.72-0.76-1.6-1.32-2.6-1.68zM5.44 11.48c0-1.52 1.24-2.8 2.8-2.8s2.8 1.24 2.8 2.8c0 1.52-1.24 2.8-2.8 2.8s-2.8-1.28-2.8-2.8zM21.4 13.36c-0.4-0.44-0.88-0.76-1.4-1 0.44-0.56 0.72-1.24 0.72-2 0-1.76-1.4-3.16-3.16-3.16s-3.16 1.4-3.16 3.16c0 0.76 0.28 1.44 0.72 2-0.4 0.2-0.8 0.44-1.12 0.76-0.36 0.32-0.36 0.84-0.080 1.2 0.32 0.36 0.84 0.36 1.2 0.080 0.64-0.56 1.44-0.84 2.44-0.84 1.12 0 1.96 0.32 2.6 1 1.36 1.44 1.28 3.92 1.28 3.96-0.040 0.48 0.32 0.84 0.8 0.88 0 0 0.040 0 0.040 0 0.44 0 0.8-0.36 0.84-0.8 0.040-0.16 0.12-3.28-1.72-5.24zM16.080 10.4c0-0.8 0.68-1.48 1.48-1.48s1.48 0.68 1.48 1.48-0.68 1.48-1.48 1.48c-0.8 0-1.48-0.68-1.48-1.48z"></path>
                            </svg>
                            <div className="user-style">
                                Doubles Player
                            </div>
                        </div>
                    </div>
                </div>

                <p className="pref-title"><span>Which of these shots do your </span>rely <span>on the most? [ 4/7 ]</span></p>


                <div className="style-container">
                    <div ref={el=>diffRef.current[9]=el}  style={{backgroundColor: diffState.rely[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.rely[0] == false && stateHover.rely == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, rely:[false,true,true]})} className="style-grid-2">
                        <div style={{opacity: diffState.rely[0] ? 0.5 : null }}  className="media-height user-style-card">
                            <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 401.72 251.63">
                                <line className="smash-1" x1="200.86" y1="248.63" x2="200.86" y2="157.09"/>
                                <line className="smash-1" y1="248.63" x2="401.72" y2="248.63"/>
                                <polyline className="smash-2" points="324.76 157.09 357.01 224.37 285.12 204.39"/>
                                <line className="smash-2" x1="354.74" y1="218.07" x2="27.95" y2="6.72"/>
                            </svg>
                            <div className="user-style">
                                Powerful Smashes
                            </div>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[10]=el}  style={{backgroundColor: diffState.rely[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.rely[1] == false && stateHover.rely == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, rely:[true,false,true]})} className="style-grid-2">
                        <div style={{opacity: diffState.rely[1] ? 0.5 : null }} className="media-height user-style-card">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.76 259.98">
                                <g id="Layer_1" data-name="Layer 1">
                                    <line className="drop-1" x1="200.86" y1="256.98" x2="200.86" y2="165.44"/>
                                    <line className="drop-1" y1="256.98" x2="401.72" y2="256.98"/>
                                </g>
                                <g id="Layer_4" data-name="Layer 4">
                                    <path className="drop-2" d="M250.51,199.08C250.51,111.53,149.79,37.73,12.39,15.12"/>
                                    <polyline className="drop-2" points="277.4 147.15 252.62 217.52 215.93 152.56"/>
                                </g>
                            </svg>
                            <div className="user-style">
                                Accurate drop shots
                            </div>
                        </div>
                    </div>
                    <div ref={el=>diffRef.current[11]=el}  style={{backgroundColor: diffState.rely[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.rely[2] == false && stateHover.rely == false  ? 4 : null }} onClick={()=>setDiffState({...diffState, rely:[true,true,false]})} className="style-grid-2">
                        <div style={{opacity: diffState.rely[2] ? 0.5 : null }}  className="media-height user-style-card">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 426.76 259.98">
                                    <g id="Layer_1" data-name="Layer 1">
                                        <line className="clear-1" x1="200.86" y1="256.98" x2="200.86" y2="165.44"/>
                                        <line className="clear-1" y1="256.98" x2="401.72" y2="256.98"/>
                                    </g>
                                    <g id="Layer_3" data-name="Layer 3">
                                        <path className="clear-2" d="M391.94,199.08c0-105.53-85.55-191.08-191.08-191.08S9.78,93.55,9.78,199.08"/>
                                        <polyline className="clear-2" points="419.22 147.15 394.44 217.52 357.74 152.56"/>
                                    </g>
                                </svg>
                            <div className="user-style">
                                Defensive clears
                            </div>
                        </div>
                    </div>
                </div>

                <p className="pref-title">Racket-Speed <span>vs</span> Racket-Power <span> [ 5/7 ]</span></p>

 <div className=" style-row style-container">
<div ref={el=>diffRef.current[12]=el}  style={{backgroundColor: diffState.speedPower[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.speedPower[0] == false && stateHover.speedPower == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, speedPower:[false,true,true,true,true]})} className="style-row style-grid-2 grid5Items">
    <div style={{opacity: diffState.speedPower[0] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-2" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Fastest racket speed
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[13]=el}  style={{backgroundColor: diffState.speedPower[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.speedPower[1] == false && stateHover.speedPower == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, speedPower:[true,false,true,true,true]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.speedPower[1] ? 0.5 : null }} className="sub-selectors user-style-card">
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Fast racket speed
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[14]=el}  style={{backgroundColor: diffState.speedPower[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.speedPower[2] == false && stateHover.speedPower == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, speedPower:[true,true,false,true,true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.speedPower[2] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Balanced speed/power
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[15]=el}  style={{backgroundColor: diffState.speedPower[3] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.speedPower[3] == false && stateHover.speedPower == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, speedPower:[true,true,true, false, true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.speedPower[3] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-2" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Strong racket power
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[16]=el}  style={{backgroundColor: diffState.speedPower[4] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.speedPower[4] == false && stateHover.speedPower == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, speedPower:[true,true,true,true,false]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.speedPower[4] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Strongest racket power
        </div>
    </div>
</div>
</div>

<p className="pref-title">Power-Generation <span>vs</span> Control<span> [ 6/7 ]</span></p>

<div className="style-row style-container">
<div ref={el=>diffRef.current[17]=el}  style={{backgroundColor: diffState.generationControl[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.generationControl[0] == false && stateHover.generationControl == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, generationControl:[false,true,true,true,true]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.generationControl[0] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-2" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Easiest power generation
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[18]=el}  style={{backgroundColor: diffState.generationControl[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.generationControl[1] == false && stateHover.generationControl == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, generationControl:[true,false,true,true,true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.generationControl[1] ? 0.5 : null }} className="sub-selectors user-style-card">
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Easy power generation
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[19]=el}  style={{backgroundColor: diffState.generationControl[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.generationControl[2] == false && stateHover.generationControl == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, generationControl:[true,true,false,true,true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.generationControl[2] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Balanced power/control
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[20]=el}  style={{backgroundColor: diffState.generationControl[3] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.generationControl[3] == false && stateHover.generationControl == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, generationControl:[true,true,true,false,true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.generationControl[3] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-2" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Better control
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[21]=el}  style={{backgroundColor: diffState.generationControl[4] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.generationControl[4] == false && stateHover.generationControl == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, generationControl:[true,true,true,true,false]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.generationControl[4] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Precise control
        </div>
    </div>
</div>
</div>        
<p className="pref-title">Fitness Level <span>[  7/7 ]</span></p>
<div className="style-row  style-container">
<div ref={el=>diffRef.current[22]=el}  style={{backgroundColor: diffState.fitness[0] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.fitness[0] == false && stateHover.fitness == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, fitness:[false,true,true,true,true]})} className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.fitness[0] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-2" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Low
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[23]=el}  style={{backgroundColor: diffState.fitness[1] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.fitness[1] == false && stateHover.fitness == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, fitness:[true,false,true,true,true]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.fitness[1] ? 0.5 : null }} className="sub-selectors user-style-card">
    <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Low/Moderate
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[24]=el}  style={{backgroundColor: diffState.fitness[2] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.fitness[2] == false && stateHover.fitness == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, fitness:[true,true,false,true,true]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.fitness[2] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Moderate
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[25]=el}  style={{backgroundColor: diffState.fitness[3] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.fitness[3] == false && stateHover.fitness == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, fitness:[true,true,true,false,true]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.fitness[3] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-2" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            Moderate/High
        </div>
    </div>
</div>
<div ref={el=>diffRef.current[26]=el}  style={{backgroundColor: diffState.fitness[4] ? 'rgba(70, 70, 70, 0.9)' : null, flex: diffState.fitness[4] == false && stateHover.fitness == false  ? 2 : null }} onClick={()=>setDiffState({...diffState, fitness:[true,true,true,true,false]})}  className="style-grid-2 grid5Items">
    <div style={{opacity: diffState.fitness[4] ? 0.5 : null }} className="sub-selectors user-style-card">
        <svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 580.71 92.71">
            <circle className="racket-selection-1" cx="46.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="290.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-1" cx="168.35" cy="46.35" r="42.35" />
            <circle className="racket-selection-1" cx="412.35" cy="46.35" r="42.35"/>
            <circle className="racket-selection-2" cx="534.35" cy="46.35" r="42.35"/>
        </svg>
        <div className="user-style">
            High
        </div>
    </div>
</div>
</div>            
                <a onClick={()=>window.scrollTo({ top: 0, behavior: 'smooth' })} className="pref-title"><div style={{display:'flex', placeSelf:'center'}}>Click Scroll to Top</div></a>

            </div>
        </div>
    )
}

export default UserPref
import React, { useEffect, useContext } from 'react';
import { RacketContext } from '../App'


function LandingImport({ state, currentZIndex, dotRef, NONE, setCurrentZIndex, dotBtnRef, dotBack, setRacketObjects  }){
    useEffect(()=>{
        if (state.racketList.length) {
            const racketImport = state.racketList.map((racket, index) => {     
              return (
                <div ref={el=>dotRef.current[index]=el} onClick={(e)=>{
                    if (!e.target.classList.contains('dot-btn-a')) {
                        dotRef.current[index].style.zIndex = currentZIndex;
                        setCurrentZIndex(prev => prev + 1);
                      }
                }}
                className='dot-btns-container' style={{
                    left: `calc(${racket.balance}% - 22px)`,
                    top: `calc(${100 - racket.stiff}% - 22px)`,
                    zIndex: index
                }}>
                    <div
                    key={index}
                    className='graph-racket-dot'
                    >
                        <div className='graph-dot-bg graph-def'>
                            <a>{racket.label}</a>
                        </div>
                    </div>
                    <div className='dot-btns' style={NONE} ref={el => dotBtnRef.current[index] = el}>
                        <a className='dot-btn-a'>
                            <svg className='svg-compare' viewBox="-5 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M5.32 21.32c-2.92 0-5.32-2.4-5.32-5.32s2.4-5.32 5.32-5.32 5.32 2.4 5.32 5.32-2.4 5.32-5.32 5.32zM5.32 12.36c-2 0-3.64 1.64-3.64 3.64s1.64 3.64 3.64 3.64 3.64-1.64 3.64-3.64-1.64-3.64-3.64-3.64zM16.96 21.32c-2.92 0-5.32-2.4-5.32-5.32s2.4-5.32 5.32-5.32 5.32 2.4 5.32 5.32-2.4 5.32-5.32 5.32zM16.96 12.36c-2 0-3.64 1.64-3.64 3.64s1.64 3.64 3.64 3.64 3.64-1.64 3.64-3.64-1.64-3.64-3.64-3.64z"></path>
                            </svg>
                            <span>Compare & View Details</span>
                        </a>
                        <a className='dot-btn-a' ref={el=>dotBack.current[index]=el}>
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
    },[state, currentZIndex]) 

    return null
}

export default LandingImport
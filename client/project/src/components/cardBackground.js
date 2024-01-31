import React from 'react';
import { useRef, useEffect } from 'react'

const CardBackground = () => {

    // // Fixing svg clip path
    // // https://stackoverflow.com/questions/62834500/using-clippathunits-objectboundingbox-makes-clip-path-disappear

    /* https://medium.com/@pppped/how-to-code-a-responsive-circular-percentage-chart-with-svg-and-css-3632f8cd7705 */

    const refTransform = useRef(null)

    useEffect(()=>{
        let grad = refTransform.current

        let start = 0
        const oneSpin = () => {
            setTimeout(() => {
            grad.setAttribute('gradientTransform', `rotate(${start+1})`);
            start++
            oneSpin(); // Call the function again for the next rotation
            },25);
            }
        
        oneSpin()
    },[])


    return(
        <aside className='racket-svg-relative'>
            <article className='racket-svg-container'>
                <div className='racket-svg-background'>
                        <svg id="myMask" className="svg-mask" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1074.22 3352.11">
                            <defs>
                            <linearGradient ref={refTransform} id="grad1" gradientTransform="rotate(360)">
                                <stop offset="0%" stopColor="rgb(70, 70, 70)" stopOpacity="1" />
                                <stop offset="25%" stopColor="#05C8D4" stopOpacity="1" />
                                <stop offset="50%" stopColor="#FFD056" stopOpacity="1" />
                                <stop offset="75%" stopColor="#FF5678" stopOpacity="1" />
                                <stop offset="100%" stopColor="#FF5678" stopOpacity="1" />
                            </linearGradient>
                            </defs>
                            <path id="testPath" fill="url(#grad1)" className="cls-4" d="M1072.5,643.65c-11.79-167.93-54.7-369.03-186.81-504.8C780.73,30.99,689.23,0,537.12,0h-.02c-152.12,0-243.61,30.99-348.57,138.84C56.42,274.61,13.51,475.71,1.71,643.65c-24.08,342.79,208.83,583.4,502.14,600.36,.07,0,.13,0,.2,.01,9.07,.53,16.18,7.97,16.18,17.06v1041.69c0,24.37-1.75,48.71-5.25,72.83l-18.15,229.2c-3.34,23.02-5.01,46.25-5.01,69.5v559.52c0,9.77-3.51,19.22-9.88,26.62l-2.61,3.03c-4.42,5.14-6.86,11.69-6.86,18.47v48.15c0,12.16,9.85,22.01,22.01,22.01h85.15c12.16,0,22.01-9.85,22.01-22.01,0-15.66,0-36.01,0-48.16,0-6.78-2.43-13.33-6.85-18.47-.85-.99-1.73-2.01-2.61-3.03-6.37-7.4-9.88-16.85-9.88-26.62v-559.52c0-23.26-1.67-46.49-5.01-69.5l-18.03-229.2c-3.5-24.12-5.25-48.46-5.25-72.83V1261.08c0-9.1,7.14-16.55,16.23-17.06,.05,0,.11,0,.16,0h-.01c293.3-16.94,526.2-257.57,502.12-600.36Zm-503.46,575.36h0c-10.63,.6-21.29,.76-31.93,.5-10.64,.26-21.3,.11-31.93-.51C223.68,1202.73,.14,971.79,23.25,642.79c11.32-161.18,52.51-354.19,179.3-484.5C303.29,54.77,391.1,25.03,537.1,25.03h.02c146,0,233.82,29.74,334.55,133.26,126.8,130.31,167.98,323.32,179.3,484.5,23.11,329-200.43,559.95-481.93,576.22Z"/>
                        </svg>
                        <svg id="myMask" className="svg-mask" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1074.22 3352.11">
                            <path id="blurPath" fill="url(#grad1)" className="cls-4" d="M1072.5,643.65c-11.79-167.93-54.7-369.03-186.81-504.8C780.73,30.99,689.23,0,537.12,0h-.02c-152.12,0-243.61,30.99-348.57,138.84C56.42,274.61,13.51,475.71,1.71,643.65c-24.08,342.79,208.83,583.4,502.14,600.36,.07,0,.13,0,.2,.01,9.07,.53,16.18,7.97,16.18,17.06v1041.69c0,24.37-1.75,48.71-5.25,72.83l-18.15,229.2c-3.34,23.02-5.01,46.25-5.01,69.5v559.52c0,9.77-3.51,19.22-9.88,26.62l-2.61,3.03c-4.42,5.14-6.86,11.69-6.86,18.47v48.15c0,12.16,9.85,22.01,22.01,22.01h85.15c12.16,0,22.01-9.85,22.01-22.01,0-15.66,0-36.01,0-48.16,0-6.78-2.43-13.33-6.85-18.47-.85-.99-1.73-2.01-2.61-3.03-6.37-7.4-9.88-16.85-9.88-26.62v-559.52c0-23.26-1.67-46.49-5.01-69.5l-18.03-229.2c-3.5-24.12-5.25-48.46-5.25-72.83V1261.08c0-9.1,7.14-16.55,16.23-17.06,.05,0,.11,0,.16,0h-.01c293.3-16.94,526.2-257.57,502.12-600.36Zm-503.46,575.36h0c-10.63,.6-21.29,.76-31.93,.5-10.64,.26-21.3,.11-31.93-.51C223.68,1202.73,.14,971.79,23.25,642.79c11.32-161.18,52.51-354.19,179.3-484.5C303.29,54.77,391.1,25.03,537.1,25.03h.02c146,0,233.82,29.74,334.55,133.26,126.8,130.31,167.98,323.32,179.3,484.5,23.11,329-200.43,559.95-481.93,576.22Z"/>
                        </svg>

                        <svg id="svg-strings" className="svg-mask"  data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1074.21 1500">
                            <g className="g-parent" >
                                    <g className="g-child">
                                    <line className="cls-3" x1="470.02" y1="25.12" x2="470.02" y2="1221.23"/>
                                    <line className="cls-3" x1="516.5" y1="25.12" x2="509.6" y2="1223"/>
                                    <line className="cls-3" x1="426.2" y1="29.31" x2="421.84" y2="1217.15"/>
                                    <line className="cls-3" x1="379.95" y1="35.6" x2="374.87" y2="1205.23"/>
                                    <line className="cls-3" x1="334.68" y1="50.61" x2="329.84" y2="1186.25"/>
                                    <line className="cls-3" x1="290.61" y1="76.77" x2="284.32" y2="1166.38"/>
                                    <line className="cls-3" x1="247.03" y1="104.92" x2="232.4" y2="1130.15"/>
                                    <line className="cls-3" x1="198.37" y1="150.28" x2="185.66" y2="1095.19"/>
                                    <line className="cls-3" x1="154.07" y1="190.9" x2="140.99" y2="1049.66"/>
                                    <line className="cls-3" x1="114.84" y1="257.12" x2="97.91" y2="994.03"/>
                                    <line className="cls-3" x1="75.62" y1="342.33" x2="55.12" y2="900.99"/>
                                    </g>
                                    <line className="cls-3" x1="289.56" y1="81.43" x2="785.05" y2="81.43"/>
                                    <line className="cls-3" x1="216.57" y1="130.31" x2="857.66" y2="130.31"/>
                                    <line className="cls-3" x1="175.22" y1="175.68" x2="899.39" y2="175.68"/>
                                    <line className="cls-3" x1="137.06" y1="221.04" x2="933.86" y2="221.04"/>
                                    <line className="cls-3" x1="115.37" y1="262.21" x2="956.16" y2="262.21"/>
                                    <line className="cls-3" x1="95.19" y1="303.38" x2="979.42" y2="303.38"/>
                                    <line className="cls-3" x1="79.74" y1="344.55" x2="1006.94" y2="344.55"/>
                                    <line className="cls-3" x1="65.87" y1="389.58" x2="1010.49" y2="389.58"/>
                                    <line className="cls-3" x1="54.54" y1="434.61" x2="1020.13" y2="434.61"/>
                                    <line className="cls-3" x1="44.05" y1="484.5" x2="1030.26" y2="484.5"/>
                                    <line className="cls-3" x1="33.51" y1="533.95" x2="1041.64" y2="533.95"/>
                                    <line className="cls-3" x1="27.78" y1="585.6" x2="1046.79" y2="585.6"/>
                                    <line className="cls-3" x1="23.14" y1="637.7" x2="1050.41" y2="637.7"/>
                                    <line className="cls-3" x1="21.11" y1="689.24" x2="1053.51" y2="689.24"/>
                                    <line className="cls-3" x1="24.43" y1="742.05" x2="1050.31" y2="742.05"/>
                                    <line className="cls-3" x1="31.07" y1="796.52" x2="1043.37" y2="796.52"/>
                                    <line className="cls-3" x1="38.86" y1="847.51" x2="1035.75" y2="847.51"/>
                                    <line className="cls-3" x1="55.12" y1="902.37" x2="1020.74" y2="902.37"/>
                                    <line className="cls-3" x1="71.99" y1="946.52" x2="1002.78" y2="946.52"/>
                                    <line className="cls-3" x1="97.05" y1="996.85" x2="975.02" y2="996.85"/>
                                    <line className="cls-3" x1="140.63" y1="1050.27" x2="934.87" y2="1050.27"/>
                                    <g className="g-child">
                                    <line className="cls-3" x1="605.84" y1="25.12" x2="605.84" y2="1221.23"/>
                                    <line className="cls-3" x1="559.36" y1="25.12" x2="564.8" y2="1221.23"/>
                                    <line className="cls-3" x1="649.66" y1="29.31" x2="654.02" y2="1217.15"/>
                                    <line className="cls-3" x1="695.91" y1="35.6" x2="700.99" y2="1205.23"/>
                                    <line className="cls-3" x1="741.18" y1="50.61" x2="746.02" y2="1186.25"/>
                                    <line className="cls-3" x1="785.25" y1="76.77" x2="791.54" y2="1166.38"/>
                                    <line className="cls-3" x1="828.83" y1="104.92" x2="843.46" y2="1130.15"/>
                                    <line className="cls-3" x1="877.49" y1="150.28" x2="890.2" y2="1095.19"/>
                                    <line className="cls-3" x1="921.79" y1="190.9" x2="934.87" y2="1049.66"/>
                                    <line className="cls-3" x1="961.02" y1="257.12" x2="977.88" y2="990.89"/>
                                    <line className="cls-3" x1="1000.24" y1="342.33" x2="1020.74" y2="900.99"/>
                                    </g>
                            </g>
                        </svg>
                                
                </div>
            </article>
        </aside>
    )
}

export default CardBackground
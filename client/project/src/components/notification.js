
import React from 'react';
import { useContext, useEffect, useRef, useState } from "react"
import { RacketContext } from "../App"

const Notification = () => {
    const [state, dispatch] = useContext(RacketContext)
    const [ notificationText, setNotificationText ] = useState()
    const notificationRef = useRef()

    useEffect(()=>{
        if(!state.clientNotification ==''){
            setNotificationText(state.clientNotification)

            notificationRef.current.classList.add('notification-alert')
            setTimeout(()=>{
                notificationRef.current.classList.remove('notification-alert')
            },5000)
            setTimeout(()=>{
                dispatch({type:'clientNotification', payload:''})
            },100)
        }

    },[state.clientNotification])

    return(
        <aside ref={notificationRef} className="notification-container">
            <p>{notificationText}</p>
        </aside>
    )
}

export default Notification
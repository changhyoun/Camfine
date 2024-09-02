import React from 'react'
import {useNavigate } from 'react-router-dom'
import "./GoMain.css"

const GoMain = () => {
    const navigate = useNavigate();
    const goHome = () =>{
        navigate('/')
    }
    
  return (
    <div className="GoMain" onClick={goHome}>
        <span class="material-symbols-rounded">
            chevron_left
        </span>
        <p>메인 페이지로</p>
    </div>
  )
}

export default GoMain
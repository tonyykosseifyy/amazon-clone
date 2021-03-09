import React from 'react'
import './Categories.css' ;
import Card from '@material-ui/core/Card' ;
import { Link } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton' ;
import { useSelector } from 'react-redux' ;
function Categories({ title  , name}) {
    const darkTheme = useSelector(state => state?.darkTheme) ;
    let src = '' ;
    if(title) {
        switch (title) {
            case 'electronics':
                src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Dashboard/Fuji_Dash_PC_1x._SY304_CB431800965_.jpg'
                break;
        
            case 'jewelery' :
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ4ry4XPSLFl8yzOVr34zDNvtq02t4WSuzqvw&usqp=CAU'
                break;
            case 'men clothing' : 
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQPRIaJnD_yXaFl1qM8YggAZrHF1hfCW2TaSw&usqp=CAU'
                break 
            case 'women clothing' :
                src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT3BpZBsLy_eCPTTPtsMBtEuT4m7y5d_T9L9Q&usqp=CAU'
                break
        }}
    return (
            <div className='categories' style={{backgroundColor : darkTheme ? '#282828' : '' , color: darkTheme ? 'white' : ''}}>
                <h2>{title ? title : <Skeleton variant='text' />}</h2>
                <div>{src ? <img src={src} alt={title} /> : <Skeleton variant='rect' height={320}/>}</div>
                {title ? <Link to={`/${title}`} className='categories-link'>See more</Link> : <Skeleton variant='text'/>}
            </div>
    )
} ;

export default Categories ;

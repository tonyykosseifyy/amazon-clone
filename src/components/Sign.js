import React, { useState } from 'react'
import './Sign.css' ;
import Button from '@material-ui/core/Button' ; 
import amber from '@material-ui/core/colors/amber' ;
import { useDispatch , useSelector } from 'react-redux'
import { signIn } from '../actions' ;
import { Link } from 'react-router-dom' ;
import Fade from 'react-reveal/Fade' ;
import Bounce from 'react-reveal/Bounce' ;
import CloseIcon from '@material-ui/icons/Close' ;
import { Redirect } from 'react-router-dom' ;
import StyledAuth from './StyledAuth' ;

function Sign(props) {
    const yellow = amber[700]
    const dispatch = useDispatch() ;
    const userState = useSelector(state => state.user) ;
    const [closed , setClosed ] = useState(false )
    const [ submit , setSubmit ] = useState(false) ;

    
    const [user , setUser] = useState({
        firstname : ''
    })
    const handleChange = e => {
        setUser({
            ...user ,
            [e.target.name] : e.target.value
        }) ;
    }
    const handleSubmit = (e) => {
        setSubmit(true) ;
        e.preventDefault() ;
        if (user.firstname && user.lastname) {
            dispatch(signIn(user)) 
        }
    }

    console.log(userState ,' user namee---------------------------')
    return (
        <>
        { !userState?.displayName ? <>
        <div className='sign'>
            <img 
            src='https://vrzone.com/wp-content/uploads/2013/10/amazon-logo.png' 
            alt='amazon-logo' 
            />
            <div className='sign-in'>
                <h1>Sign-in</h1>
                <StyledAuth />
                 <form onSubmit={(e) => handleSubmit(e)} className='sign-in-form'>
                    <strong><label htmlFor='firstname'>First Name : </label></strong><br/>
                    <input value={user.firstname} name='firstname' onChange={(e) => handleChange(e)} className='first' id='firstname' type='name'/><br/>
                    <Button
                    onClick={e => handleChange(e)} 
                    type='submit'
                    size='medium'
                    variant='contained' 
                    style={{ backgroundColor : amber[800] , fontFamily: 'Open Sans, sans-serif' ,width: '100%' , marginTop: '20px'}}
                    >
                        Submit 
                    </Button> 
                
                </form>
                
            </div> 
                
        </div>
        <div className='fade-container'>
            <Fade right when={!closed} appear >
                <div className='sign-fade'>
                    <p className='sign-p'>Sign in to access your cart</p>
                    <CloseIcon className='close' onClick={() => setClosed(prev => !prev)}/>
                </div>
            </Fade>
        </div>
        </> : <Redirect to='/' /> }
        </> 
    )
}

export default Sign ;

/*  */

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
function Sign(props) {
    const redirect = useSelector(state => state.history) ;
    const yellow = amber[700]
    const dispatch = useDispatch() ;
    const loggedIn = useSelector(state => state.user.firstname) ;

    const [closed , setClosed ] = useState(false )
    const [ submit , setSubmit ] = useState(false) ;

    setTimeout(() => {
        setClosed(true)
    }, 3000);
    const [user , setUser] = useState({
        firstname : '' ,
        lastname : ''
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
    console.log(props.match)
    return (
        <>
        { !loggedIn ? <>
        <div className='sign'>
            <img 
            src='https://vrzone.com/wp-content/uploads/2013/10/amazon-logo.png' 
            alt='amazon-logo' 
            />
            <div className='sign-in'>
                <h1>Sign-Up</h1>
                <form onSubmit={(e) => handleSubmit(e)} className='sign-in-form'>
                    <strong><label htmlFor='firstname'>First Name : </label></strong><br/>
                    <input value={user.firstname} name='firstname' onChange={(e) => handleChange(e)} className='first' id='firstname' type='name'/><br/>
                    <Bounce cascade collapse text when={submit && !user.firstname}><p className='error'>First Name is required !</p></Bounce>
                    <strong><label htmlFor='lastname'>Last Name : </label></strong><br/>
                    <input name='lastname' value={user.lastname} onChange={(e) => handleChange(e)} id='lastname' type='name'/>
                    <Bounce cascade collapse text when={submit && !user.lastname}><p className='error'>Last Name is required !</p></Bounce>
                    <Button
                    onClick={e => handleChange(e)} 
                    type='submit'
                    size='medium'
                    variant='contained' 
                    style={{ backgroundColor : amber[800] , fontFamily: 'Open Sans, sans-serif' ,width: '100%' , marginTop: '20px'}}
                    >
                Submit </Button> 
                
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

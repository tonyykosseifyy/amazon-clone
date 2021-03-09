import React, { useState , useEffect }  from 'react'
import './Navbar.css' ;
import SearchIcon from '@material-ui/icons/Search' ;
import { Link } from 'react-router-dom' ;
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart' ;
import ControlledOpenSelect from './Category' ;
import LocationOnIcon from '@material-ui/icons/LocationOn' ;
import Brightness7Icon from '@material-ui/icons/Brightness7'
import Brightness4Icon from '@material-ui/icons/Brightness4'
import { useSelector , useDispatch } from 'react-redux' ;
import IconButton from '@material-ui/core/IconButton' 
import Tooltip from '@material-ui/core/Tooltip' ;
import { toggleDarkTheme} from '../actions.js' ;
import Fade from 'react-reveal/Fade' ;
import CloseIcon from '@material-ui/icons/Close' ;

function Navbar({category , handleChange}) {
    const [open, setOpen ] = useState(false) ;
    const dispatch = useDispatch() ;
    const cart = useSelector(state => state.cart)
    const loggedIn = useSelector(state => state.user.firstname) ;
    const handleSubmit = (e) => {
        e.preventDefault() ;
    }
    const darkTheme = useSelector(state => state?.darkTheme) ;
    const handleClick = () => {
        dispatch(toggleDarkTheme()) ;
    }
    useEffect(() => {
        setTimeout(() => {
            setOpen(false)
        }, 4000);
    },[open])
    return (
        <div className='navbar'>
            <img 
                src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 
                alt='amazon-logo' 
            />

            <div className='deliver-lebanon' >
                <LocationOnIcon className='deliver-icon'/>  
                <div className='deliver-leb'>    
                    <span>Deliver to</span>             
                    <strong>Lebanon</strong>    
                </div>
                  
            </div>
            
            <div className='navbar-search'>
                <form onSubmit={(e) => handleSubmit(e)}>
                    <div className='select-menu'><ControlledOpenSelect categoryName={category}/></div> 
                    <input type='text' placeholder='Search Amazon' onChange={handleChange ? (e) => handleChange(e) : null} />
                    <button type='submit'><SearchIcon fontSize='large'/></button>
                </form>
            </div>

            <div to='/sign-in' className='deliver' onClick={() => setOpen(true)} >
                <span>Hello, { loggedIn ? loggedIn : 'Sign In'}</span>
                <strong>Accounts & Lists</strong>
            </div>

            <Link className='deliver' to='/cart' >
                <span>Returns</span>
                <strong>& Orders</strong>
            </Link>

            <div className='deliver'>
            <Tooltip title='toggle light/dark mode'>
                <IconButton onClick={ () => handleClick()}>
                    {darkTheme ? <Brightness7Icon style={{color: 'white'}}/>:<Brightness4Icon style={{color: 'white'}}/>}  
                </IconButton>
            </Tooltip>
            </div>

            <Link to={loggedIn ? '/cart' : './sign-in'} className='navbar-cart' >
                <div className='cart-number'>
                    <strong>{cart.length}</strong>
                    <ShoppingCartIcon fontSize='large'/>
                </div>
                <strong>Cart</strong>
            </Link>

            <div className='message-container'>
                <Fade right when={open} >
                    <div className='sign-fade'>
                        <p className='sign-p'>You are already Signed In !</p>
                        <CloseIcon className='close' onClick={() => setOpen(false)}/>
                    </div>
                </Fade>
            </div>
            
        </div>
    )
}

export default Navbar ;

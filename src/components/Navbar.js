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
import { getCountry } from './getCountry' ;
import Menu from './Menu' ;
import HomeIcon from '@material-ui/icons/Home' ;
import ExpandMoreIcon from '@material-ui/icons/ExpandMore' ;


function Navbar({category , handleChange}) {
    const [ country , setCountry ] = useState('') ;
    const [open, setOpen ] = useState(false) ;
    const [ navOpen , setNavOpen ] = useState(false) ;
    const [ categoryOpen , setCategoryOpen ] = useState(false)
    const dispatch = useDispatch() ;
    const cart = useSelector(state => state.cart)
    const loggedIn = useSelector(state => state.user.displayName) ;
    const ToggleNav = () => {
        setNavOpen(false)
        handleClick() ;
    }
    const handleSubmit = (e) => {
        e.preventDefault() ;
    }
    const darkTheme = useSelector(state => state?.darkTheme) ;
    const handleClick = () => {
        dispatch(toggleDarkTheme()) ;
    }
    useEffect(() => {
        getCountry(setCountry)
    }, [])
    
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
            <Menu setNavOpen={setNavOpen} navOpen={navOpen} />
            <div className={`navbar-mobile ${navOpen && 'navbar-opened'}`}>
                <div className='navbar-mobile-top'>
                    <img 
                        src='http://pngimg.com/uploads/amazon/amazon_PNG11.png' 
                        alt='amazon-logo' 
                    />
                    <Menu setNavOpen={setNavOpen} navOpen={navOpen} />
                </div>
                 <div className={`nav-links-container ${navOpen && 'nav-open'}`}>
                    <Link className='nav-links' to='/'><HomeIcon /> Home</Link>
                    <Link className='nav-links' to='/cart' style={{justifyContent:'space-between'}}><div className='cart-nav'><ShoppingCartIcon /> Cart</div> <span>{cart.length}</span></Link>
                    <div className='nav-links' onClick={() => ToggleNav()}>
                        {darkTheme ? <Brightness7Icon /> : <Brightness4Icon />}
                        Toggle {darkTheme ? 'Dark': 'Light'} Mode
                    </div>
                    <Link className={`nav-links expand ${categoryOpen && 'expand-more'}`} onClick={() => setCategoryOpen(!categoryOpen)}>Categories <ExpandMoreIcon /> </Link>                    
                    <div className={`nav-links-category ${categoryOpen && 'nav-links-category-open'}`} style={{height: categoryOpen && '220px'}}>
                        <Link className='nav-links' to="/men's clothing">Men's clothing</Link>
                        <Link className='nav-links' to="/women's clothing">Women's clothing</Link>
                        <Link className='nav-links' to='/jewelery'>Jewelery</Link> 
                        <Link className='nav-links' to='/electronics'>Electornics</Link>
                    </div>
                    
                 </div>
            </div>
            <div className='navbar-overlay' style={{ display:navOpen ? 'block' : 'none' }}></div>
            <div className='deliver-lebanon' >
                <LocationOnIcon className='deliver-icon'/>  
                <div className='deliver-leb'>    
                    <span>Deliver to</span>             
                    <strong>{country ? country : 'Lebanon'}</strong>    
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

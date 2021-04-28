import React, { useEffect , useState } from 'react'
import './Cart.css' ;
import { useSelector } from 'react-redux' ;
import { Link } from 'react-router-dom' ;
import Navbar from './Navbar' ;
import Products from './Products' ;
import Avatar from '@material-ui/core/Avatar' ;

function Cart() {
    const darkTheme = useSelector(state => state.darkTheme) ;
    const user = useSelector(state => state.user)
    const cart = useSelector(state => state.cart) ;
    const [clicked , setClicked ] = useState(false) ;
    const [ navOpen , setNavOpen ] = useState(false) ;
    const [payAccount , setPayAccount] = useState(0) ;
    useEffect(() => {
        console.log('useEffect =>> ')
        if(cart.length) {
            let pay = 0 ;
            for(let i=0 ; i < cart.length ; i++) {
            pay += cart[i].price
            console.log('pay =>> ',pay)
        }
        setPayAccount(pay)
        } else {
            setPayAccount(0)
        }
    } ,[cart.length])
    const render = () => {
        setClicked(!clicked)
    }
    window.addEventListener('resize' , () => {
            if (window.innerWidth > 1040 ) {
                setNavOpen(false) ;
            }
        })
    return (
        <div className={navOpen && 'overflow-hidden'} >
        <Navbar openNav={(state) => setNavOpen(state)} /> 
        { !user.email && !user.photoURL ? '' :
        <div className='dashborad' style={{ backgroundColor: darkTheme ? '#101010' : '' , color: darkTheme ? 'white' : ''}} >
            <div className='dashborad-left'>
                <h3>{user.displayName}</h3>
                { user.email && <strong>email: <a href={`mailto:${user.email}`} >{user.email} </a></strong> }
            </div>
            { user.photoURL ? <Avatar alt={user.displayName} src={user.photoURL} style={{minHeight: '65px' , minWidth: '65px'}} /> : <Avatar style={{minHeight: '65px' , minWidth: '65px', backgroundColor: darkTheme && '#282828'}}>{user.displayName.charAt(0)}</Avatar>}
        </div> 
        }
        
        <div className={`cart ${cart.length ? 'reverse' : '' }`} style={{ backgroundColor: darkTheme ? '#101010' : '' , color: darkTheme ? 'white' : ''}} >
        { !cart.length ?
            <div className='cart-left' style={{ backgroundColor: darkTheme ? '#282828' : '' , color: darkTheme ? 'white' : ''}}>
                <img src='https://www.x1.com/wp-content/uploads/2018/09/Shopping-cart-icon.png' alt='cart' />
                <div className='empty'>
                    <h1>Your Amazon Cart is empty</h1>
                    <Link className='cart-link' to='/'>Shop today's deals </Link>
                </div>
            </div> 
            : <div className='category-product'>
                {cart.map((item , index) => (
                <Products item={item} key={index} atCart render={render} />
            ))  }
            </div> }
                <div className='cart-right' style={{ backgroundColor: darkTheme ? '#282828' : '' , color: darkTheme ? 'white' : ''}}>
                    <h1>Subtotal</h1>
                    <div className='cart-right-total'>
                        <p>Number of items : {cart.length ? cart.length : <span>0</span> }</p>
                        <p>Pay Account : {cart.length ? <span>${payAccount}</span> : <span>$0</span> }</p>
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default Cart ;

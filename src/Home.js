import React,{ useEffect } from 'react' ;
import { useDispatch , useSelector } from 'react-redux' ;
import { addCategories } from './actions' ;
import './Home.css';
import Navbar from './components/Navbar' ;
import Body from './components/Body' ;
import { addUsers , randomProducts } from './actions' ;
import { Redirect } from 'react-router-dom' ;

function Home() {
    const loggedIn = useSelector(state => state.user.firstname)
    const dispatch = useDispatch() ;
    const category = useSelector(state => state?.categories) ;
    async function fetchUsers() {
        const response = await fetch('https://fakestoreapi.com/users?limit=4') ;
        const users = await response.json() ;
        dispatch(addUsers(users))
    }
    async function fetchProducts() {
        const response = await fetch('https://fakestoreapi.com/products?limit=4') ;
        const users = await response.json() ;
        dispatch(randomProducts(users))
    }
    useEffect(() => { 
            fetchUsers() ;
            fetchProducts()
        },[])
    return (
        <div className='home'>
          {loggedIn ? 
          <> 
            <Navbar />
            <Body /> 
          </> : <Redirect to='/sign-in' /> }
        </div> 
    )
} ;

export default Home;
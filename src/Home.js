import React,{ useEffect , useState } from 'react' ;
import { useDispatch , useSelector } from 'react-redux' ;
import './Home.css';
import Navbar from './components/Navbar' ;
import Body from './components/Body' ;
import { addUsers , randomProducts } from './actions' ;
import { Redirect } from 'react-router-dom' ;

function Home() {
    const loggedIn = useSelector(state => state.user.displayName)
    const dispatch = useDispatch() ;
    const [ open , setOpen ] = useState(false) ;
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
        window.addEventListener('resize' , () => {
            if (window.innerWidth > 1040 ) {
                setOpen(false) ;
            }
        })
    return (
        <div className={ open ? "overflow-hidden" : "" }>
          {loggedIn ? 
          <> 
            <Navbar openNav={setOpen} />
            <Body /> 
          </> : <Redirect to='/sign-in' /> }
        </div> 
    )
} ;

export default Home;
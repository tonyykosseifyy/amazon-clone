import React, { useEffect } from 'react'
import {BrowserRouter as Router , Route , Switch , Redirect } from 'react-router-dom' ;
import Home from './Home' ;
import { useDispatch , useSelector } from 'react-redux' ;
import CategoryProduct from './components/CategoryProduct' ;
import Sign from './components/Sign' ;
import { addCategories } from './actions' ;
import Cart from './components/Cart'
import './App.css'; 

function App() {
    const user = useSelector(state => state.user.displayName)
    const dispatch = useDispatch() ;
    const categories = useSelector(state => state?.categories) ;
    async function fetchCategories() {
        const response = await fetch('https://fakestoreapi.com/products/categories') ;
        const products = await response.json() ;
        dispatch(addCategories(products))
    }
    useEffect(() => { 
        fetchCategories() ;
    },[])
    return (
        <Router>
            <Switch>  
                    <Route exact path='/sign-in' component={Sign}/>
                    { !user ?  <Redirect from='/' to='/sign-in' /> : <Redirect from='sign-in' to='/' /> }
                    <Route exact path='/' component={Home}/>
                    <Route exact path='/cart' component={Cart}/>
                    
                    {categories?.map((item , index) => (
                        <Route exact strict path={`/${item}`} key={index}>
                            <CategoryProduct key={index} category={item} clsName='category-product'/>
                        </Route>
                    ))}
                    
            </Switch>
        </Router>
    )
}

export default App

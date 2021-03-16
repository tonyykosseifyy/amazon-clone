import React, { useEffect  , useState } from 'react'
import Navbar from './Navbar' ;
import './CategoryProduct.css' ; 
import Skeleton from '@material-ui/lab/Skeleton' ; 
import StarIcon from '@material-ui/icons/StarRateRounded' ;
import Button from '@material-ui/core/Button' ;
import amber from '@material-ui/core/colors/amber' ;
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart' ;
import Products from './Products' ;
import { useSelector } from 'react-redux' ;

function CategoryProduct({category , clsName}) {
    const yellow = amber[700]
    const darkTheme = useSelector(state => state.darkTheme)
    const [changed , setChanged] = useState(false) ;
    const [input , setInput ] = useState('') ;
    const [ searchFailed , setSearchFailed ] = useState(false) ;
    const [display , setDisplay ] = useState([]) ;
    const [categoryProduct , setCategoryProduct ] = useState() ;
    const [ requested , setRequested ] = useState([0,0,0,0,0,0]) ;
    async function fetchCategoryProducts() {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`) ;
        const data = await response.json() ;
        setCategoryProduct(data) ;
    }
    useEffect(() => {
        fetchCategoryProducts() ;
    }, [])
    const handleChange = e => {
        setChanged(true) ;
        setInput(e.target.value)
    }
    const object = [1 , 2, 3, 4]
    let array = categoryProduct?.map((item , index ) => {return item.title })

    useEffect(() => {
        if( input ) {
            array.fill(false)
            let s = array ;
            let requst = [] ;
            s.fill(' ') ;
            console.log(`s =>> ${s}`) ;
            let numb ;
            categoryProduct?.filter((item , index) => {
                if(item.title.toUpperCase().search(input.toUpperCase()) > -1 ) {
                    array[index] = false ;
                    requst.push(item.title.toUpperCase().search(input.toUpperCase()))
                } else {
                    array[index] = true ;
                    requst.push(item.title.toUpperCase().search(input.toUpperCase()))
                }})
                setDisplay(array) ;
                setRequested(requst) ;
                console.log(requested, 'requesteddd===================') ;
        }
        }, [input])
        
    return (
        <div style={{ backgroundColor: darkTheme ? '#101010' : '#EAEDED'}}>
            <Navbar category={category} handleChange={handleChange} />
            <div className='category-product'>
                { categoryProduct ? categoryProduct?.map((item , index ) => (
                    <div style={{display : !display[index] || !input ? 'flex' : 'none' }}>
                        <Products item={item} index={index} requested={requested[index]} input={input} />
                    </div>
                )) : object.map((item , index) => (
                    <Products index={index} />
                ))}
                
            </div>
            { display.every((item) => {
                return item === true 
            }) && input ? <p className='search-failed'>No results found for <strong>"{input}"</strong></p> : null}
        </div>
    )
} ;

export default CategoryProduct ;

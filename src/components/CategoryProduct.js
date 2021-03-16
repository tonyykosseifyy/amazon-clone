import React, { useEffect  , useState } from 'react'
import Navbar from './Navbar' ;
import './CategoryProduct.css' ; 
import Products from './Products' ;
import { useSelector } from 'react-redux' ;
import Fade from 'react-reveal/Fade' ;
function CategoryProduct({category , clsName}) {
    const darkTheme = useSelector(state => state.darkTheme)
    const [input , setInput ] = useState('') ;
    const [display , setDisplay ] = useState([]) ;
    const [categoryProduct , setCategoryProduct ] = useState([]) ;
    const [ requested , setRequested ] = useState([]) ;
    async function fetchCategoryProducts() {
        const response = await fetch(`https://fakestoreapi.com/products/category/${category}`) ;
        const data = await response.json() ;
        setCategoryProduct(data) ;
    }
    useEffect(() => {
        fetchCategoryProducts() ;
        let arr = categoryProduct?.map((item , index ) => {return item.title })
        arr.fill(0) ;
        setCategoryProduct(arr) ;
    }, [])
    const handleChange = e => {
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
                { categoryProduct.length > 0  ? categoryProduct?.map((item , index ) => (
                    <div style={{display : !display[index] || !input ? 'flex' : 'none' }}>
                        <Products item={item} index={index} requested={requested[index]} input={input} />
                    </div>
                )) : object.map((item , index) => (
                    <Products index={index} />
                ))}
                
            </div>
            { display.every((item) => {
                return item === true 
            }) && input ? 
            <Fade right>
            <p style={{color: darkTheme && 'white' , minHeight: '100%'}} className='search-failed'>No results found for <strong>"{input}"</strong></p>
            </Fade>
             : 
             null}
        </div>
    )
} ;

export default CategoryProduct ;

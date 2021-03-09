import React, { useEffect , useState } from 'react'
import './Products.css' ;
import Skeleton from '@material-ui/lab/Skeleton' ; 
import StarIcon from '@material-ui/icons/StarRateRounded' ;
import Button from '@material-ui/core/Button' ;
import amber from '@material-ui/core/colors/amber' ;
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart' ;
import { useDispatch , useSelector } from 'react-redux' ;
import { addProduct , removeProduct  } from '../actions' ;
import { Link } from 'react-router-dom' ;
import Fade from 'react-reveal/Fade'

function Products({item , index , atCart , render}) {
    const darkTheme = useSelector(state=> state.darkTheme) ;
    const loggedIn = useSelector(state => state?.user?.firstname)
    const cart = useSelector(state => state?.cart) 
    const [rating , setRating] = useState() ;
    const [ stored , setStored ] = useState(false) 
    const dispatch = useDispatch() ;
    let array = [1 , 2 ,3 ,4 ] ;   
    let newArray ;
    const randomNumber = (min , max ) => {return Math.floor(Math.random() * (max - min + 1) ) + min }
    useEffect(() => {
        if (item) {
        let num = randomNumber(2 , 5)
        newArray = array.slice(0 , num) ;
        setRating(newArray)
        }
    },[])
    useEffect(() => {
        if(stored) {
            const tomeoutId = setTimeout(() => {
                setStored(false)
            }, 1500);
        }
    },[stored])
    console.log(rating )

    const addToCart = () => {
        console.log('item =>>' , item)
        dispatch(addProduct(item))
        setStored(true)
    }
    const removeFromCart = () => {
        dispatch(removeProduct(item))
        console.log('removed')
        setStored(true)
        render()
    }
    console.log('cart =>>' , cart)
    return (
        <div className={`single-product ${darkTheme ? 'black' : ''} ${atCart ? 'cart-left' : 'withmargin'}`} style={{backgroundColor : darkTheme ? '#282828' : ''}}>
            { item ? <img src={item.image} alt={item.title} /> : <Skeleton className='skeleton1' variant='rect' height={350} width={440} />}
            <div className='product-info' >
                { item ? <h1>{item.title}</h1> : <Skeleton variant='text' height={160} />}
                {item ? <strong><span>price :</span> ${item.price}</strong> : <Skeleton variant='text' height={20} width={120} />}
                { item ? 
                <div>
                    {rating?.map((item , index) => (
                    <StarIcon style={{color: amber[900]}}/>
                    ))}
                </div>: <Skeleton variant='text' height={20} width={120} /> }
                {item ? <h2>About this item</h2> : <Skeleton variant='text' height={20} width={120} /> }
                {item ? <p>{item.description}</p> : <Skeleton  variant='text' height={100} />}

               {item ?  <Button
                onClick={ !atCart ?  () => addToCart()  : () => removeFromCart() }
                startIcon={<AddShoppingCartIcon />}
                size='medium'
                variant='contained' 
                style={{ backgroundColor : amber[800] ,marginTop: '20px' , maxWidth :'300px', fontFamily: 'Open Sans, sans-serif'}}
                >
                { !atCart ? 'Add To Cart' : 'Remove From Cart'} </Button> : <Skeleton className='skeleton2'  variant='rect' height={40} width={200} />}
                <Fade when={stored}>
                    <h2>Item {!atCart ? 'added' : 'removed'} </h2>
                </Fade>
            </div>
        </div>
    )
}

export default Products

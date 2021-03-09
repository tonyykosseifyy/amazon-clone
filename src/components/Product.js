import React from 'react'
import './Product.css' ;
import StarIcon from '@material-ui/icons/StarRateRounded' ;
import Card from '@material-ui/core/Card' ;
import { Link } from 'react-router-dom'
import Skeleton from '@material-ui/lab/Skeleton' ;
import amber from '@material-ui/core/colors/amber' ;
import Button from '@material-ui/core/Button' ;
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart' ;
import { useSelector } from 'react-redux' ;

function Product({ info , index }) {
    const darkTheme = useSelector(state => state?.darkTheme) ;
    const yellow = amber[700]
    let array = [1 , 2 ,3 ,4 ] ;   
    let newArray ;
    const randomNumber = (min , max ) => {
        let rating = Math.floor(Math.random() * (max - min + 1) ) + min ;
        return rating ;
    }
    if (info) {
        let num = randomNumber(2 , 5)
        newArray = array.slice(0 , num) ;
    }
    
    return (
        <div className={`product ${darkTheme ? 'black' : ''}`}  style={{backgroundColor : darkTheme ? '#282828' : '' }}>
            <div>{info ? <img src={info.image} alt={info.title} /> : <Skeleton variant='rect' height={320}/>}</div>
            {info ? <p>{info.title}</p> : <Skeleton variant='text' />}
            {info ? <span>{`$ ${info.price}`}</span> : <Skeleton variant='text'/>}
            <div className='product-rating'>
                {info ?  newArray.map((item , index) => (
                    <StarIcon style={{ color : amber[800]}} />
                )) : <Skeleton variant='text' /> }
            </div>
            <div className='product-bottom'>
                { info ? <Link to={`/${info?.category}`} className='product-link'>Learn More</Link> : <Skeleton variant='text'/>}
                {info ? <Link className='button-link' to={`/${info.category}`} ><Button
                startIcon={<AddShoppingCartIcon />}
                size='medium'
                variant='contained' 
                style={{ backgroundColor : amber[800] , fontFamily: 'Open Sans, sans-serif'}}
                >
                Add To Cart </Button></Link> : <Skeleton variant='rect'/>}
            </div>
        </div>
    )
} ;

export default Product ;

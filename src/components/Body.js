import React from 'react'
import './Body.css' ;
import  {Swiper , SwiperSlide } from 'swiper/react' ;
import SwiperCore , { Navigation  , A11y , Autoplay , Keyboard } from 'swiper' ;
import 'swiper/swiper.scss' ;
import 'swiper/components/navigation/navigation.scss' ;
import { useSelector } from 'react-redux' ;
import Categories from './Categories' ;
import Users from './Users' ;
import ArrowForwardRoundedIcon from '@material-ui/icons/ArrowForwardRounded' ;
import Product from './Product' ;
SwiperCore.use([Navigation , A11y , Autoplay , Keyboard]) ;

function Body() {
    const array = [1,2,3,4] ;
    const categories = useSelector(state => state.categories) ;
    const users = useSelector(state => state?.users)
    const randomProducts = useSelector(state => state?.randomProducts) ;
    const darkTheme = useSelector(state => state?.darkTheme) ;
    console.log(darkTheme)
    return (
        <div className='body' style={{ backgroundColor: darkTheme ? '#101010' : '' , color: darkTheme ? 'white' : ''}}>
            <div className='body-images'>
                <Swiper 
                keyboard
                autoplay = {{delay: 4000 }}
                spaceBetween={0} 
                slidesPerView={1}
                navigation
                >
                    <SwiperSlide><img src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg' alt='amazon-sales'/></SwiperSlide>
                    <SwiperSlide><img src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Toys_en_US_1x._CB431858161_.jpg' alt='amazon-sales'/></SwiperSlide>
                    <SwiperSlide><img src='https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/NYNY/Fuji_TallHero_NYNY_en_US_1x._CB412256579_.jpg' alt='amazon-sales'/></SwiperSlide>
                </Swiper>
                </div>
                {/* div absolute 100% bottom : 0  */}
                <div className={`body-fade ${darkTheme ? 'dark' : 'light'}` } > </div>
                <div className='cont-category'>
                    <h1 className='shop-category'>Shop by Category</h1>
                    <ArrowForwardRoundedIcon className='arrow' fontSize='large'/>
                </div>
                <div className='body-categories' >
                    { categories ? categories.map((item , index) => (    
                        <Categories title={item} 
                            className={`category-item${index}`}
                            key={index} 
                        />
                    )) : array.map((item , index) => (
                        <Categories className={`category-item${index}`} key={index} index={index} />
                        
                    ))}
                </div>
                    <div className='daily'>
                        <h1 className='body-products'>Daily Deals</h1>
                        <ArrowForwardRoundedIcon className='arrow' fontSize='large'/>
                    </div>

                    <div className='body-users'>
                        {randomProducts ? randomProducts.map((item , index) => (    
                            <Product info={item} 
                                className={`category-item${index}`}
                                key={index} 
                            />
                        )) : array.map((item , index) => (
                            <Product className={`category-item${index}`} key={index} index={index}/>
                            
                        ))}
                    </div>
                
                {/*<div className='body-users'>
                    {users?.map((item , index) => (
                        <Users info={item} key={index} className={`category-item${index}`} />
                    ))}
                </div>*/}
            </div>
        
    )
} ;

export default Body ;
//https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Home_v2_en_US_1x._CB429090084_.jpg
//https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Fuji/2020/May/Hero/Fuji_TallHero_Computers_1x._CB432469755_.jpg
//https://images-na.ssl-images-amazon.com/images/G/01/AmazonExports/Events/2021/NYNY/Fuji_TallHero_NYNY_en_US_1x._CB412256579_.jpg
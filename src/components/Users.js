import React from 'react'
import './Users.css' ;
import Avatar from '@material-ui/core/Avatar' ;
import Email from '@material-ui/icons/Email' ;
import LocationOnIcon from '@material-ui/icons/LocationOn' ;
import amber from '@material-ui/core/colors/amber' ;

function Users({ info , index }) {
    
    const usersImages = [
        'https://www.gravatar.com/avatar/1b8fabaa8d66250a7049bdb9ecf44397?s=250&d=mm&r=x' ,
        'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWVVBhM9gHkGMTkF9JyPFxYQqFXQqMlU86Gg&usqp=CAU' ,
        ''
    ]
    return (
        <div className='users'>
        <Avatar className='avatar' fontSize='large' />
        <h2>{`${info.name.firstname} ${info.name.lastname}`}</h2>
        <div className='users-address'>
            <LocationOnIcon />
            <p>{`${info.address.city}, ${info.address.street}`}</p> 
        </div>
        <a href={`tel:${info.phone}`}>{info.phone}</a>
        <div className='users-email'>
            <button>Follow</button>
            <Email fontSize='large' color='secondary'/>
        </div>
        </div>
    )
} ;

export default Users ;

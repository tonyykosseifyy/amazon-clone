 export const initialState = {
    //sign in 
    user : {
        firstname : null ,
        lastname: null
    } ,
    //shopping 
    categories : null ,
    products : [] ,
    randomProducts : null ,
    //cart
    cart: [] ,
    //theme 
    darkTheme : false ,
    history : ''
} 

export function reducer(state=initialState , action) {
    switch(action.type) {
        case 'ADD_CATEGORIES' :
            return {
                ...state ,
                categories : action.playload 
            }
        case 'TOGGLE_THEME' : 
            return {
                ...state ,
                darkTheme: !state.darkTheme
            }
        case 'ADD_USERS' : 
            return {
                ...state ,
                users: action.playload 
            }
        case 'ADD_RANDOM_PRODUCTS' : 
            return {
                ...state , 
                randomProducts : action.playload 
            }
        case 'SIGN_IN' : 
            return {
                ...state ,
                user : {
                    firstname : action.playload.firstname ,
                    lastname: action.playload.lastname
                    
                    }
            }
        case 'ADD_TO_CART' :
            return {
                ...state , 
                cart : [...state.cart , action.playload]
            }
        case 'REMOVE_FROM_CART' :
            let newCart = state.cart 
            let index = newCart.findIndex((current) => { return current.id === action.playload.id }) 
            if( index > -1 ) {
                newCart.splice(index , 1) 
            } 
            return {
                ...state , 
                cart : newCart 
            }
        default : 
            return state ;
    }
}

export const addCategories = categories => {
    return {
        type: 'ADD_CATEGORIES' ,
        playload: categories 
    }
    
} ;

export const toggleDarkTheme = () => {
    return {
        type: 'TOGGLE_THEME' ,
    }
} ;

export const addUsers = users => {
    return {
        type: 'ADD_USERS' ,
        playload: users
    }
}
export const randomProducts = proudcts => {
    return {
        type: 'ADD_RANDOM_PRODUCTS' ,
        playload: proudcts 
    }
} ;
export const signIn = info => {
    console.log('dispatched infooo' ,  info )
    return {
        type: 'SIGN_IN' ,
        playload: info 
    }
} ;

export const addProduct = item => {
    return {
        type: 'ADD_TO_CART' ,
        playload: item 
    }
}

export const removeProduct = item => {
    return {
        type: 'REMOVE_FROM_CART' ,
        playload: item 
    }
}


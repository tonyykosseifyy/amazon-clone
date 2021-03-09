const initialState = { 
    darkTheme : false
}

export function reducer(state=initialState , action) {
    switch(action.type) {
        case 'TOGGLE_THEME' : 
        return {
            darkTheme: !state.darkTheme
        }
        default : 
            return state ;
    }
    console.log(state.darkTheme)
}

export const wishlistReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_TO_WISHLIST':{
            const find = state.find(pd => pd.id === action.payload.id)
            
            return find ? state :   [...state, action.payload];
        }
           
        case 'REMOVE_FROM_WISHLIST':
            return state.filter(item => item.id !== action.payload);
        default:
            return state;
    }
};
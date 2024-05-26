import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import inventory from '../reducers/inventory';
import orders from './orders';
import suppliers from './suppliers';

const appReducer = combineReducers({
    inventory,
    orders,
    suppliers
})

const rootReducer = (state, action) => {

    // when a logout action is dispatched it will reset redux state
    if (action.type === 'USER_LOGGED_OUT') {

        console.log("User Logged Out")
        state = undefined;

    }
    return appReducer(state, action);
}

export default configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        })

})
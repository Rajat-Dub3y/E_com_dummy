import {configureStore} from "@reduxjs/toolkit";
import {setupListeners} from "@reduxjs/toolkit/query/react";
import { apislice } from "./api/apiSlice"; 
import authReducer from "./features/auth/authSlice"
import favoritesReducer from "../redux/features/favorites/favoriteSlice"
import { getFavoritesFromLocalStorage } from "../utils/localstorage";
import cartSliceReducer  from "./features/cart/cartSlice";
import shopReducer from "./features/shop/shopSlice"

const initialfavorites=getFavoritesFromLocalStorage() || []

const store=configureStore({
    reducer:{
        [apislice.reducerPath]:apislice.reducer,
        auth:authReducer,
        favorites:favoritesReducer,
        cart:cartSliceReducer,
        shop:shopReducer
    },
    preloadedState:{favorites:initialfavorites},
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat(apislice.middleware),
    devTools:true,
});
setupListeners(store.dispatch)
export default store

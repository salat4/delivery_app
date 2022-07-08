import { configureStore } from '@reduxjs/toolkit'
import { orderSlice,cartSlice } from './orderSlice'
export const store = configureStore({
    reducer: {
        [orderSlice.name]: orderSlice.reducer,
        [cartSlice.name]:cartSlice.reducer,
    }
})
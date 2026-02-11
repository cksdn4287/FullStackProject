import { configureStore } from "@reduxjs/toolkit";
import loginSlice from './slices/loginSlice'
import cartSlice from './slices/cartSlice'

export const store = configureStore({
  reducer: {
    "loginSlice": loginSlice,
     "cartSlice":cartSlice
  }
})

// export default configureStore({
//   reducer:{
//     "loginSlice": loginSlice,
//     "cartSlice":cartSlice
//   }
// })
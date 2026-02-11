import { createAsyncThunk , createSlice } from "@reduxjs/toolkit";
import {getCartItems, postChangeCart} from "../api/cartApi"


export const getCartItemsAsync = createAsyncThunk('getCartItemsAsync' , () => {

  return getCartItems()
})


export const postChangeCartAsync =  createAsyncThunk('postCartItemsAsync' , (param) => {

  return postChangeCart(param)
})

const initState = []

const cartSlice = createSlice({
  name:'cartSlice',
  initialState:initState,

  extraReducers:  (builder) => {
    builder.addCase(
      getCartItemsAsync.fulfilled, (state, action) => {
        console.log("서버에서 돌아온 장바구니 결과:", action.payload)

        return action.payload
      }
    )
    .addCase(
      postChangeCartAsync.fulfilled, (state, action) => {

        console.log("장바구니 요청 실패 사유:", action.error)

        return action.payload
      }
    )
  }
})

export default cartSlice.reducer
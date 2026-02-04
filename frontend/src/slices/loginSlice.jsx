import { createSlice , createAsyncThunk } from "@reduxjs/toolkit";
import { loginPost } from "../api/memberApi" ;
import { setCookie, getCookie , removeCookie } from "../util/cookieUtil";

const initState = {
  email:''
}

const loadMemberCookie = () => {
  const memberInfo = getCookie("member")

  if(memberInfo && memberInfo.nickname){
    memberInfo.nickname = decodeURIComponent(memberInfo.nickname)
  }

  return memberInfo
}
export const loginPostAsync = createAsyncThunk('loginPostAsync', (param) => {
  return loginPost(param)
})


const loginSlice = createSlice({
  name:'LoginSlice',

  initialState : loadMemberCookie() || initState,

  reducers:{
    login:(state, action) => {
      console.log("login paylode 확인 : " , action.payload)
      
      const payload = action.payload

      setCookie("member" , JSON.stringify(payload) , 1)
      // setCookie("member" , payload , 1);
      return payload
    },

    logout:(state , action) => {
      console.log("logout---------")

      removeCookie('member')
      
      return {...initState}
    }
  },

  extraReducers : (builder) => {
    builder.addCase(loginPostAsync.fulfilled , (state, action) => {
      console.log("fulfilled")

      const payload = action.payload

      if( payload && !payload.error){
        setCookie("member", JSON.stringify(payload), 1)
        // setCookie("member", payload ,1);
      }
      return payload
    })
    .addCase(loginPostAsync.rejected, (state, action) => {
      console.log("rejected");
        console.error("로그인 실패: 서버 연결 또는 인증 오류");
      })
    .addCase(loginPostAsync.pending, (state, action) => {
      console.log("pending")
    })
  }
})

export const {login, logout} = loginSlice.actions

export default loginSlice.reducer
// import axios from "axios";
// import { getCookie } from "./cookieUtil";

// const jwtAxios = axios.create()

// const beforeReq = (config) => {
//   console.log("before  request--------------")

//   const memberInfo = getCookie("member")

//   if(!memberInfo){
//     console.log("Member NOT FOUND")
//     return Promise.reject(
//       {response:
//         {
//           data:
//           {error:"REQUIRE_LOGIN"}
//         }
//       }
//     )
//   }

//   const {accessToken} = memberInfo

//   config.headers.Authorization = `Bearer ${accessToken}`

//   return config
// }

// const requestFail = (err) => {
//   console.log("request error -----------------")

//   return Promise.reject(err)
// }

// const beforeRes = async (res) => {
//   console.log("before return response---------------")

//   console.log(res.data)
//   return res.data
// }

// const responseFail = (err) => {
//   console.log("response fail error---------------")

//   return Promise.reject(err)
// }

// jwtAxios.interceptors.request.use(beforeReq, requestFail)

// jwtAxios.interceptors.response.use(beforeRes, responseFail)

// export default jwtAxios



import axios from "axios";
import { getCookie, setCookie } from "./cookieUtil";


const API_SERVER_HOST = 'http://localhost:8080'

const jwtAxios = axios.create()

const refreshJWT = async (accessToken , refreshToken) => {

  const host = API_SERVER_HOST

  const header = {headers:{"Authorization": `Bearer ${accessToken}`}}

  const res = await axios.get(`${host}/api/member/refresh?refreshToken=${refreshToken}` , header)

  console.log("------------------------")
  console.log(res.data)

  return res.data
}


const beforeReq = (config) => {
  console.log("before request--------------")
  const memberInfo = getCookie("member")

  if(!memberInfo){
    console.log("Member NOT FOUND")
    return Promise.reject({response:{data:{error:"REQUIRE_LOGIN"}}})
  }

  const {accessToken} = memberInfo
  config.headers.Authorization = `Bearer ${accessToken}`
  return config
}

const requestFail = (err) => {
  console.log("request error -----------------")
  return Promise.reject(err)
}

const beforeRes = async (res) => {
  console.log("before return response---------------")

  // console.log(res)
  const data = res.data

  if(data && data.error === 'ERROR_ACCESS_TOKEN'){

    const memberCookieValue = getCookie("member")

    const result = await refreshJWT(memberCookieValue.accessToken, memberCookieValue.refreshToken)

    console.log("refreshJWT RESULT" , result)

    memberCookieValue.accessToken = result.accessToken
    memberCookieValue.refreshToken = result.refreshToken

    setCookie("member" , JSON.stringify(memberCookieValue) , 1)

    const originalRequest = res.config

    originalRequest.headers.Authorization = `Bearer ${result.accessToken}`

    return await axios.request(originalRequest)
  }
  
  // 🚨 중요: 여기서 .data를 붙이지 마세요! 원본 그대로 넘깁니다.
  return res 
}

// const responseFail = (err) => {
//   console.log("response fail error---------------")

//   if (err.response && err.response.status === 401) {
//     console.log("인증 실패(401) - 토큰 갱신 혹은 재로그인이 필요합니다.");
//     // 필요시 여기서 refreshJWT를 호출하거나 로그아웃 처리
//   }

//   return Promise.reject(err)
// }

const responseFail = async (err) => {
  console.log("response fail error---------------")

  // 🚨 추가: 상태 코드가 401인 경우에도 토큰 갱신을 시도하게 합니다.
  if (err.response && err.response.status === 401) {
   const memberInfo = getCookie("member");

    console.log("쿠키에서 가져온 회원 정보:", memberInfo);

    if (memberInfo && memberInfo.refresh) {
      console.log("401 에러 발생 - 토큰 갱신 시도")
      try {
        const result = await refreshJWT(memberInfo.accessToken, memberInfo.refresh)
        memberInfo.accessToken = result.accessToken
        // memberInfo.refresh = result.refreshToken
        memberInfo.refresh = result.refreshToken || result.refresh || memberInfo.refresh
        setCookie("member", JSON.stringify(memberInfo), 1)

        // 원래 요청 재시도
        const originalRequest = err.config
        originalRequest.headers.Authorization = `Bearer ${result.accessToken}`
        return await axios.request(originalRequest)
      } catch (refreshErr) {
        // 리프레시 토큰도 만료된 경우
        console.log("리프레시 토큰으로 갱신 실패")
        // window.location.href = "/member/login" 
      }
    }else{
      console.log("리프레시 토큰 자체가 쿠키에 없습니다")
    }
  }
  return Promise.reject(err)
}

jwtAxios.interceptors.request.use(beforeReq, requestFail)
jwtAxios.interceptors.response.use(beforeRes, responseFail)

export default jwtAxios
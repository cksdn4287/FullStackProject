import axios from "axios"
import { API_SERVER_HOST } from "./todoApi"

const rest_api_key = `18923e5dc41ec198009923c66d126ee2`
const redirect_uri =`http://localhost:3000/member/kakao` 

const auth_code_path = `https://kauth.kakao.com/oauth/authorize`

const access_token_url = `https://kauth.kakao.com/oauth/token`

export const getKakaoLoginLink = () => {

  const kakaoURL = `${auth_code_path}?client_id=${rest_api_key}&redirect_uri=${redirect_uri}&response_type=code`;

  return kakaoURL
}

export const getAccessToken = async (authCode) => {

  const header = {
    headers:{
      "Content-Type":"application/x-www-form-urlencoded;charset=utf-8",
    }
  }

  const params = {
    grant_type:"authorization_code",
    client_id: rest_api_key,
    redirect_uri:redirect_uri,
    code:authCode
  }

  const res = await axios.post(access_token_url, params, header)

  const accessToken = res.data.access_token
  return accessToken
}


// export const getAccessToken = async (authCode) => {
//   try{
//   // 1. 소문자 headers로 수정
//   const header = {
//     headers: {
//       "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
//     }
//   };

//   // 2. URLSearchParams를 사용하여 Form Data 형식으로 변환
//   const params = new URLSearchParams();
//   params.append("grant_type", "authorization_code");
//   params.append("client_id", rest_api_key);
//   params.append("redirect_uri", redirect_uri);
//   params.append("code", authCode);

//   const res = await axios.post(access_token_url, params, header);

//   return res.data.access_token;
// }catch(error){
//   console.error("Kakao Token Error Detail:", error.response?.data);
//     throw error;
// }
// };
export const getMemberWithAccessToken = async(accessToken) => {

  const res = await axios.get(`${API_SERVER_HOST}/api/member/kakao?accessToken=${accessToken}`)

  return res.data
}
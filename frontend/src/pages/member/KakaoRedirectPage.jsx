import { useSearchParams } from "react-router-dom";
import { useEffect } from "react";
import { getAccessToken  , getMemberWithAccessToken} from "../../api/kakaoApi";
import { useDispatch } from "react-redux";
import { login } from "../../slices/loginSlice";
import useCustomLogin from "../../hooks/useCustomLogin";

const KakaoRedirectPage = () => {

  const [searchParams] = useSearchParams()

  const {moveToPath} = useCustomLogin()

  const dispatch = useDispatch()

  const authCode = searchParams.get("code")

  useEffect(   () => {

    getAccessToken(authCode).then( accessToken => {
      console.log(accessToken)

      getMemberWithAccessToken(accessToken).then(memberInfo => {

        console.log("카카오 로그인 회원 정보--------------------------")
        console.log(memberInfo)

        dispatch(login(memberInfo))

      if(memberInfo){
          moveToPath("/member/modify") // 소셜 회원이면 수정 페이지로
      } else {
          moveToPath("/") // 일반 회원이면 메인으로
      }
      })
    })
  }, [authCode])

  return(
    <div>
    <div>Kakao Login Redirect</div>
    <div>{authCode}</div>
    </div>
  )
}

export default KakaoRedirectPage;
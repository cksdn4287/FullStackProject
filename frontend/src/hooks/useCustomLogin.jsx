import { useDispatch, useSelector } from "react-redux";
import { Navigate , useNavigate , createSearchParams} from "react-router-dom";
import { loginPostAsync, logout } from "../slices/loginSlice";

const useCustomLogin = () => {

  const navigate = useNavigate()

  const dispatch = useDispatch()

  const loginState = useSelector(state => state.loginSlice)

  const isLogin = loginState.email ? true : false

  const doLogin = async (loginParam) => {

    const action = await dispatch(loginPostAsync(loginParam))
    
    return action.payload
  }

  const doLogout = () => {

    dispatch(logout())
  }

  const moveToPath = (path) => {
    navigate({pathname:path} , {replace:true})
  }

  const moveToLogin = () => {

    navigate({pathname: '/member/login'} , {replace:true})
  }

  const moveToLoginReturn = () => {
    return <Navigate replace to = "/member/login"></Navigate>
  }

  const exceptionHandle = (ex) => {

    console.log("Exception  실행됨  --------------------")

    console.log(ex)

    // const errorMsg = ex.response.data.error   

    // const errorStr = createSearchParams({error:errorMsg}).toString()

    // if(errorMsg === 'REQUIRE_LOGIN'){
    //   alert("로그인 해야만 합니다")
    //   navigate({pathname:'/member/login', search:errorStr})

    //   return
    // }

    // if(ex.response.data.error === 'ERROR_ACCESSDENIED'){
    //   alert("해당 메뉴를 사용할 수 있는 권한이 없습니다")
    //   navigate({pathname:'/member/login' , search:errorStr})
    //   return
    // }

    // 안전한 접근을 위한 옵셔널 체이닝
    const errorMsg = ex?.response?.data?.error; 
    const errorStr = createSearchParams({error: errorMsg || 'UNKNOWN_ERROR'}).toString();

    // 1. 로그인 필요 (토큰 없음 등)
    if(errorMsg === 'REQUIRE_LOGIN' || errorMsg === 'ERROR_ACCESS_TOKEN'){
        alert("로그인이 필요하거나 세션이 만료되었습니다.");
        navigate({pathname: '/member/login', search: errorStr}, {replace: true});
        return;
    }

    // 2. 권한 없음
    if(errorMsg === 'ERROR_ACCESSDENIED'){
        alert("해당 메뉴에 대한 권한이 없습니다.");
        navigate({pathname: '/member/login', search: errorStr}, {replace: true});
        return;
    }
    
    // 그 외의 경우 처리 (로그로 남기기)
    console.error("처리되지 않은 예외 발생:", errorMsg);
      
    
  }
  return {loginState , isLogin , doLogin , doLogout , moveToPath , moveToLogin, moveToLoginReturn , exceptionHandle}

}

export default useCustomLogin
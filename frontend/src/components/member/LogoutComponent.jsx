import useCustomLogin from "../../hooks/useCustomLogin"

const LogoutComponent = () => {

  const {doLogout, moveToPath} = useCustomLogin()
  
  const handleClickLogout = () => {
    doLogout()

    const REST_API_KEY = "18923e5dc41ec198009923c66d126ee2"
    const LOGOUT_REDIRECT_URI = "http://localhost:3000/"

    const kakaoLogoutURL = `https://kauth.kakao.com/oauth/logout?client_id=${REST_API_KEY}&logout_redirect_uri=${LOGOUT_REDIRECT_URI}`

    alert("로그아웃 되었습니다")

    window.location.href = kakaoLogoutURL
    // moveToPath("/")
  }

  return(
    <div className="border-2 border-red-200 mt-10 m-2 p-4">
      <div className="flex justify-center">
        <div className="text-4xl m-4 p-4 font-extrabold text-red-500">LOGOUT COMPONENT</div>
      </div>

    <div className="flex justify-center">
      <div className="relative mb-4 flex w-full justify-center">
        <div className="w-2/5 p-6 flex justify-center font-bold">
          <button className="rounded p-4 w-36 bg-red-500 text-xl text-white"
          onClick={handleClickLogout}>LOGOUT</button>
        </div>
      </div>
    </div>

    </div>
  )
}

export default LogoutComponent;
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css' // CSS 파일이 있다면 포함 (없으면 이 줄은 지우세요)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode> // 개발 중 두 번 실행되는 게 싫다면 이 태그를 지우고 <App/>만 남기세요.
    <App />
  // </React.StrictMode>,
)

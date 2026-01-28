import { Suspense, lazy } from "react";
import todoRouter from "./todoRouter";
import { createBrowserRouter } from "react-router-dom";
import productsRouter from "./productsRouter";

const Loading = <div>로딩중입니다................</div>
const Main = lazy(() => import("../pages/MainPage"))
const About = lazy( () => import("../pages/AboutPage"))
const TodoIndex = lazy(  () => import("../pages/todo/IndexPage"))
const TodoList = lazy(() => import("../pages/todo/ListPage"))

const ProductsIndex = lazy(  () => import("../pages/products/IndexPage"))


const root = createBrowserRouter([
    {
        path:"",
        element:<Suspense fallback={Loading}><Main></Main></Suspense>
    },
    {
        path:"about",
        element:<Suspense fallback={Loading}><About></About></Suspense>
    },
    {
        path:"todo",
        element:<Suspense fallback={Loading}><TodoIndex></TodoIndex></Suspense>,
        children:todoRouter()
    },
    {
        path:"products",
        element:<Suspense fallback={Loading}><ProductsIndex></ProductsIndex></Suspense>,
        children:productsRouter()
    }

])

export default root;
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const Loading = <div>로딩중..............</div>
const TodoList = lazy(() => import("../pages/todo/ListPage"))
const TodoRead = lazy(  ()=> import("../pages/todo/ReadPage"))
const TodoAdd = lazy(  () => import("../pages/todo/AddPage"))

const todoRouter = () => {
    return[
        {
            path:"list",
            element:<Suspense fallback={Loading}><TodoList></TodoList></Suspense>
        },
        {
            path:"",
            element:<Navigate replace to="list"></Navigate>
        },
        {
            path: "read/:tno",
            element:<Suspense fallback={Loading}><TodoRead></TodoRead></Suspense>
        },
        {
            path:"add",
            element:<Suspense fallback={Loading}><TodoAdd></TodoAdd></Suspense>
        }
    ]
}

export default todoRouter;
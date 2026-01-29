import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productsRouter = () => {

  const Loading = <div>Loading...........</div>
  const ProductsList = lazy(  () => import("../pages/products/ListPage"))
  const ProductAdd = lazy(  () => import("../pages/products/AddPage"))
  const ProductRead = lazy(   () => import("../pages/products/ReadPage"))
  const ProductModify = lazy(  () => import("../pages/products/ModifyPage"))

  return[
    {
      path:"list",
      element:<Suspense fallback={Loading}><ProductsList></ProductsList></Suspense>
    },
    {
      path:"",
      element:<Navigate replace to="/products/list"></Navigate>
    },
    {
      path:"add",
      element:<Suspense fallback={Loading}><ProductAdd></ProductAdd></Suspense>
    },
    {
      path:"read/:pno",
      element:<Suspense fallback={Loading}><ProductRead></ProductRead></Suspense>
    },
    {
      path:"modify/:pno",
      element:<Suspense fallback={Loading}><ProductModify></ProductModify></Suspense>
    }
  ]
}

export default productsRouter;
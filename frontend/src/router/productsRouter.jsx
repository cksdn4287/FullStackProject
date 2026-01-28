import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productsRouter = () => {

  const Loading = <div>Loading...........</div>
  const ProductsList = lazy(  () => import("../pages/products/ListPage"))
  const ProductAdd = lazy(  () => import("../pages/products/AddPage"))

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
    }
  ]
}

export default productsRouter;
import { Suspense, lazy } from "react";
import { Navigate } from "react-router-dom";

const productsRouter = () => {

  const Loading = <div>Loading...........</div>
  const ProductsList = lazy(  () => import("../pages/products/ListPage"))

  return[
    {
      path:"list",
      element:<Suspense fallback={Loading}><ProductsList></ProductsList></Suspense>
    },
    {
      path:"",
      element:<Navigate replace tp="/products/list"></Navigate>
    }
  ]
}

export default productsRouter;
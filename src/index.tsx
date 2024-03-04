import {createRoot} from "react-dom/client";
import { createBrowserRouter, RouterProvider} from "react-router-dom";
import Shop from "@/pages/shop/Shop";
import { LazyShop } from "@/pages/shop/Shop.lazy";
import { LazyAbout} from "@/pages/about/About.lazy";
import About from "@/pages/about/About";
import { Suspense } from "react";
import { App } from "./components/App/App";
const root = document.getElementById('root')

if(!root) {
    throw new Error('root not found')
}

const container = createRoot(root)

const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
      children: [
        {
            path: '/about',
            element: <Suspense fallback={'Loading...'}><LazyAbout /></Suspense>
        },
        {
            path: '/shop',  
            element: <Suspense fallback={'Loading...'}><LazyShop /></Suspense>
        },
      ]
    },
  ]);

container.render(<RouterProvider router={router} />)
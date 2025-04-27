import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import ReactDOM from "react-dom/client"
import App from './App.jsx'
import { Route,RouterProvider,createRoutesFromElements } from 'react-router'
import { createBrowserRouter } from 'react-router'
import { Provider } from 'react-redux'
import store from "./redux/store.js"
import "./index.css"
import Log_in from './pages/Auth/Login.jsx'
import Register from './pages/Auth/Register.jsx'
import AdminRoutes from './pages/Admin/AdminRoutes.jsx'

import Privetroute from './components/Privetroute.jsx'
import Profile from './pages/User/Profile.jsx'
import Userlist from './pages/Admin/Userlist.jsx'
import CategoryList from './pages/Admin/CategoryList.jsx'
import ProductList from './pages/Admin/ProductList.jsx'
import Productupdate from './pages/Admin/Productupdate.jsx'
import Allproduct from './pages/Admin/Allproduct.jsx'
import Home from './pages/Home.jsx'
import Favorites from './pages/Products/Favorites.jsx'
import ProductDetails from './pages/Products/ProductDetails.jsx'
import Cart from './pages/Cart.jsx'
import Shop from './pages/Shop.jsx'


const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<App />} >
        <Route path="/login" element={<Log_in />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/favorite" element={<Favorites />} />
        <Route path="/product/:id" element={<ProductDetails/>} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/shop" element={<Shop />}/>
        <Route index={true} path="/" element={<Home />} />

        <Route path='' element={<Privetroute />}>
          <Route path='/profile' element={<Profile />} />
        </Route>

        <Route path="/admin" element={<AdminRoutes/>} >
          <Route path="userlist" element={<Userlist />}/>
          <Route path="categorylist" element={<CategoryList/>}/>
          <Route path="productlist" element={<ProductList/>}/>
          <Route path="allproduct" element={<Allproduct />}/>
          <Route path="product/update/:_id" element={<Productupdate />} />
        </Route>
        
      </Route>
    
    </>
  )
);
createRoot(document.getElementById('root')).render(
  <Provider store={store}>
  <RouterProvider router={router}/>
  </Provider>
)

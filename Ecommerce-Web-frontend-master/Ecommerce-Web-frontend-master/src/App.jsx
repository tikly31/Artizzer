import {Routes , Route} from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/About'
import Contact from './pages/Contact'
import Policy from './pages/Policy'
import PagenotFound from './pages/PagenotFound'
import Register from './pages/Auth/Register'
import Login from './pages/Auth/Login'
import Dashboard from './pages/user/Dashboard'
import PrivateRoute from './components/Routes/PrivateRoute'
import ForgotPassword from './pages/Auth/ForgotPassword'
import AdminRoute from './components/Routes/AdminRoute'
import AdminDashboard from './pages/Admin/AdminDashboard'
import CreateCategory from './pages/Admin/CreateCategory'
import CreateProduct from './pages/Admin/CreateProduct'
import Users from './pages/Admin/Users'
import Profile from './pages/user/Profile'
import Orders from './pages/user/Orders'
import ProductsList from './pages/Admin/ProductsList'
import UpdateProducts from './pages/Admin/UpdateProducts'
import SearchPage from './pages/SearchPage'
import ProductDetails from './pages/ProductDetails'
import Categories from './pages/Categories'
import CategoryProducts from './pages/CategoryProducts'
import CartPage from './pages/CartPage'
import AdminOrders from './pages/Admin/AdminOrders'



function App() {

  return (
    <>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/about" element={<About/>} />
      <Route path="/contact" element={<Contact/>} />
      <Route path="/policy" element={<Policy/>} />
      <Route path="/*" element={<PagenotFound/>} />
      <Route path="/register" element={<Register/>} />
      <Route path="/login" element={<Login/>} />

      <Route path='/search' element={<SearchPage/>}/>
      <Route path='/product/:slug' element={<ProductDetails/>}/>
      <Route path='/categories' element={<Categories/>}/>
      <Route path='/category/:slug' element={<CategoryProducts/>}/>

      <Route path='/cart' element={<CartPage/>}/>

      <Route path='/dashboard' element={<PrivateRoute/>}>
        <Route path="user" element={<Dashboard/>} />
        <Route path="user/profile" element={<Profile/>} />
        <Route path="user/orders" element={<Orders/>} />
      </Route>

      <Route path='/dashboard' element={<AdminRoute/>}>
        <Route path="admin" element={<AdminDashboard/>} />
        <Route path="admin/create-category" element={<CreateCategory/>} />
        <Route path="admin/create-product" element={<CreateProduct/>} />
        <Route path="admin/product/:slug" element={<UpdateProducts/>} />
        <Route path="admin/users" element={<Users/>} />
        <Route path="admin/products" element={<ProductsList/>} />
        <Route path="admin/orders" element={<AdminOrders/>} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword/>} />
    </Routes>
    </>
  )
}

export default App


import './App.css';
import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import HomePage from './pages/homePage';
import 'bootstrap/dist/css/bootstrap.min.css';
import Register from './components/register';
import Login from './components/login';
import HotelPage from './pages/hotelPage';
import Wishlist from './pages/wishlist';
import Payment from './pages/paymentPage';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element : <HomePage/>
    },
    {
      path: "/room/:propertyId",
      element : <HotelPage/>
    },
    {
      path: "/login",
      element : <Login/>
    },
    {
      path: "/register",
      element : <Register/>
    },
    {
      path: "/wishlist",
      element : <Wishlist/>
    },{
      path : "/payment",
      element : <Payment/>
    }
 
  ])
  
  return (
    <div className="App">
         <RouterProvider router={router}/>
    </div>
  );
}

export default App;

import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes, BrowserRouter as Router,useNavigate, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'
import AddCar from './pages/AddCar'
import Cars from './pages/Cars'
import CarDetail from './pages/CarDetail'
import MyBookings from './pages/MyBookings'
import Payment from './components/Payment'
import OnlinePayment from './components/OnlinePayment'
import DashBoardLayout from './components/DashBoardLayout'
import Dashboard from './pages/DashBoard'

function App() {

 const[user,setUser] = useState(null);
 const [userType,setUserType] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUserType(JSON.parse(storedUser));
    }
  }, []);

 useEffect(()=> {
  const checkAuthStatus = async () => {
    try {
        const response = await fetch(`${import.meta.env.VITE_GENERAL_API}/api/status`, {
            method: 'GET',
            credentials: 'include'
        });
        const data = await response.json();
        setIsLoggedIn(data.isLoggedIn);
        setUser(data.user);       //This is for user information if we want user specific info like name
    } catch (error) {
        console.error("Error checking auth status:", error);
    }
  }
    checkAuthStatus();
 },[])

  return (
    <>
    <Router>
      <NavBar isLoggedIn= {isLoggedIn} setIsLoggedIn={setIsLoggedIn} userType={userType} setUserType={setUserType}></NavBar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home userType={userType}></Home>} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
        <Route path="/add-car" element={<AddCar />} />
        <Route path="/cars" element={<Cars />} />
        <Route path="/car-details/:id" element={<CarDetail isLoggedIn={isLoggedIn} userType={userType} />} />
        <Route path="/my-bookings" element={<MyBookings />} />
        <Route path="/payment" element={<Payment />} />
        <Route path="/onlinePayment" element={<OnlinePayment />} />
        <Route path="/dashboard" element={<DashBoardLayout />}>
          <Route index element={<Navigate to="/dashboard/dashboard" />} />
            <Route path="cars" element={<Cars />} />
            <Route path="my-bookings" element={<MyBookings />} />
            <Route path="dashboard" element={<Dashboard />} />
        </Route>
      </Routes>
    </Router>
    </>
  )
}

export default App

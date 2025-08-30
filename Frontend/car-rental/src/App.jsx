import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import { ToastContainer } from 'react-toastify'
import { useEffect } from 'react'

function App() {

 const[user,setUser] = useState(null);
 const [isLoggedIn, setIsLoggedIn] = useState(false);

 useEffect(()=> {
  const checkAuthStatus = async () => {
    try {
        const response = await fetch(`http://localhost:3001/api/status`, {
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
      <NavBar isLoggedIn= {isLoggedIn} setIsLoggedIn={setIsLoggedIn}></NavBar>
      <ToastContainer></ToastContainer>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Signup />} />
      </Routes>
    </Router>
    </>
  )
}

export default App

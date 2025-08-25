import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import NavBar from './components/NavBar'
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom'

function App() {

  return (
    <>
    <Router>
      <NavBar />
      <Routes>
      </Routes>
    </Router>
    </>
  )
}

export default App

import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import { useState } from 'react'

function App() {
  const [City,setCity]=useState("")
  const API_KEY ="a963b279e885490aa47172452251804"
  return (
    <>
    <Navbar City={City} setCity={setCity} API_KEY={API_KEY}/>
    <Routes>
      <Route path='*' element={<Home city={City} setcity={setCity} API_KEY={API_KEY}/>} />
    </Routes>
    </>
  )
}

export default App

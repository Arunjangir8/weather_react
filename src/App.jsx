import './App.css'
import { Route, Routes } from 'react-router-dom'
import Navbar from './pages/Navbar'
import Home from './pages/Home'
import { useState } from 'react'
import About from './pages/About'
import Contact from './pages/Contact'
import Footer from './pages/Footer'

function App() {

  const [City,setCity]=useState("")
  const API_KEY ="a963b279e885490aa47172452251804"

  return (
    <>
    <Navbar City={City} setCity={setCity} API_KEY={API_KEY}/>
    <Routes>
      <Route path='*' element={<Home city={City} setcity={setCity} API_KEY={API_KEY}/>} />
      <Route path="/about" element={<About/>}/>
      <Route path="/contact" element={<Contact/>}/>
      <Route/>
    </Routes>
    <Footer/>
    </>
  )
}

export default App

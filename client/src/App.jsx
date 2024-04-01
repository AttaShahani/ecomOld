import React, { Suspense, lazy, useEffect } from 'react'
import {BrowserRouter as Router, Routes, Route} from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import "./styles/App.scss"
const Home = lazy(()=> import('./pages/Home'));
const About = lazy(()=> import('./pages/About'));
const Cart = lazy(()=> import('./pages/Cart'));
const Contact = lazy(()=> import('./pages/Contact'));
const Profile = lazy(()=> import('./pages/Profile'));
const Products = lazy(()=> import('./pages/Products'));
const Search = lazy(()=> import('./pages/Search'));
import WebFont from "webfontloader"
import Loader from './components/Loader'

const App = () => {
  useEffect(() => {
    WebFont.load({
      google:{
        families:["Roboto","Droid Sans","Chilanka"]
      }
    })
  }, [])
  
  return (

    <Router>
    <Header />
    <Suspense fallback={<Loader/>}>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/about' element={<About/>}/>
        <Route path='/contact' element={<Contact/>}/>
        <Route path='/Cart' element={<Cart/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/Products' element={<Products/>}/>
        <Route path='/Search' element={<Search/>}/>
      </Routes>
    </Suspense>
    <Footer />
    </Router>
  )
}

export default App
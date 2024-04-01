import React, { useState } from 'react'
import {Link} from "react-router-dom"
import logo from "../assets/images/logo.png"
import { FaSearch, FaUser } from "react-icons/fa";
import { LuShoppingBag } from "react-icons/lu";
const Header = () => {
  const [showMenu, setshowMenu] = useState(false)
  const menuToggler = ()=>{
    setshowMenu(!showMenu)
  }
  return (
    <>
  <div className="burger" onClick={menuToggler}>
    <div className="line"></div>
    <div className="line"></div>
    <div className="line"></div>
  </div>
    <header className={`header ${showMenu?"show":""}`}>
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <nav className="nav">
        <ul className="navItems">
          <li className="navItem"><Link to={"/"}>Home</Link></li>
          <li className="navItem"><Link to={"/products"}>Products</Link></li>
          <li className="navItem"><Link to={"/contact"}>Contact</Link></li>
          <li className="navItem"><Link to={"/about"}>About</Link></li>
        </ul>
        <ul className="navIcons">
          <li className="navIcon"> <Link to={"/search"}> <FaSearch /> </Link> </li>
          <li className="navIcon"> <Link to={"/cart"}> <LuShoppingBag /> </Link> </li>
          <li className="navIcon"> <Link to={"/profile"}> <FaUser /> </Link> </li>
        </ul>
      </nav>
      
    </header>
    </>
  )
}

export default Header
import React from 'react';
import { FaSearch, FaShoppingBag, FaUser } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { GiHamburgerMenu } from "react-icons/gi";
const Header = () => {
  return (
    <>
    <div className="hamburger"><GiHamburgerMenu/></div>
    <header className='header show'>
    <div className="logo"><Link to={"/"}> <img src="src/images/logo.png" alt="Logo" /> </Link></div>
    <nav className="nav">
        <ul className="navItems">
            <li className="navItem"> <Link to={"/"}>Home</Link></li>
            <li className="navItem"> <Link to={"/products"}>Products</Link></li>
            <li className="navItem"> <Link to={"/about"}>About</Link></li>
            <li className="navItem"> <Link to={"/contact"}>Contact</Link></li>
        </ul>
        <ul className="navIcons">
            <li className="navItem"> <Link to={"/search"}><FaSearch/></Link></li>
            <li className="navItem"> <Link to={"/profile"}><FaUser /></Link></li>
            <li className="navItem"> <Link to={"/cart"}><FaShoppingBag/></Link></li>

        </ul>
    </nav>

    </header>
    </>
  )
}

export default Header
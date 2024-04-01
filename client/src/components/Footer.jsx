import React from 'react'
import playStore from "../assets/images/playstore.png";
import appStore from "../assets/images/Appstore.png";
import {Link} from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <div className="leftFooter">
        <h2>Download Our App</h2>
        <h2>Download App For Android and IOS Platforms</h2>
        <div className="images">
          <img src={playStore} alt="Playstore" />
          <img src={appStore} alt="Appstore" />
        </div>
      </div>
      <div className="midFooter">
        <h1>ECOMMERCE.</h1>
        <div className="paras">
          <p>High Quality Is Our First Priority</p>
          <p>copyright &copy; {new Date().getFullYear()}, AttaShahani</p>
        </div>
      </div>
      <div className="rightFooter">
        <h2>Follow Us</h2>
        <ul className="footerLinks">
          <li><Link to={"instagram.com"}>Instagram</Link></li>
          <li><Link to={"youtube.com"}>Youtube</Link></li>
          <li><Link to={"facebook.com"}>Facebook</Link></li>
          <li><Link to={"twitter.com"}>X (Twitter)</Link></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer
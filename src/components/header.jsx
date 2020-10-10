import React from "react"
import  { Link } from "gatsby"
import headerStyles from "./header.module.css"
import instagramSVG from "../images/instagram.svg"
import linkedinSVG from "../images/linkedin (1).svg"
import "typeface-merienda"
import "typeface-montserrat"
import "typeface-rock-salt"
import "typeface-roboto"
import "typeface-open-sans"
import "typeface-raleway"
import "typeface-bungee-shade"
import "typeface-bangers"

export default function Header() {
  return <div className={headerStyles.headerContainer}>
    <div className={headerStyles.logoText} >
      <Link to="/">have so sunny day 🎗️</Link>
    </div>
    <div className={headerStyles.navContainer}>
      <Link to="/portfolio/" className={headerStyles.navText}>portfolio</Link>
      <Link to="/blog/" className={headerStyles.navText}>blog</Link>
      <Link to="/vitae/" className={headerStyles.navText}>vitae</Link>
      <div className={headerStyles.socialContainer}>
          <a target="_blank" rel="noreferrer" href={"https://www.instagram.com/sosunnyproject"}  ><img src={instagramSVG} alt="instagram" width="20px" height="auto"/></a>
          <a target="_blank" rel="noreferrer" href={"https://www.linkedin.com/in/sosunpark"}  ><img src={linkedinSVG} alt="linkedin" width="20px" height="auto"/></a>
      </div>
    </div>
  </div>
}
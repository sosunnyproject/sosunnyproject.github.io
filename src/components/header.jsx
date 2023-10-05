import React, { useEffect, useState } from "react"
import  { Link } from "gatsby"
import * as headerStyles from "./header.module.css"
import instagramSVG from "../images/instagram.svg"
import linkedinSVG from "../images/linkedin (1).svg"
import githubSVG from "../images/github-pixel-perfect.svg"
import youtubeSVG from "../images/youtube-pixel-perfect.svg"

export default function Header({location}) {

  function isActive( {location}, str ) {
    let isCurrent = false;
    if(location.pathname.includes(str)){
      console.log(str);
      isCurrent = true;
    }
      return isCurrent ? {className: headerStyles.active} : null
  }

  return <div className={headerStyles.headerContainer}>
    <div className={headerStyles.logoText} >
      <Link to="/">have so sunny day</Link>
    </div>
    <div className={headerStyles.navContainer}>
      <Link to="/portfolio" getProps={({location}) => isActive({location},'portfolio')} className={headerStyles.navText}>portfolio</Link>
      <Link to="/vitae" getProps={({location}) => isActive({location},'vitae')} className={headerStyles.navText}>vitae</Link>
      <div className={headerStyles.socialContainer}>
          <a target="_blank" rel="noreferrer" href={"https://www.instagram.com/sosunnyproject"}  ><img src={instagramSVG} alt="instagram" width="20px" height="auto"/></a>
          <a target="_blank" rel="noreferrer" href={"https://www.youtube.com/channel/UCKNXAqIvqc25JJ1CWdayqBA"}  ><img src={youtubeSVG} alt="youtube" width="20px" height="auto"/></a>
          <a target="_blank" rel="noreferrer" href={"https://www.github.com/sosunnyproject"}  ><img src={githubSVG} alt="github" width="20px" height="auto"/></a>
          <a target="_blank" rel="noreferrer" href={"https://www.linkedin.com/in/sosunpark"}  ><img src={linkedinSVG} alt="linkedin" width="20px" height="auto"/></a>
      </div>
    </div>
  </div>
}
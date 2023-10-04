import React, { useEffect, useState } from "react"
import  { Link } from "gatsby"
import Header from "../components/header"
import Container from "../components/container"
import * as containerStyles from "../components/container.module.css"
import instagramSVG from "../images/instagram.svg"
import linkedinSVG from "../images/linkedin (1).svg"
import githubSVG from "../images/github-pixel-perfect.svg"
import youtubeSVG from "../images/youtube-pixel-perfect.svg"

export default function Portfolio({ data }) {

  function isActive( {isCurrent} ) {
      return isCurrent ? {className: containerStyles.pf_subheader_selected} : null
  }

  return (
    <div className={containerStyles.pf_subheader_wrapper}>
      <Link to="/portfolio/games" getProps={isActive} className={containerStyles.pf_subheader_btn}>GAMES</Link>
      <Link to="/portfolio/graphics" getProps={isActive} className={containerStyles.pf_subheader_btn}>GRAPHICS</Link>
      <Link to="/portfolio/web" getProps={isActive} className={containerStyles.pf_subheader_btn}>WEB / APP</Link>
      <Link to="/portfolio/xr" getProps={isActive} className={containerStyles.pf_subheader_btn}>XR</Link>
      <Link to="/portfolio/edu" getProps={isActive} className={containerStyles.pf_subheader_btn}>EDUCATION</Link>

    </div>
  )
  
}
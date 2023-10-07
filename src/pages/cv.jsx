import React, { useEffect, useRef } from "react"
import Header from "../components/header"
// import Container from "../components/container"
import * as vitaeStyles from "../components/vitae.module.css"
import '../styles/global.css';
import Container from "../components/container";

export default function CV() {

  return (
    <Container>
    <Header />
    
    <div className={vitaeStyles.vitaeContainer}>
      <p>
        <a target="_blank" href="https://www.linkedin.com/in/sosunpark/">
          linkedin
        </a>
      </p>
      <p>
        <a target="_blank" href="https://drive.google.com/file/d/1eG5f-KtB9SjBxywNHLDTThVwdMczwjvG/view">
          Resume (1 page)
        </a>
      </p>
      <p>
        <a href="https://docs.google.com/document/d/1PVqbH6huZiy4b9-AkDRo7rRD5BWEOV7F_H4uvHs-gIE/edit">
          please click here for the original document
        </a>
      </p>
      {/* other component content */}
      <div className={vitaeStyles.googleDocWrapper}>
        <iframe
          src="https://docs.google.com/document/d/e/2PACX-1vQYcyKhMS04uJtowbEjud8dp1W7c1uNxdHNtdom7tXvGWEkh41oUGMPOauyw262MAYLGV9UqtbadaYt/pub?embedded=true" 
          width="100%" 
          height="100%"
          frameBorder="0">
          Loading...
        </iframe>
      </div>
    </div>
    </Container>

  )
}
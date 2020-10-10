import React from "react"
import containerStyles from "./container.module.css"
import "typeface-merienda"
import "typeface-montserrat"
import "typeface-open-sans"
import "typeface-quicksand"
import "typeface-roboto"
import "typeface-rock-salt"

export default function Container({ children }) {
    return <div className={containerStyles.container}>{children}</div>
  }
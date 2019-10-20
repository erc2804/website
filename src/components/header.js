import React, { Component } from "react"
import headerStyles from "../styles/header.module.scss"

class Header extends Component {
  render() {
    return (
      <header className={[headerStyles.headerContainer, "bg-blue-dark"].join(" ")}>
        Header
      </header>
    )
  }
}

export default Header

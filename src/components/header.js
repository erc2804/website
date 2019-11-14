import React, { Component } from "react"
import { Link } from "gatsby"
// --- styles
import "../styles/globals.scss"
import headerStyles from "../styles/header.module.scss"
// --- images
import logoImg from "../images/logo.svg"
class Header extends Component {
  render() {
    const navbarElements = [
      {
        label: "Portfolio",
        path: "/portfolio",
      },
      {
        label: "Blog",
        path: "/blog",
      },
      {
        label: "Travel",
        path: "/travel",
      },
      {
        label: "About Me",
        path: "/about-me",
      },
      {
        label: "Dev Tools",
        path: "/dev-tools",
      },
    ]
    return (
      <header className={headerStyles.headerWrapper}>
        <div className={headerStyles.headerContainer}>
          <Link className={headerStyles.logoContainer} to="/">
            <img src={logoImg} alt="logo" />
          </Link>
          <div className={headerStyles.navWrapper}>
            {navbarElements.map((navElem, i) => (
              <Link
                className={headerStyles.navElement}
                activeClassName={headerStyles.navActive}
                key={i}
                to={navElem.path}
              >
                {navElem.label}
              </Link>
            ))}
          </div>
        </div>
      </header>
    )
  }
}

export default Header

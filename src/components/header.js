import React, { Component } from "react"
import { Link } from "gatsby"
// --- styles
import "../styles/globals.scss"
import headerStyles from "../styles/header.module.scss"
// --- images
import logoImg from "../images/logo.svg"
class Header extends Component {
  constructor() {
    super()
    this.state = {
      orientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
      navMenuOpen: false
    }
    this.toggleNavMenu = this.toggleNavMenu.bind(this);
  }

  componentDidMount() {
    this.onResize();
    window.addEventListener("resize", this.onResize.bind(this));
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.onResize.bind(this));
  }

  toggleNavMenu() {
    this.setState({
      navMenuOpen: !this.state.navMenuOpen
    });
  }

  onResize() {
    this.setState({
      orientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
      navMenuOpen: false
    });
  }

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
      <header className={`${headerStyles.headerWrapper} default-padding ${window.pageYOffset > 0 ? headerStyles.showShdw : ''}`}>
        <div className={headerStyles.headerContainer}>
          <Link className={headerStyles.logoContainer} to="/">
            <img src={logoImg} alt="logo" />
          </Link>
          <div className={`${headerStyles.navWrapper} ${this.state.orientation === "portrait" ? 'deepHide' : ''}`}>
            {navbarElements.map((navElem, i) => (
              <Link
                className={`${headerStyles.navElement} font-body-1`}
                activeClassName={headerStyles.navActive}
                key={i}
                to={navElem.path}
              >
                {navElem.label}
              </Link>
            ))}
          </div>
          <div className={`${headerStyles.burgerMenuContainer} ${this.state.orientation === "portrait" ? '' : 'deepHide'}`} onClick={this.toggleNavMenu}>
            <div className={this.state.navMenuOpen ? headerStyles.animate : ''}></div>
            <div className={this.state.navMenuOpen ? headerStyles.animate : ''}></div>
            <div className={this.state.navMenuOpen ? headerStyles.animate : ''}></div>
          </div>
        </div>
        <div className={`${headerStyles.navMenu} ${this.state.navMenuOpen ? '' : 'deepHide'}`}></div>
      </header>
    )
  }
}

export default Header

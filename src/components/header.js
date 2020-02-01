import React, { Component } from "react"
import { Link } from "gatsby"
// --- styles
import "../styles/globals.scss"
import headerStyles from "../styles/header.module.scss"
class Header extends Component {
  constructor(props) {
    super(props)
    this.state = {
      orientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
      navMenuOpen: false,
      wndw: {
        w: window.innerWidth,
        h: window.innerHeight
      }
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
      navMenuOpen: false,
      wndw: {
        w: window.innerWidth,
        h: window.innerHeight
      }
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
      <header
        className={`${headerStyles.headerWrapper} ${
          this.props.mode === "dark" ? headerStyles.darkHeader : ""
        } ${window.pageYOffset > 0 ? headerStyles.showShdw : ""} background-color-flatwhite`}
      >
        <div className={headerStyles.headerContainer}>
          <Link className={headerStyles.logoContainer} to="/">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            data-name="2_logo"
            viewBox="0 0 806.444 801"
          >
            <path
              fill="#fff"
              stroke="#3ddc97"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="76.843"
              d="M55.039 400L217.039 400"
            ></path>
            <path
              fill="#fff"
              stroke="#3ddc97"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="75.078"
              d="M237.039 571l-198-170.106zm-199.5-171.394l198-170.106z"
            ></path>
            <path
              fill="#fff"
              stroke="#46237a"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="81"
              d="M474.539 40.5L330.539 760.5"
            ></path>
            <path
              fill="#fff"
              stroke="#3ddc97"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="75.078"
              d="M569.405 229.115l198 170.105zm199.5 171.394l-198 170.106z"
            ></path>
          </svg>
          </Link>
          <div
            className={`${headerStyles.navWrapper} ${
              this.state.wndw.w < 700 ? "deepHide" : ""
            }`}
          >
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
          <div
            className={`${headerStyles.burgerMenuContainer} ${
              this.state.wndw.w < 700 ? "" : "deepHide"
            }`}
            onClick={this.toggleNavMenu}
          >
            <div
              className={this.state.navMenuOpen ? headerStyles.animate : ""}
            ></div>
            <div
              className={this.state.navMenuOpen ? headerStyles.animate : ""}
            ></div>
            <div
              className={this.state.navMenuOpen ? headerStyles.animate : ""}
            ></div>
          </div>
        </div>
        <div
          className={`${headerStyles.navMenu} ${
            this.state.navMenuOpen ? "" : "deepHide"
          }`}
        ></div>
      </header>
    )
  }
}

export default Header

import React, { Component } from "react"
import { Link } from "gatsby"
import Lottie from "react-lottie"
import logoTextImg from "../images/logo-text.svg"
import animationData from '../images/logo-animation.json'
import logoWhite from "../images/logo-white.png"
import headerStyles from "../styles/header.module.scss"
import MenuIcon from "@material-ui/icons/Menu"
import CloseIcon from "@material-ui/icons/Close"

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      prevScrollpos: 0,
      shrinked: false,
      sidemenuVisible: false,
      fgLottieStopped: false,
      bgLottiePaused: false
    };

    this.setSidemenu = this.setSidemenu.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
    window.addEventListener("resize", this.handleResize);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", this.handleResize);
  }

  handleScroll = () => {
    const { prevScrollpos } = this.state;

    const currentScrollPos = window.pageYOffset;
    const shrinked = prevScrollpos < currentScrollPos;

    this.setState({
      prevScrollpos: currentScrollPos,
      shrinked: shrinked
    });
  };

  handleResize = () => {
    this.setSidemenu(false);
  };

  setSidemenu(open) {
    this.setState({
      sidemenuVisible: open
    });
  }

  render() {
    const lottieOptions = {
      loop: false,
      autoplay: false, 
      animationData: animationData
    },
    navbarElements = [{
      label: "Plattform",
      target: "/platform"
    }, {
      label: "Referenzen",
      target: "/references"
    }, {
      label: "Über uns",
      target: "/about-us"
    }, {
      label: "Karriere",
      target: "/career"
    }];

    return (
      <div className={headerStyles.headerWrapper}>
        <header className={[headerStyles.header, "default-padding", this.state.shrinked ? headerStyles.shrinked : "" ].join(" ")}>
          <Link className={headerStyles.logoContainer} to="/" onMouseEnter={() => { this.setState({fgLottieStopped: false});}}>
            <img src={logoTextImg} alt="LOGO Text" className={headerStyles.logoText} />
            <Lottie 
              options={lottieOptions}
              isPaused={this.state.bgLottiePaused}
              width={30} 
              height={30}
              eventListeners={
                [
                  {
                    eventName: 'complete',
                    callback: () => { this.setState({ bgLottiePaused: true }); },
                  },
                ]
              }
            />
            <Lottie 
              options={lottieOptions} 
              isStopped={this.state.fgLottieStopped}
              width={30} 
              height={30}
              style={{
                visibility: (this.state.fgLottieStopped ? "hidden" : "visible")
              }}
              eventListeners={
                [
                  {
                    eventName: 'complete',
                    callback: () => { this.setState({ fgLottieStopped: true }); },
                  },
                ]
              }
            />
          </Link>
          <div className={headerStyles.navContainer}>
            {navbarElements.map((navElem, i) => (
              <Link className="font-desktop-nav-text" activeClassName="font-active" key={i} to={navElem.target}>
                {navElem.label}
              </Link>
            ))}
          </div>
          <div className={headerStyles.langContainer}>
            <span className="font-desktop-nav-text font-active">
              DE
            </span>
            <span className={headerStyles.separator}>&#124;</span>
            <span className="font-desktop-nav-text">
              EN
            </span>
          </div>
          <button className={[headerStyles.menuButton, "noDefButtonStyles"].join(" ")} onClick={() => { this.setSidemenu(true); }}>
            <MenuIcon></MenuIcon>
          </button>
        </header>
        <div className={[headerStyles.sidemenuContainer, "default-padding"].join(" ")} style={{
          visibility: this.state.sidemenuVisible ? "visible" : "hidden",
          opacity: this.state.sidemenuVisible ? 1 : 0
        }}>
          <div className={[headerStyles.headArea, this.state.shrinked ? headerStyles.shrinked : ""].join(" ")}>
            <Link className={headerStyles.logoContainer} to="/">
              <img src={logoWhite} alt="LOGO" />
            </Link>
            <button className={[headerStyles.sidemenuCloseButton, "noDefButtonStyles"].join(" ")} onClick={() => { this.setSidemenu(false); }}>
              <CloseIcon></CloseIcon>
            </button>
          </div>
        <div className={headerStyles.navContainer}>
            {navbarElements.map((navElem, i) => (
              <Link className="font-desktop-nav-text" key={i} to={navElem.target}>
                {navElem.label}
              </Link>
            ))}

            <div className={headerStyles.langContainer}>
              <span className="font-desktop-nav-text font-active" href="#">
                DE
              </span>
              <span className={headerStyles.separator}>&#124;</span>
              <span className="font-desktop-nav-text" href="#">
                EN
              </span>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default Header

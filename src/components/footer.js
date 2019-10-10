import React, { Component } from "react"
import { Link } from "gatsby"
import footerStyles from "../styles/footer.module.scss"

class Footer extends Component {
  render() {
    const navbarElements = [
      {
        label: "Startseite",
        target: "/"
      }, {
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
      }, {
        label: "Impressum",
        target: "/"
      }, {
        label: "Datenschutz",
        target: "/"
      }
    ];
    return (
      <footer className={[footerStyles.footer, "default-padding"].join(" ")}>
        <div className= {footerStyles.infoWrapper}>
          <div className={footerStyles.jobInfoWrapper}>
            <span className="font-desktop-footer-header">Du suchst eine spannende Herausforderung?</span>
            <Link className="font-desktop-footer-header" to="/career">Jetzt Bewerben</Link>
          </div>
          <div className={footerStyles.siteInfoWrapper}>
            <ul>
              <li className="font-desktop-footer-title">Menu</li>
              {navbarElements.map((navElem, i) => 
                <li key={i}>
                  <Link className="font-desktop-footer-text" key={i} to={navElem.target}>
                    {navElem.label}
                  </Link>
                </li>
              )}
            </ul>
            <ul className="font-desktop-footer-text">
              <li className="font-desktop-footer-title">Office</li>
              <li>Parcusstraße 8</li>
              <li>55116 Mainz, Deutschland</li>
              <li>Telefon +49 (6131) 62483 50</li>
              <li>info@infraview.net</li>
            </ul>
          </div>
        </div>
        <div className={footerStyles.captionWrapper}>
          <div className={footerStyles.logoContainer}>
            <div className={[footerStyles.logowhiteImg, "fullbackground"].join(" ")}></div>
          </div>
          <div className={footerStyles.captionContainer}>
            <span className="font-desktop-footer-caption">Ein Unternehmen der</span>
            <div className={footerStyles.dbeclogoImg}></div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer

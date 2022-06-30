import React, { Component } from "react"
import Layout from "../components/layout"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// --- fontawesome icons
import { fab } from '@fortawesome/free-brands-svg-icons'
// --- portfolio thumbnails (as img)
import ivImg from '../images/portfolio/infraview_screenshot.png'
import nwImg from '../images/portfolio/nextstepweb_screenshot.png'
import jonaImg from '../images/portfolio/jona_screenshot.png'
import melImg from '../images/portfolio/mel_screenshot.png'
import cvImg from '../images/portfolio/casualvocab_screenshot.png'
// --- styles
import "../styles/globals.scss"
import portfolioStyles from "../styles/portfolio.module.scss"

library.add(fab);

class PortfolioPage extends Component {
  render() {
    const portalBoxes= [{
      label: "my fiddles",
      url: "https://jsfiddle.net/user/erc2804/",
      thumbnail: {
        type: "icon",
        src: "fab,jsfiddle",
        alignment: "vertical"
      },
      theme: "dark1"
    }, {
      label: "my codepens",
      url: "https://codepen.io/erc2804",
      thumbnail: {
        type: "icon",
        src: "fab,codepen",
        alignment: "vertical"
      },
      theme: "dark1"
    }, {
      label: "my lottiefiles",
      url: "https://lottiefiles.com/erc2804",
      thumbnail: {
        type: "icon",
        src: "fab,airbnb",
        alignment: "vertical"
      },
      theme: "dark1"
    }];
    const portfolioBoxes = [{
      label: "CasualVocab, iOS app",
      url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
      thumbnail: {
        type: "image",
        src: cvImg,
        alignment: "vertical"
      },
      theme: "dark2"
    }, {
      label: "Website, nextstepweb",
      url: "https://www.nextstepweb.de",
      thumbnail: {
        type: "image",
        src: nwImg,
        alignment: "vertical"
      },
      theme: "light1"
    }, {
      label: "Website, infraView",
      url: "https://www.infraview.net",
      thumbnail: {
        type: "image",
        src: ivImg,
        alignment: "vertical"
      },
      theme: "lightest"
    }, {
      label: "Jobnavigator, Siemens",
      url: "https://jona.cut-e.com/jona/",
      thumbnail: {
        type: "image",
        src: jonaImg,
        alignment: "vertical"
      },
      theme: "light2"
    }, 
    {
      label: "custom mobile menu, tech demo",
      url: "https://ercancicek.com/mel-menu.html",
      thumbnail: {
        type: "image",
        src: melImg,
        alignment: "vertical"
      },
      theme: "dark2"
    }, 
    {
      label: "digitChallenge, Procter & Gamble",
      url: "https://google.de",
      thumbnail: {
        type: "image",
        src: melImg,
        alignment: "vertical"
      },
      theme: "dark2",
      customClass: "hidden-box"
    }
  ];

    return (
      <Layout 
        title="Portfolio"
        descriptionEn="The portfolio page of Ercan Cicek comprises my most important frontend web projects of the last years."
        descriptionDe="Die Portfolio Seite von Ercan Cicek umfasst meine wichtigsten Frontend Webprojekte der letzten Jahre."
      >
        <div className={`${portfolioStyles.portfolioPageWrapper} default-padding`}>
          <div className={`${portfolioStyles.headerTextContainer} font-header-4`}>
            Portfolio
          </div>
          <div className={portfolioStyles.portalBoxesWrapper}>
            {portalBoxes.map((portalBox, i) => (
              <a 
                href={portalBox.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${portfolioStyles.box} background-color-${portalBox.theme} ${portalBox.customClass || ''}`} 
                key={i}
              >
                {portalBox.thumbnail.type === "icon" ? (
                  <FontAwesomeIcon 
                    icon={portalBox.thumbnail.src.split(",")} 
                    className={portalBox.thumbnail.alignment === "horizontal" ? "horizIconAlign" : "vertiIconAlign"} 
                  />
                ) : (
                  <img 
                    src={portalBox.thumbnail.src} 
                    alt="" 
                    className={portalBox.thumbnail.alignment === "horizontal" ? "horizImgAlign" : "vertiImgAlign"} 
                  />
                )}
                <span className={`${portalBox.boxLabel} font-subheading-1`}>{portalBox.label}</span>
              </a>
            ))}
          </div>
          <div className={portfolioStyles.boxesWrapper}>
            {portfolioBoxes.map((portfolioBox, i) => (
              <a 
                href={portfolioBox.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${portfolioStyles.box} background-color-${portfolioBox.theme} ${portfolioBox.customClass || ''}`} 
                key={i}
              >
                {portfolioBox.thumbnail.type === "icon" ? (
                  <FontAwesomeIcon 
                    icon={portfolioBox.thumbnail.src.split(",")} 
                    className={portfolioBox.thumbnail.alignment === "horizontal" ? "horizIconAlign" : "vertiIconAlign"} 
                  />
                ) : (
                  <img 
                    src={portfolioBox.thumbnail.src} 
                    alt="" 
                    className={portfolioBox.thumbnail.alignment === "horizontal" ? "horizImgAlign" : "vertiImgAlign"} 
                  />
                )}
                <span className={`${portfolioStyles.boxLabel} font-subheading-1`}>{portfolioBox.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default PortfolioPage

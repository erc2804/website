import React, { Component } from "react"
import Layout from "../components/layout"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// --- fontawesome icons
import { fab } from '@fortawesome/free-brands-svg-icons'
// --- portfolio thumbnails (as img)
import ivImg from '../images/portfolio/infraview_screenshot.png'
import jonaImg from '../images/portfolio/jona_screenshot.png'
import dcImg from '../images/portfolio/digitChallenge_screenshot.png'
import melImg from '../images/portfolio/mel_screenshot.png'
import paImg from '../images/portfolio/playassess_screenshot.png'
// --- styles
import "../styles/globals.scss"
import portfolioStyles from "../styles/portfolio.module.scss"

library.add(fab);

class PortfolioPage extends Component {
  render() {
    const portfolioBoxes = [{
      label: "my fiddles",
      url: "https://jsfiddle.net/user/erc2804/",
      thumbnail: {
        type: "icon",
        src: "fab,jsfiddle",
        alignment: "horizontal"
      },
      theme: "dark1"
    }, {
      label: "Website, infraView",
      url: "https://www.infraview.net",
      thumbnail: {
        type: "image",
        src: ivImg,
        alignment: "vertical"
      },
      theme: "dark2"
    }, {
      label: "Jobnavigator, Siemens",
      url: "https://jona.cut-e.com/jona/",
      thumbnail: {
        type: "image",
        src: jonaImg,
        alignment: "vertical"
      },
      theme: "light1"
    }, {
      label: "digitChallenge, Procter & Gamble",
      url: "https://google.de",
      thumbnail: {
        type: "image",
        src: dcImg,
        alignment: "vertical"
      },
      theme: "lightest"
    }, {
      label: "playAssess, cut-e (an AON company)",
      url: "https://google.de",
      thumbnail: {
        type: "image",
        src: paImg,
        alignment: "vertical"
      },
      theme: "light2"
    }, {
      label: "custom mobile menu, tech demo",
      url: "https://google.de",
      thumbnail: {
        type: "image",
        src: melImg,
        alignment: "vertical"
      },
      theme: "lightest"
    }];

    return (
      <Layout title="Portfolio">
        <div className={`${portfolioStyles.portfolioPageWrapper} default-padding`}>
          <div className={`${portfolioStyles.headerTextContainer} font-header-4`}>
            Portfolio
          </div>
          <div className={portfolioStyles.boxesWrapper}>
            {portfolioBoxes.map((portfolioBox, i) => (
              <a 
                href={portfolioBox.url} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`${portfolioStyles.box} background-color-${portfolioBox.theme}`} 
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

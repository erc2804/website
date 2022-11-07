import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// --- fontawesome icons
import { fab } from '@fortawesome/free-brands-svg-icons'
// --- styles
import "../styles/globals.scss"
import portfolioStyles from "../styles/portfolio.module.scss"

library.add(fab);

class PortfolioPage extends Component {

  portfolioBoxes = [{
    id: "casualvocab",
    label: "CasualVocab, iOS app",
    url: "https://apps.apple.com/de/app/casualvocab-widget-japanese/id1622203836?l=en",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "dark2"
  }, {
    id: "infraview",
    label: "Website, infraView",
    url: "https://www.infraview.net",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "light1"
  }, {
    id: "nextstepweb",
    label: "Website, nextstepweb",
    url: "https://www.nextstepweb.de",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "lightest"
  }, {
    id: "kindeskinder",
    label: "Shopify-Webshop, kindeskinder",
    url: "https://kindeskinder.biz/",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "light2"
  },
  {
    id: "pvoswald",
    label: "Shopify-Webshop, PuraVida & Oswald",
    url: "https://oswald-puravida-wein.de/",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "dark2"
  },
  {
    id: "melmenu",
    label: "custom mobile menu, tech demo",
    url: "https://ercancicek.com/mel-menu.html",
    thumbnail: {
      type: "image",
      src: "",
      alignment: "vertical"
    },
    theme: "dark2"
  }
  ];

  componentWillMount() {
    this.setPortfolioImages()
  }

  setPortfolioImages() {
    this.props.data.allFile.edges.forEach((edge) => {
      const filename = edge.node.childImageSharp.fluid.originalName;
      const idFromFilename = filename.substr(0, filename.lastIndexOf('.'));
      const foundIdx = this.portfolioBoxes.findIndex(portBox => portBox.id === idFromFilename);
      if(foundIdx !== -1) {
        this.portfolioBoxes[foundIdx].thumbnail.src = edge.node.childImageSharp.fluid.src;
      }
    });
  }

  render() {
    const portalBoxes = [{
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
                <span className={`font-subheading-1`}>{portalBox.label}</span>
              </a>
            ))}
          </div>
          <div className={portfolioStyles.boxesWrapper}>
            {this.portfolioBoxes.map((portfolioBox, i) => (
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
                <span className={`font-subheading-1`}>{portfolioBox.label}</span>
              </a>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
query {
  allFile(
    filter: {
      extension: { regex: "/(jpg)|(jpeg)|(png)|(svg)/" }
      sourceInstanceName: { eq: "imagesPortfolio" }
    }
  ) {
    edges {
      node {
        dir
        childImageSharp {
          fluid(maxWidth: 390, quality: 100) {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`;

export default PortfolioPage

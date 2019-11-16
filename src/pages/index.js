import React, { Component } from "react"
import Layout from "../components/layout"
// --- styles
import "../styles/globals.scss"
import indexStyles from "../styles/index.module.scss"
// --- images
import angularImg from "../images/home/angular.svg"
import adobeccImg from "../images/home/adobe-cc.svg"
import figmaImg from "../images/home/figma.svg"

class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      currentAdpillarText: "",
      finalAdpillarText: "Developer"
    }
  }
  
  render() {
    [...this.state.finalAdpillarText].forEach((char, index) => {
      setTimeout(() => {
        console.log("char: ", char);
      }, 500 * index);
    });

    const bottombars = [
      {
        label: "Angular",
        img: angularImg,
        info: "4 years",
      },
      {
        label: "Adobe CC",
        img: adobeccImg,
        info: "6 years",
      },
      {
        label: "Figma",
        img: figmaImg,
        info: "1 year",
      },
    ]

    return (
      <Layout title="Home">
        <div className={indexStyles.indexPageContainer}>
          <div className={indexStyles.adpillarWrapper}>
            <div className={indexStyles.adpillarContainer}>
              <div className={indexStyles.nameContainer}>
                <span>Ercan</span>
                &nbsp;
                <span>Cicek</span>
              </div>
              <div className={indexStyles.professionContainer}>
                <span>UX</span>
                &nbsp;
                <span></span>
              </div>
            </div>
          </div>
          <div
            className={[indexStyles.bottombarWrapper, "default-padding"].join(
              " "
            )}
          >
            <div className={indexStyles.bottombarContainer}>
              {bottombars.map((btmBar, i) => (
                <div key={i} className={indexStyles.bottombar}>
                  <img src={btmBar.img} alt="" />
                  <span className={indexStyles.label}>{btmBar.label}</span>
                  <span className={indexStyles.info}>
                    {btmBar.info} <br /> of experience
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

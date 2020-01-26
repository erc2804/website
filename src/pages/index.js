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
      orientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape",
      currentAdpillarText: "",
      finalAdpillarTexts: ["Designer", "Developer"]
    }
  }

  adpillarIntval = null;
  clearAdpillarIntval = null;
  initialAdpillarTimeout = null;
  nextAdpillarTimeout = null;
  nextAdpillarWordTimeout = null;
  adpillarWordIdx = 0;

  componentDidMount() {
    this.initialAdpillarTimeout = setTimeout(() => {
      this.startAdpillarAnim(this.adpillarWordIdx);
    }, 1000);
    this.checkOrientation();
    window.addEventListener("resize", this.checkOrientation.bind(this));
  }

  componentWillUnmount() {
    clearInterval(this.adpillarIntval);
    clearInterval(this.clearAdpillarIntval);
    clearTimeout(this.initialAdpillarTimeout);
    clearTimeout(this.nextAdpillarTimeout);
    clearTimeout(this.nextAdpillarWordTimeout);
    window.removeEventListener("resize", this.checkOrientation.bind(this));
  }

  startAdpillarAnim(wordIdx) {
    let finalAdpillarIdx = 0;
    this.adpillarIntval = setInterval(() => {
      this.setState({
        currentAdpillarText: this.state.currentAdpillarText + this.state.finalAdpillarTexts[this.adpillarWordIdx][finalAdpillarIdx]
      });
      finalAdpillarIdx++;
      if(!this.state.finalAdpillarTexts[this.adpillarWordIdx][finalAdpillarIdx]) {
        clearInterval(this.adpillarIntval);
        this.nextAdpillarWord();
      }
    }, 150);
  }

  nextAdpillarWord() {
    this.adpillarWordIdx++;
    if(this.state.finalAdpillarTexts[this.adpillarWordIdx]) {
      this.nextAdpillarWordTimeout = setTimeout(() => {
        this.clearAdpillar();
      }, 2000);
    }
  }

  clearAdpillar() {
    this.clearAdpillarIntval = setInterval(() => {
      this.setState({
        currentAdpillarText: this.state.currentAdpillarText.slice(0, -1)
      });
      if(this.state.currentAdpillarText.length === 0) {
        clearInterval(this.clearAdpillarIntval);
        this.nextAdpillarTimeout = setTimeout(() => {
          this.startAdpillarAnim(this.adpillarWordIdx);
        }, 500)
      }
    }, 50); 
  }

  checkOrientation() {
    this.setState({
      orientation: window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"
    });
  }
  
  render() {
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
              <div className={`${indexStyles.nameContainer} ${this.state.orientation === "landscape" ? 'font-header-1' : "font-header-2"}`}>
                <span>Ercan</span>
                &nbsp;
                <span>Cicek</span>
              </div>
              <div className={`${indexStyles.professionContainer} ${this.state.orientation === "landscape" ? 'font-header-1' : "font-header-2"}`}>
                <span>UX</span>
                &nbsp;
                <span>{this.state.currentAdpillarText}</span>
                <span>_</span>
              </div>
            </div>
          </div>
          <div className={`${indexStyles.bottombarWrapper} default-padding`}>
            <div className={indexStyles.bottombarContainer}>
              {bottombars.map((btmBar, i) => (
                <div key={i} className={indexStyles.bottombar}>
                  <div className={indexStyles.imgContainer}>
                    <img src={btmBar.img} alt="" />
                  </div>
                  <span className="font-header-3">{btmBar.label}</span>
                  <span className="font-header-4">
                    {btmBar.info} <br className={this.state.orientation === "landscape" ? "" : "deepHide"} /> of experience
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

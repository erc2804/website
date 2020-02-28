import React, { Component } from "react"
import Layout from "../components/layout"
// --- styles
import "../styles/globals.scss"
import indexStyles from "../styles/index.module.scss"
class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      orientation: "",
      currentAdpillarText: "",
      finalAdpillarTexts: ["Designer", "Developer"],
      wndw: {
        w: 0,
        h: 0,
      },
    }
  }

  _isMounted = false;
  adpillarIntval = null
  clearAdpillarIntval = null
  initialAdpillarTimeout = null
  nextAdpillarTimeout = null
  nextAdpillarWordTimeout = null
  adpillarWordIdx = 0

  componentDidMount() {
    this._isMounted = true
    this.initialAdpillarTimeout = setTimeout(() => {
      this.startAdpillarAnim(this.adpillarWordIdx)
    }, 300)
    this.onResize()
    window.addEventListener("resize", this.onResize.bind(this))
  }

  componentWillUnmount() {
    this._isMounted = false
    clearInterval(this.adpillarIntval)
    clearInterval(this.clearAdpillarIntval)
    clearTimeout(this.initialAdpillarTimeout)
    clearTimeout(this.nextAdpillarTimeout)
    clearTimeout(this.nextAdpillarWordTimeout)
    window.removeEventListener("resize", this.onResize.bind(this))
  }

  startAdpillarAnim() {
    if(this._isMounted) {
      let finalAdpillarIdx = 0
      this.adpillarIntval = setInterval(() => {
        this.setState({
          currentAdpillarText:
            this.state.currentAdpillarText +
            this.state.finalAdpillarTexts[this.adpillarWordIdx][finalAdpillarIdx],
        })
        finalAdpillarIdx++
        if (
          !this.state.finalAdpillarTexts[this.adpillarWordIdx][finalAdpillarIdx]
        ) {
          clearInterval(this.adpillarIntval)
          this.nextAdpillarWord()
        }
      }, 150)
    }
  }

  nextAdpillarWord() {
    if(this._isMounted) {
      this.adpillarWordIdx++
      if (this.state.finalAdpillarTexts[this.adpillarWordIdx]) {
        this.nextAdpillarWordTimeout = setTimeout(() => {
          this.clearAdpillar()
        }, 2000)
      }
    }
  }

  clearAdpillar() {
    if(this._isMounted) {
      this.clearAdpillarIntval = setInterval(() => {
        this.setState({
          currentAdpillarText: this.state.currentAdpillarText.slice(0, -1),
        })
        if (this.state.currentAdpillarText.length === 0) {
          clearInterval(this.clearAdpillarIntval)
          this.nextAdpillarTimeout = setTimeout(() => {
            this.startAdpillarAnim(this.adpillarWordIdx)
          }, 500)
        }
      }, 50)
    }
  }

  onResize() {
    if(this._isMounted) {
      this.setState({
        orientation: window.matchMedia("(orientation: portrait)").matches
          ? "portrait"
          : "landscape",
        wndw: {
          w: window.innerWidth,
          h: window.innerHeight,
        },
      })
    }
  }

  render() {
    const allSkills = [
      {
        label: "Angular",
      },
      {
        label: "React",
      },
      {
        label: "Adobe CC",
      },
      {
        label: "Figma",
      },
    ]
    return (
      <Layout title="Home" darkHeader={true}>
        <div className={indexStyles.indexPageWrapper}>
          <div className={indexStyles.indexPageContainer}>
            <div className={indexStyles.heroBlock}>
              <div className={indexStyles.adpillarContainer}>
                <div
                  className={`${
                    this.state.wndw.w > 700 ? "font-header-1" : "font-header-2"
                  }`}
                >
                  <span className="text-color-light1">Ercan</span>
                  &nbsp;
                  <span className="text-color-lightest">Cicek</span>
                </div>
                <div
                  className={`${indexStyles.professionContainer} ${
                    this.state.wndw.w > 700 ? "font-header-1" : "font-header-2"
                  }`}
                >
                  <span className="text-color-lightest">UX</span>
                  &nbsp;
                  <span className="text-color-light1">
                    {this.state.currentAdpillarText}
                  </span>
                  <span className="text-color-light1">_</span>
                </div>
              </div>
              <div className={indexStyles.skillsContainer}>
                {allSkills.map((skill, i) => (
                  <div className={indexStyles.skillsLabel} key={i}>
                    <button className="font-subheading-1 text-color-lightest">
                      &nbsp;{skill.label}
                    </button>
                    <span
                      className={`${
                        i < allSkills.length - 1 ? "" : "deepHide"
                      } font-subheading-1 text-color-light1`}
                    >
                      &nbsp;&#47;
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default IndexPage

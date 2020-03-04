import React, { Component } from "react"
import Layout from "../components/layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// --- fontawesome icons
import { fab } from "@fortawesome/free-brands-svg-icons"
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons"
// --- styles
import "../styles/globals.scss"
import aboutmeStyles from "../styles/about-me.module.scss"

library.add(fab, faEnvelopeSquare)

class AboutmePage extends Component {
  render() {
    const socialmediaBoxes = [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/in/ercancicek",
        thumbnail: {
          type: "icon",
          src: "fab,linkedin",
          alignment: "horizontal",
        },
        theme: "dark1",
      },
      {
        label: "Xing",
        url: "https://www.xing.com/profile/Ercan_Cicek10?sc_o=mxb_p",
        thumbnail: {
          type: "icon",
          src: "fab,xing-square",
          alignment: "horizontal",
        },
        theme: "dark2",
      },
      {
        label: "Mail: erc2804@outlook.de",
        url: "mailto:erc2804@outlook.de",
        thumbnail: {
          type: "icon",
          src: "fas,envelope-square",
          alignment: "horizontal",
        },
        theme: "light1",
      },
    ]

    return (
      <Layout 
        title="About Me"
        descriptionEn="Ercan Cicek is a UX Designer and UX Developer based in Mainz with more than four years of work experience
        in conceptualizing and implementing web applications in the frontend."
        descriptionDe="Ercan Cicek ist ein UX Designer und UX Entwickler aus Mainz mit mehr als vier Jahren Erfahrung in der Konzeption und Entwicklung von Webanwendungen im Frontend."
      >
        <div
          className={`${aboutmeStyles.aboutmePageWrapper} default-padding`}
        >
          <h1 className={`${aboutmeStyles.headerTextContainer} font-header-4`}>
            About Me
          </h1>
          <div className={aboutmeStyles.infoWrapper}>
            <div className={aboutmeStyles.imgContainer}>
              <div className={aboutmeStyles.greenOverlay}></div>
            </div>
            <div className={aboutmeStyles.descriptionContainer}>
              <h2 className={`font-header-2 text-color-light1`}>Developer. Designer. <br />Animation expert.</h2>
              <span className="font-subheading-1">
                I am a UX Developer with more than four years of work experience
                in <strong>conceptualizing and implementing web applications</strong> at cut-e (an
                AON company) in Hamburg, at Eckelmann in Wiesbaden and infraView
                in Mainz. <br/> Mainly I am working with <strong>Angular</strong>, <strong>SCSS</strong> and <strong>Adobe CC</strong>.
                <br/> Through my study of Communcation and Multimedia Design at
                Fachhochschule Aachen I especially tend to <strong>Frontend development </strong>
                and am getting further education regularly.
              </span>
            </div>
          </div>
          <div className={aboutmeStyles.divider}></div>
          <div className={aboutmeStyles.boxesWrapper}>
            {socialmediaBoxes.map((socialmediaBox, i) => (
              <a
                href={socialmediaBox.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`${aboutmeStyles.box} background-color-${socialmediaBox.theme}`}
                key={i}
              >
                {socialmediaBox.thumbnail.type === "icon" ? (
                  <FontAwesomeIcon
                    icon={socialmediaBox.thumbnail.src.split(",")}
                    className={
                      socialmediaBox.thumbnail.alignment === "horizontal"
                        ? "horizIconAlign"
                        : "vertiIconAlign"
                    }
                  />
                ) : (
                  <img
                    src={socialmediaBox.thumbnail.src}
                    alt=""
                    className={
                      socialmediaBox.thumbnail.alignment === "horizontal"
                        ? "horizImgAlign"
                        : "vertiImgAlign"
                    }
                  />
                )}
                <span className={`${aboutmeStyles.boxLabel} font-subheading-1`}>
                  {socialmediaBox.label}
                </span>
              </a>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default AboutmePage

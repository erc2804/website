import React, {Component} from "react"
import {Link} from "gatsby"
import Layout from "../components/layout"
// --- styles
import "../styles/global.scss"
import indexStyles from "../styles/index.module.scss"
// --- hero images
import trainImg from "../images/index/train.svg"
import netImg from "../images/index/net.svg"
import netMobileImg from "../images/index/net.mobile.svg"
import bridgeImg from "../images/index/bridge.svg"
// --- kategorien images
import schnittstellenoffenImg from "../images/index/icon-schnittstellenoffen.svg"
import individualisierbarImg from "../images/index/icon-individualisierbar.svg"
import erweiterbarImg from "../images/index/icon-erweiterbar.svg"
import plattformuebergreifendImg from "../images/index/icon-plattformuebergreifend.svg"
// --- referenzen images
import dianaImg from "../images/index/diana.png"
import regioImg from "../images/index/regio.png"
import cflImg from "../images/index/cfl.png"
class IndexPage extends Component {
  constructor() {
    super()
    this.state = {
      orientation: "",
      width: "",
      height: "",
      katActiveId: 1,
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  lineAnimTimeout = null;
  lineAnimLength = 10;

  componentDidMount(){ 
    this.updateDimensions();
    this.setNewActiveKategorie(1);
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    this.cancelLineAnimation();
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      orientation: (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"),
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  setNewActiveKategorie(id) {
    this.setState({
      katActiveId: id
    })
    this.startKatLineAnimation();
  }

  startKatLineAnimation() {
    this.cancelLineAnimation();
    this.lineAnimTimeout = setTimeout(() => {
      this.cancelLineAnimation();
      this.nextKategorie();
    }, this.lineAnimLength * 1000);
  }

  cancelLineAnimation() {
    clearTimeout(this.lineAnimTimeout);
  }

  nextKategorie() {
    this.setState({
      katActiveId: this.state.katActiveId < 4 ? this.state.katActiveId + 1 : 1
    });
    this.startKatLineAnimation();
  }

  // --- PLATTFORM BLOCK
  kategorienCollection = [
    {
      active: true,
      id: 1,
      label: "Schnittstellen-offen",
      img: schnittstellenoffenImg,
      fn: () => { this.setNewActiveKategorie(1) },
      content: {
        head: "DIANA API einfach anschließen!",
        caption: "Wir kooperieren mit führenden Herstellern und bieten Schnittstellen für verschiedene Anlagetypen.",
        button: {
          visible: true,
          text: "Mehr zu unserer Plattform",
          fn: () => { },
          target: "/platform"
        }
      }
    },
    {
      active: false,
      id: 2,
      label: "Erweiterbar",
      img: erweiterbarImg,
      fn: () => { this.setNewActiveKategorie(2) },
      content: {
        head: "DIANA API einfach!",
        caption: "Wir kooperieren mit führenden Herstellern und bieten Schnittstellen für verschiedene Anlagetypen.",
        button: {
          visible: true,
          text: "Mehr zu unserer Plattform",
          fn: () => { },
          target: "/platform"
        }
      }
    },
    {
      active: false,
      id: 3,
      label: "Individualisierbar",
      img: individualisierbarImg,
      fn: () => { this.setNewActiveKategorie(3) },
      content: {
        head: "DIANA API!",
        caption: "Wir kooperieren mit führenden Herstellern und bieten Schnittstellen für verschiedene Anlagetypen.",
        button: {
          visible: true,
          text: "Mehr zu unserer Plattform",
          fn: () => { },
          target: "/platform"
        }
      }
    },
    {
      active: false,
      id: 4,
      label: "Plattformübergreifend",
      img: plattformuebergreifendImg,
      fn: () => { this.setNewActiveKategorie(4) },
      content: {
        head: "DIANA!",
        caption: "Wir kooperieren mit führenden Herstellern und bieten Schnittstellen für verschiedene Anlagetypen.",
        button: {
          visible: true,
          text: "Mehr zu unserer Plattform",
          fn: () => { },
          target: "/platform"
        }
      }
    },
  ]
  // --- REFERENZEN BLOCK
  referenzenCollection = [
    {
      img: dianaImg,
      label: "DIANA - Analyseplattform",
      text:
        "Für die DB Netze haben wir die Diagnose- und Analyseplattform DIANA entwickelt. Sie stellt das zentrale Instandhaltungswerkzeug der Bahn dar. An DIANA sind über 25.000 Weichen angeschlossen, pro Tag empfängt die Plattform so über 1 Mio. Datensätze und 600.000 Weichenumläufe.",
    },
    {
      img: regioImg,
      label: "Projekt DB Regio – Fahrzeugdiagnose",
      text:
        "Zusammen mit DB Regio arbeiten wir daran Außerplan-Zuführungen zu vermeiden, die Arbeitsvorbereitung der Instandhaltung zu optimieren und Wirksamkeiten von Reparaturen zu überprüfen.",
    },
    {
      img: cflImg,
      label: "CFL – IoT Plattform",
      text:
        "Als staatliche Eisenbahngesellschaft Luxemburgs betreibt die CFL sowohl das Schienennetz als auch die Fahrzeugflotte. Durch die Integration von Infrastruktur- und Fahrzeugdaten auf einer Plattform schaffen wir Synergien für unseren Kunden.",
    },
  ]
  referenzenBlock = (
    <div className={[indexStyles.referenzenBlock, "default-padding"].join(" ")}>
      <div className={indexStyles.headlineContainer}>
        <span className="font-desktop-section-title">Referenzen</span>
      </div>
      <div className={indexStyles.referenzenWrapper}>
        {this.referenzenCollection.map((refElem, i) => (
          <div className={indexStyles.referenzenContainer} key={i}>
            <img src={refElem.img} alt={refElem.label + " image"} />
            <span
              className={[indexStyles.title, "font-desktop-body-title"].join(
                " "
              )}
            >
              {refElem.label}
            </span>
            <span className="font-desktop-body-text">{refElem.text}</span>
          </div>
        ))}
      </div>
      <div className={indexStyles.buttonContainer}>
        <Link className="default-button" to="/references">
          <span className="font-desktop-cta-text">
            Mehr zu unseren Referenzen
          </span>
        </Link>
      </div>
    </div>
  )
  // --- KOMPETENZEN BLOCK
  kompetenzenCollection = [
    {
      imgClass: indexStyles.projektmanagementImg,
      label: "Projektmanagement",
      text:
        "Wir vestehen die Bedürfnisse unserer Kunden und setzen sie im Dialog mit unseren Entwicklungsteams wunschgenau um.",
    },
    {
      imgClass: indexStyles.consultingImg,
      label: "Consulting",
      text:
        "Wir beraten unsere Kunden mit der Erfahrung aus nationalen und internationalen Projekten in der Einführung eines vollumfänglichen Diagnosessystems.",
    },
    {
      imgClass: indexStyles.analyticsImg,
      label: "Analytics",
      text:
        "Durch die Analyse eingehender Messdaten können wir Probleme erkennen, bevor sie auftreten.",
    },
    {
      imgClass: indexStyles.designImg,
      label: "UX Design",
      text:
        "Mittels Rapid Prototyping und modernen Design-Tools entwickeln wir auf Nutzer zugeschnittene Design-Lösungen.",
    },
    {
      imgClass: indexStyles.developmentImg,
      label: "Development",
      text: "Wir entwickeln unsere Apps mit den aktuellsten Web-Technologien.",
    },
    {
      imgClass: indexStyles.supportImg,
      label: "Support",
      text:
        "Wir beraten unsere Kunden mit der Erfahrung aus nationalen und internationalen  Projekten.",
    },
  ]
  kompetenzenBlock = (
    <div
      className={[indexStyles.kompetenzenBlock, "default-padding"].join(" ")}
    >
      <div className={indexStyles.headlineContainer}>
        <span className="font-desktop-section-title">Kompetenzen</span>
      </div>
      <div className={indexStyles.kompetenzenWrapper}>
        {this.kompetenzenCollection.map((komElem, i) => (
          <div className={indexStyles.kompetenzenContainer} key={i}>
            <div
              className={[komElem.imgClass, "fullbackground"].join(" ")}
            ></div>
            <span className="font-desktop-body-title">{komElem.label}</span>
            <span className="font-desktop-body-text">{komElem.text}</span>
          </div>
        ))}
      </div>
      <div className={indexStyles.buttonContainer}>
        <Link className="default-button" to="/about-us">
          <span className="font-desktop-cta-text">Mehr über uns</span>
        </Link>
      </div>
    </div>
  )

  render() {
    return (
      <Layout title="Startseite">
        {/* ------ HERO BLOCK ------ */}
        <div className={indexStyles.heroBlock}>
          <div className={indexStyles.textContainer}>
            <span className="font-desktop-header-title">Digitale Pioniere</span>
            <span className="font-desktop-header-text">
              Wir betreiben für die Deutsche Bahn AG die weltweit größte
              IT-Plattform für Weichendiagnose, an die über 20.000 Anlagen
              angeschlossen sind.
            </span>
          </div>
          <div className={indexStyles.visualizationContainer}>
            <img
              src={trainImg}
              alt=""
              className={indexStyles.trainImg}
            />
            <img src={(this.state.orientation === "portrait" && this.state.width <= "1023") || (this.state.orientation === "landscape" && this.state.height <= "500") ? netMobileImg : netImg} alt="" className={indexStyles.netImg} />
            <img
              src={bridgeImg}
              alt=""
              className={indexStyles.bridgeImg}
            />
          </div>
        </div>
        {/* ------ PLATTFORM BLOCK ------ */}
        <div className={[indexStyles.plattformBlock, "default-padding"].join(" ")}>
          <div className={indexStyles.kategorienWrapper}>
            {this.kategorienCollection.map((kElem, i) => (
              <div className={indexStyles.kategorienContainer} key={i} onClick={kElem.fn}>
                <img src={kElem.img} alt={kElem.label + " image"} />
                <span className="font-desktop-body-title">{kElem.label}</span>
              </div>
            ))}
            <div className={indexStyles.lineWrapper}>
              <div className={indexStyles.lineGrey}></div>
              <div className={indexStyles.lineBlue} style={{
                right: 75 - (this.state.katActiveId - 1) * 25 + "%",
              }}></div>
            </div>
          </div>
          <div className={indexStyles.kategorienDetailsWrapper}>
            {this.kategorienCollection.map((kElem, i) => (
              <div className={indexStyles.kategorienDetailsContainer} key={i} style={{
                transform: "translateX(" + (this.state.katActiveId - 1) * -100 + "%)"
              }}>
                <div
                  className={[indexStyles.kategorienImg, "fullbackground"].join(" ")}
                ></div>
                <div className={indexStyles.kategorienTextContainer}>
                  <span className="font-desktop-section-title">
                    {kElem.content.head}
                  </span>
                  <span className="font-desktop-body-text">
                  {kElem.content.caption}
                  </span>
                  <Link className="default-button" onClick={kElem.content.button.fn} to={kElem.content.button.target}>
                    <span className="font-desktop-cta-text">
                      {kElem.content.button.text}
                    </span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
        {this.referenzenBlock}
        {this.kompetenzenBlock}
      </Layout>
    )
  }
}

export default IndexPage
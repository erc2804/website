import React, {Component} from "react"
import Layout from "../components/layout"
// --- styles
import "../styles/global.scss"
import referencesStyles from "../styles/references.module.scss"
// --- hero images
import bridgeImg from "../images/references/bridge.svg"
import train1Img from "../images/references/train1.svg"
import train2Img from "../images/references/train2.svg"
class referencesPage extends Component {
  constructor() {
    super()
    this.state = {
      orientation: "",
      width: "",
      height: "",
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentDidMount(){ 
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      orientation: (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"),
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  render() {
    return (
      <Layout title="Referenzen">
        {/* ------ HERO BLOCK ------ */}
        <div className={referencesStyles.heroBlock}>
          <div className={referencesStyles.textContainer}>
            <span className="font-desktop-header-title">Bahn & Big Data</span>
            <span className="font-desktop-header-text">
            Wir bringen Industrie 4.0 in die Eisenbahnwelt. Predictive Maintenance bedeutet mehr Effizienz von Wartung und Instandhaltung - somit können Ausfälle vermieden werden.
            </span>
          </div>
          <div className={referencesStyles.visualizationContainer}>
            <img src={bridgeImg} alt="" className={referencesStyles.bridgeImg} />
            <img src={train1Img} alt="" className={[referencesStyles.train1Img, "train-from-left"].join(" ")} />
            <img src={train2Img} alt="" className={[referencesStyles.train2Img, "train-from-right"].join(" ")} />
          </div>
        </div>
        {/* ------ INFO BLOCK ------ */}
        <div className={[referencesStyles.infoBlock, "default-padding"].join(" ")}>
          <div className={referencesStyles.infoContainer}>
            <div className={[referencesStyles.imgContainer, referencesStyles.dianaImg].join(" ")}></div>
            <div className={referencesStyles.textContainer}>
              <span className="font-desktop-section-title">DIANA</span>
              <span className="font-desktop-body-title">Weichen</span>
              <span className="font-desktop-body-text">
                Für die DB Netze haben wir die Diagnose- und Analyseplattform DIANA entwickelt. Sie stellt das zentrale Instandhaltungswerkzeug der Bahn dar. An DIANA sind über 25.000 Weichen angeschlossen, pro Tag empfängt die Plattform so über 1 Mio. Datensätze und 600.000 Weichenumläufe.
                DIANA misst und analysiert kontinuierlich den Zustand. So wird präventive Instandhaltung möglich – das verringert Verspätungen, denn Weichenstörungen sind einer der Hauptgründe.
              </span>
              <span className="font-desktop-body-title">Weichenheizungen</span>
              <span className="font-desktop-body-text">
                Die über 4500 Weichenheizungen der DB Netz AG stammen von verschiedenen Lieferanten, die unterschiedliche Anwendungen für Fernwartung und Ferndiagnose bieten. In einem Pilotprojekt haben wir 400 davon an die Diagnoseplattform DIANA angeschlossen. So werden sie online unter einer einheitlichen Oberfläche überwacht. Mit regelmäßigen Workshops schulen wir Anwender, nehmen Feedback auf und entwickeln das System zur Serienreife, um es deutschlandweit auszurollen.
                <br />
                <br />
                Unsere Plattform verarbeitet inzwischen bis zu 750 Zustandsdatenpunkte pro Sekunde – wir könnten also mehr als das 2,5-fache der deutschlandweit eingesetzten Weichenheizungsanlagen anschließen.
              </span>
            </div>
          </div>
          <div className={referencesStyles.infoContainer}>
            <div className={[referencesStyles.imgContainer, referencesStyles.dbregioImg].join(" ")}></div>
            <div className={referencesStyles.textContainer}>
              <span className="font-desktop-section-title">DB Regio</span>
              <span className="font-desktop-body-title">Fahrzeugdiagnose</span>
              <span className="font-desktop-body-text">
                Zusammen mit DB Regio arbeiten wir daran Außerplan-Zuführungen zu vermeiden, die Arbeitsvorbereitung der Instandhaltung zu optimieren und Wirksamkeiten von Reparaturen zu überprüfen. Hierfür werten wir heute alle Meldungen der Baureihen 430 und 423 aus und integrieren diese in den täglichen Instandhaltungsarbeitstag.
              </span>
            </div>
          </div>
          <div className={referencesStyles.infoContainer}>
            <div className={[referencesStyles.imgContainer, referencesStyles.cflImg].join(" ")}></div>
            <div className={referencesStyles.textContainer}>
              <span className="font-desktop-section-title">CFL</span>
              <span className="font-desktop-body-title">IoT Plattform</span>
              <span className="font-desktop-body-text">
                Als staatliche Eisenbahngesellschaft Luxemburgs betreibt die CFL sowohl das Schienennetz als auch die Fahrzeugflotte. Durch die Integration von Infrastruktur- und Fahrzeugdaten auf einer Plattform schaffen wir Synergien für unseren Kunden. Neben der bereits in Betrieb genommen Weichenantriebsdiagnose und Temperaturüberwachung von Stellwerken sollen Schienentemperaturmessstellen (Checkpoints) und Gleislagedaten von Fahrzeugen (CTM) zusammengeführt werden. Hierdurch bringen wir möglichst viele Daten auf einen Punkt um ein digitales Abbild der Anlagen zu erstellen.
              </span>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default referencesPage
import React, {Component} from "react"
import Layout from "../components/layout"
import CountUp from 'react-countup';
import VisibilitySensor from 'react-visibility-sensor';
// --- styles
import "../styles/global.scss"
import platformStyles from "../styles/platform.module.scss"
// --- hero images
import trainImg from "../images/platform/train.svg"
// --- dataflow images
import tttImg from "../images/platform/trainToTrain.svg"
import ttbImg from "../images/platform/trainToBridge.svg"
import btbImg from "../images/platform/bridgeToBridge.svg"
import bttImg from "../images/platform/bridgeToTrain.svg"
import circleImg from "../images/platform/circle.svg"
// --- info images
import placeholderImg from "../images/platform/placeholder.svg"

class platformPage extends Component {
  constructor() {
    super()
    this.state = {
      orientation: "",
      width: "",
      height: "",
      activeDataflowId: 1
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  dataflowAnimTimeout = null;
  dataflowAnimLength = 5;

  componentDidMount(){ 
    this.updateDimensions();
    this.startDataflowAnim();
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    this.cancelDataflowAnimation();
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      orientation: (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"),
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  startDataflowAnim() {
    this.cancelDataflowAnimation();
    this.dataflowAnimTimeout = setTimeout(() => {
      this.cancelDataflowAnimation();
      this.setState({
        activeDataflowId: (this.state.activeDataflowId < 4 ? this.state.activeDataflowId + 1 : 1)
      });
      this.startDataflowAnim();
    }, this.dataflowAnimLength * 1000);
  }

  cancelDataflowAnimation() {
    clearTimeout(this.dataflowAnimTimeout);
  }

  manuallySetActiveDataflow(dataflowSpotId) {
    this.cancelDataflowAnimation();
    this.setState({
      activeDataflowId: dataflowSpotId
    });
    this.startDataflowAnim();
  }

  render() {
    const platformInfos = [{
      label: "Datenmodelle",
      text: "Durch einheitliche Datenmodelle führen wir Informationen aus der Infrastruktur ( Weichen, Oberleitungen, Signale, Leit- und Sicherungstechnik) und Fahrzeugen (Drehgestell, Motor, Türen und Innensensoren) in einem System zusammen. Fehlerszenarien können durch die Analyse der Daten erkannt und gemeldet werden. So wird Ihre frühzeitige Beseitigung möglich. Instandhaltungsarbeiten lassen sich zielgerichtet steuern und genau dokumentieren.",
      img: placeholderImg
    }, {
      label: "Modularer Aufbau",
      text: "Der modulare Aufbau erlaubt die Anbindung verschiedenster Datenquellen, wie Geoinformations- oder Assetmanagement-Systeme, und die Integration unterschiedlicher Interpretationsalgorithmen. Zudem können für jede Nutzergruppe passgenaue Visualisierungen erstellt werden, die unser einheitliches und modernes Design intuitiv bedienbar macht.",
      img: placeholderImg
    }];
    const platformFacts = [{
      val: 280,
      unit: "Mio.",
      label: "Weichenumläufe",
      text: "wurden bislang von uns aufgezeichnet und archiviert."
    }, {
      val: 2.6,
      unit: "Mio.",
      label: "Datensätze / Tag",
      text: "werden von uns empfangen und verarbeitet."
    }, {
      val: 25000,
      unit: "",
      label: "Infrastruktur Anlagen",
      text: "sind an unserer IT-Plattform angeschlossen."
    }];
    const dataflowContent = [{
      id: 1,
      img: tttImg,
      label: "Fahrzeug überwacht Fahrzeug",
      text: ["Installation in/auf Infrastruktur zur berührungslosen Messung von Fahrzeugzuständen​", "Fahrzeug Checkpoints", "Fahrzeugmonitoring"]
    }, {
      id: 2,
      img: bttImg,
      label: "Infrastruktur überwacht Fahrzeug",
      text: ["Installation in/auf Infrastruktur zur berührungslosen Messung von Fahrzeugzuständen", "Fahrzeug Checkpoints", "Fahrzeug Checkpoints"]
    }, {
      id: 4,
      img: ttbImg,
      label: "Fahrzeug überwacht Infrastruktur",
      text: ["Installation in/auf Infrastruktur zur berührungslosen Messung von Fahrzeugzuständen​", "Fahrzeug Checkpoints"]
    }, {
      id: 3,
      img: btbImg,
      label: "Infrastruktur überwacht Infrastruktur",
      text: ["Installation in/auf Infrastruktur zur berührungslosen Messung von Fahrzeugzuständen​", "Fahrzeug Checkpoints"]
    }];
    return (
      <Layout title="Plattform">
        {/* ------ HERO BLOCK ------ */}
        <div className={platformStyles.heroBlock}>
          <div className={platformStyles.textContainer}>
            <span className="font-desktop-header-title">Monitoring Plattform</span>
            <span className="font-desktop-header-text">
            Unsere IoT-Plattform ermöglicht die Überwachung, Steuerung und Diagnose von Fahrzeugen und verteilten Infrastrukturanlagen.
            </span>
          </div>
          <div className={platformStyles.visualizationContainer}>
          <img
              src={trainImg}
              alt=""
              className={platformStyles.trainImg}
            />
          </div>
        </div>
        {/* ------ DATAFLOW BLOCK ------ */}
        <div className={platformStyles.dataflowBlock}>
          <div className={platformStyles.headlineContainer}>
            <span className="font-desktop-section-title">Datenfluss</span>
          </div>
          <div className={platformStyles.dataflowContainerMobile}>
            {dataflowContent.map((dataflowSpot, i) => (
              <div className={platformStyles.dataflowSpot} key={i}>
                <img src={dataflowSpot.img} alt="" />
                <div className={platformStyles.textContainer}>
                  <span>{dataflowSpot.label}</span>
                  {dataflowSpot.text.map((dataflowText, i) => (
                    <span key={i}>{dataflowText}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className={platformStyles.dataflowContainerDesktop}>
            <div className={platformStyles.circleContainer}>
              <img 
                src={circleImg} 
                alt=""
                style={{
                  transform: "rotate(" + (this.state.activeDataflowId - 1) * 90 + "deg)"
                }}
              />
              <div className={platformStyles.textContainer}>
                <span>{dataflowContent[this.state.activeDataflowId - 1].label}</span>
                {dataflowContent[this.state.activeDataflowId - 1].text.map((dataflowText, i) => (
                  <span key={i}>{dataflowText}</span>
                ))}
              </div>
            </div>
            {dataflowContent.map((dataflowSpot, i) => (
              <div className={[platformStyles.dataflowSpot, dataflowSpot.id === 1 || dataflowSpot.id === 4 ? platformStyles.dataflowSpotImgLeft : platformStyles.dataflowSpotImgRight, this.state.activeDataflowId === dataflowSpot.id ? platformStyles.circleActive : ""].join(" ")} key={i} onClick={() => { this.manuallySetActiveDataflow(dataflowSpot.id); }}>
                <img src={dataflowSpot.img} alt="" />
              </div>
            ))}
          </div>
        </div>
        {/* ------ INFO BLOCK ------ */}
        <div className={[platformStyles.infoBlock, "default-padding"].join(" ")}>
          {platformInfos.map((platformEle, i) => (
          <div className={platformStyles.infoContainer} key={i}>
            <div className={platformStyles.imgContainer}>
              <img src={platformEle.img} alt="" />
            </div>
            <div className={platformStyles.textContainer}>
              <div className={platformStyles.titleContainer}>
                <span className="font-desktop-section-title">{platformEle.label}</span>
              </div>
              <span className="font-desktop-body-text">{platformEle.text}</span>
            </div>
          </div>
        ))}
        </div>
        {/* ------ FACTS BLOCK ------ */}
        <div className={[platformStyles.factsBlock, "default-padding"].join(" ")}>
          <div className={platformStyles.headlineContainer}>
            <span className="font-desktop-section-title">Plattform Fakten</span>
          </div>
          <div className={platformStyles.numbersWrapper}>
          {platformFacts.map((platformFact, i) => (
            <div className={platformStyles.numbersContainer} key={i}>
              <div className="font-desktop-header-title">
                <CountUp end={platformFact.val} suffix={platformFact.unit ? "&nbsp" + platformFact.unit : ""} redraw={true}>
                  {({ countUpRef, start }) => (
                      <VisibilitySensor partialVisibility={true} onChange={start} delayedCall>
                          <span ref={countUpRef} />
                      </VisibilitySensor>
                  )}
                </CountUp>
              </div>
              <span className="font-desktop-header-text">{platformFact.label}</span>
              <span className="font-desktop-body-text">{platformFact.text}</span>
            </div>
          ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default platformPage
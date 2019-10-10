import React, {Component} from "react"
import Layout from "../components/layout"
// --- styles
import "../styles/global.scss"
import aboutusStyles from "../styles/about-us.module.scss"
// --- hero images
import trainImg from "../images/about-us/train.svg"
// --- info images
import werwirsindImg from "../images/about-us/werwirsind.png"
import wasunsausmachtImg from "../images/about-us/wasunsausmacht.png"
// --- team images
import avatarImg from "../images/about-us/avatar.png"
class aboutusPage extends Component {
  constructor() {
    super()
    this.state = {
      orientation: "",
      width: "",
      height: "",
      activeBubbleId: 1,
      nextTrainTarget: 1,
      trainVisible: true
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }
  trainAnimTimeout = null;
  initTimeout= null;
  trainAnimLength = 10;
  // ---- test

  componentDidMount(){ 
    this.updateDimensions();
    this.initTimeout = setTimeout(() => {this.trainAnimInit();}, 1000)
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount() {
    this.cancelTrainAnimation();
    clearTimeout(this.initTimeout);
    window.removeEventListener("resize", this.updateDimensions);
  }

  updateDimensions() {
    this.setState({
      orientation: (window.matchMedia("(orientation: portrait)").matches ? "portrait" : "landscape"),
      width: window.innerWidth,
      height: window.innerHeight
    })
  }

  trainAnimInit() {
    this.setState({
      activeBubbleId: 1
    })
    this.setState({
      nextTrainTarget: 2
    })
    this.startTrainAnim();
  }

  startTrainAnim() {
    this.cancelTrainAnimation();
    this.trainAnimTimeout = setTimeout(() => {
      this.cancelTrainAnimation();
      this.nextBubble();
    }, this.trainAnimLength * 1000);
  }

  cancelTrainAnimation(andHideTrain) {
    clearTimeout(this.trainAnimTimeout);
    if(andHideTrain) {
      this.setState({
        trainVisible: false
      });
    }
  }

  manuallySetActiveBubble(bubbleId) {
    if(this.state.trainVisible) {
      this.cancelTrainAnimation(true);
    }
    this.setState({
      activeBubbleId: bubbleId
    });
  }

  nextBubble() {
    this.setState({
      activeBubbleId: this.state.activeBubbleId < 6 ? this.state.activeBubbleId + 1 : 1
    })
    this.setState({ 
      nextTrainTarget: (this.state.activeBubbleId + 1) <= 6 ? (this.state.activeBubbleId + 1) : 1
    })
    this.startTrainAnim();
  }

  render() {
    const bubbles = [{
      id: 1,
      year: 2011,
      text: "Gründervater Prof. Dr. Karl Klinge (Hochschule Mainz) Beratung der DB Netz AG über herstellerunabhängige Schnittstellen für Weichenheizungsanlagen"
    }, {
      id: 2,
      year: 2012,
      text: "Abstimmungen und Kooperation mit der Bahnindustrie zur Umsetzung einer Schnittstelle für Weichenheizungen und Umsetzung als Pilotprojekt in einem Reginalbereiches der DB Netz AG"
    }, {
      id: 3,
      year: 2013,
      text: "Erweiterung der Schnittstellen für Weichen und Bahnübergänge Prototyp einer Diagnoseplattform für die Instandhaltung der DB Netz AG (DIANA): Weichenantriebsdiagnose Bahnübergangsüberwachung Andere maschinentechnische Anlagen"
    }, {
      id: 4,
      year: 2015,
      text: "Anbindungen von 1000 Weichen an die Diagnoseplattform der DB Netz AG (DIANA) Die Diagnoseplattform für Weichenantriebe der DB Netz AG (DIANA) gewinnt den konzerninternen DB Award"
    }, {
      id: 5,
      year: 2016,
      text: "Nominierung zum DB-Lieferantenprädikat und Supplier Innovation Award 2016 Beginn des weltweit größten Rollouts für Antriebsdiagnose bei Weichen in einer Bahninfrastruktur (30k)"
    }, {
      id: 6,
      year: 2018,
      text: "Pilotierung von Diagnoseplattformen für Fahrzeuge bei DB Regio und DB Fernverkehr 100%tiges Tochterunternehmen der DB E&C"
    }];

    const team = [{
      id: 1,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }, {
      id: 2,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }, {
      id: 3,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }, {
      id: 4,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }, {
      id: 5,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }, {
      id: 6,
      img: avatarImg,
      name: "Jan Klemp",
      title: "Geschäftsführer",
      description: "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et accusam et justo duo dolores et ea rebum"
    }];

    return (
      <Layout title="Über uns">
        {/* ------ HERO BLOCK ------ */}
        <div className={aboutusStyles.heroBlock}>
          <div className={aboutusStyles.textContainer}>
            <span className="font-desktop-header-title">Firmengeschichte</span>
            <span className="font-desktop-header-text">
            Wir unterstützen mit unserem jungen Team seit der Gründung im Jahr 2011 eines der umweltfreundlichsten Verkehrsmittel mit modernster Technologie.
            </span>
          </div>
          <div className={aboutusStyles.visualizationContainer}>
            <div className={aboutusStyles.bubbleWrapper}>
              {bubbles.map((bubbleElem, i) => (
                <div 
                className={[aboutusStyles.bubbleContainer, bubbleElem.id === this.state.activeBubbleId ? aboutusStyles.activeDot : this.state.nextTrainTarget !== 1 && this.state.trainVisible && bubbleElem.id === this.state.nextTrainTarget ? aboutusStyles.blueDot : ""].join(" ")} 
                key={i} 
                onClick={() => { this.manuallySetActiveBubble(bubbleElem.id); }}>
                  <span className={bubbleElem.id === this.state.activeBubbleId ? "" : "noOpac"}>{bubbleElem.year}</span>
                </div>
              ))}
              <div className={aboutusStyles.lineContainer}>
                {[2,3,4,5,6].map((linePart, i) => (
                  <div className={[aboutusStyles.line, this.state.nextTrainTarget === linePart && this.state.trainVisible ? aboutusStyles.activeLine : ""].join(" ")} key={i}></div>
                ))}
              </div>
              <div className={
                [
                  aboutusStyles.imgContainer,
                  this.state.nextTrainTarget === 1 ? aboutusStyles.moveToTrainSpot1 :
                  this.state.nextTrainTarget === 2 ? aboutusStyles.moveToTrainSpot2 :
                  this.state.nextTrainTarget === 3 ? aboutusStyles.moveToTrainSpot3 :
                  this.state.nextTrainTarget === 4 ? aboutusStyles.moveToTrainSpot4 :
                  this.state.nextTrainTarget === 5 ? aboutusStyles.moveToTrainSpot5 :
                  this.state.nextTrainTarget === 6 ? aboutusStyles.moveToTrainSpot6 : "",
                  !this.state.trainVisible ? "deepHide" : ""
                ].join(" ")
              }>
                <img 
                  src={trainImg} 
                  alt=""
                  className={aboutusStyles.trainImg}
                  />
              </div>
            </div>
            <span className={[aboutusStyles.textContainer,
              this.state.activeBubbleId === 1 || this.state.activeBubbleId === 2 ? aboutusStyles.trainTextPosLeft :
              this.state.activeBubbleId === 3 || this.state.activeBubbleId === 4 ? aboutusStyles.trainTextPosCenter :
              this.state.activeBubbleId === 5 || this.state.activeBubbleId === 6 ? aboutusStyles.trainTextPosRight : ""].join(" ")
              }>
                {bubbles[this.state.activeBubbleId - 1].text}
              </span>
          </div>
        </div>
        {/* ------ INFO BLOCK ------ */}
        <div className={[aboutusStyles.infoBlock, "default-padding"].join(" ")}>
          <div className={aboutusStyles.infoContainer}>
            <div className={aboutusStyles.textContainer}>
              <span className="font-desktop-section-title">Wer wir sind</span>
              <span className="font-desktop-body-text">
                Seit 2018 sind wir ein 100-prozentiges Tochterunternehmen, operieren aber anbieter- und herstellerübergreifend. Wir sind der Think Tank für digitale Eisenbahntechnologie.
                Als junges, dynamisches Team brennen wir dafür, neue, innovative Wege zu finden und Technologien zu entwickeln, um die Eisenbahn-Infrastruktur in Deutschland, aber auch international nachhaltig zu verbessern.  Unser Team Spirit ist entscheidend, unsere Mitarbeiter sind unser höchstes Gut. Deshalb sind flexible Arbeitsmodelle, individuelle Förderung und Entwicklungsmöglichkeiten und eine familienfreundliche, offene Kultur für uns entscheidend.
                Wir kombinieren den Spirit und die Freiheiten eines dynamischen, agilen Technologie-Startups mit den Chancen und Entwicklungsmöglichkeiten, die ein großer Konzern bietet.
              </span>
            </div>
            <div className={aboutusStyles.imgContainer}>
              <img src={werwirsindImg} alt="" />
            </div>
          </div>
          <div className={aboutusStyles.infoContainer}>
            <div className={aboutusStyles.textContainer}>
              <span className="font-desktop-section-title">Was uns ausmacht</span>
              <span className="font-desktop-body-text">
                Wir stehen für Zielstrebigkeit, Innovation und dynamische Entwicklung. Offenheit ist uns wichtig. Für unsere Plattform, im Zusammenspiel mit Herstellern und Kunden – und auch zwischenmenschlich.
                Jeder Mitarbeiter ist wichtig – für das, was wir für unsere Kunden erreichen und auch als Mensch. Wir schaffen Entfaltungs- und Entwicklungsraum für jeden. Unsere eigenverantwortlich arbeitenden kleinen Teams arbeiten offen, respektvoll und aufgeschlossen miteinander und unseren Partnern. Unser Team vereint Mitarbeiter verschiedenster Kulturkreise mit unterschiedlichsten Hintergründen. Das prägt uns, das macht uns erfolgreich, darauf sind wir stolz.
                Natürlich gibt es bei uns Getränke, Kaffee, Kreativ- und Ruheräume, eine Tischtennisplatte, freies WLAN und freie Arbeitszeiteinteilung. Aber eben auch alle Entwicklungs- und Karrierechancen, wie sie in dynamischen Technologie-Unternehmen oder unter dem Dach eines erfolgreichen Großkonzerns möglich sind.
              </span>
            </div>
            <div className={aboutusStyles.imgContainer}>
              <img src={wasunsausmachtImg} alt="" />
            </div>
          </div>
        </div>
        <div className={[aboutusStyles.teamBlock, "default-padding"].join(" ")}>
          <div className={aboutusStyles.headlineContainer}>
            <span className="font-desktop-section-title">Das Team</span>
          </div>
          <div className={aboutusStyles.teamWrapper}>
            {team.map((teammember, i) => (
              <div className={aboutusStyles.teamContainer} key={i}>
                <img 
                  src={teammember.img} 
                  alt=""
                  className={aboutusStyles.imgContainer}
                />
                <div className={aboutusStyles.textContainer}>
                  <span className={aboutusStyles.avatarHeadline}>{teammember.name}</span>
                  <span>{teammember.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Layout>
    )
  }
}

export default aboutusPage
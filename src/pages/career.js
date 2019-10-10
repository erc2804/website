import React, {Component} from "react"
import { StaticQuery, graphql, Link } from "gatsby"
import Layout from "../components/layout"
// --- styles
import "../styles/global.scss"
import careerStyles from "../styles/career.module.scss"
// --- info images
import grundsaetzeImg from "../images/career/grundsaetze.png"
import missionImg from "../images/career/mission.png"
import offerImg from "../images/career/offer.png"
class careerPage extends Component {
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
    const bubbles = [{
      imgClass: careerStyles.projektmanagementImg,
      label: "Projektmanagement",
      eleStyles: {top: 14 + "%", right: "auto", bottom: "auto", left: 0, animationName: "rotator-right-min", animationDuration: 19 + "s", animationDelay: 0}
    }, {
      imgClass: careerStyles.designImg,
      label: "UX Design",
      eleStyles: {top: 70 + "%", right: "auto", bottom: "auto", left: 15 + "%", animationName: "rotator-left-min", animationDuration: 22 + "s"}
    }, {
      imgClass: careerStyles.consultingImg,
      label: "Consulting",
      eleStyles: {top: 53 + "%", right: "auto", bottom: "auto", left: 37 + "%", animationName: "rotator-left-max", animationDuration: 21 + "s"}
    }, {
      imgClass: careerStyles.developmentImg,
      label: "Development",
      eleStyles: {top: 75 + "%", right: 30 + "%", bottom: "auto", left: "auto", animationName: "rotator-right-max", animationDuration: 15 + "s"}
    }, {
      imgClass: careerStyles.supportImg,
      label: "Support",
      eleStyles: {top: 57 + "%", right: 14 + "%", bottom: "auto", left: "auto", animationName: "rotator-right-min", animationDuration: 17 + "s"}
    }, {
      imgClass: careerStyles.analyticsImg,
      label: "Analytics",
      eleStyles: {top: 14 + "%", right: 2 + "%", bottom: "auto", left: "auto", animationName: "rotator-left-min", animationDuration: 21 + "s"}
    }];
    
    return (
      <StaticQuery
        query={graphql`
          query {
            allMarkdownRemark {
              edges {
                node{
                  frontmatter {
                    title,
                    path
                  }
                }
              }
            }
          }
        `}
        render={markdownData => {
          const allJobsMeta = [];
          markdownData.allMarkdownRemark.edges.forEach((edge) => {
            if(edge.node.frontmatter.path !== "none") {
              allJobsMeta.push(edge.node.frontmatter);
            }
          });

          return (
            <Layout title="Karriere">
              {/* ------ HERO BLOCK ------ */}
              <div className={[careerStyles.heroBlock, "default-padding"].join(" ")}>
                <div className={careerStyles.textContainer}>
                  <span className="font-desktop-header-title">Join the Team</span>
                  <span className="font-desktop-header-text">Wir verbinden die Atmosphäre und den Spirit eines jungen, innovativen Unternehmens mit der Sicherheit, der Vertriebskraft und den Karrieremöglichkeiten eines großen Konzerns.</span>
                </div>
                <div className={careerStyles.visualizationContainer}>
                  {bubbles.map((bElem, i) => (
                    <div className={careerStyles.floatingBubble} key={i} style={bElem.eleStyles}>
                      <div className={[careerStyles.imgContainer, bElem.imgClass, "fullbackground"].join(" ")}></div>
                      <span className="font-desktop-body-title">{bElem.label}</span>
                    </div>
                  ))}
                </div>
              </div>
              {/* ------ INFO BLOCK ------ */}
              <div className={[careerStyles.infoBlock, "default-padding"].join(" ")}>
                <div className={careerStyles.infoContainer}>
                  <div className={careerStyles.textContainer}>
                    <span className="font-desktop-section-title">Unsere Grundsätze</span>
                    <span className="font-desktop-body-text">Der modulare Aufbau erlaubt die Anbindung verschiedenster Datenquellen, wie Geoinformations- oder Assetmanagement-Systeme, und die Integration unterschiedlicher Interpretationsalgorithmen. Zudem können für jede Nutzergruppe passgenaue Visualisierungen erstellt werden, die unser einheitliches und modernes Design intuitiv bedienbar macht.</span>
                  </div>
                  <div className={careerStyles.imgContainer}>
                    <img src={grundsaetzeImg} alt="" />
                  </div>
                </div>
                <div className={careerStyles.infoContainer}>
                  <div className={careerStyles.textContainer}>
                    <span className="font-desktop-section-title">Unsere Mission</span>
                    <span className="font-desktop-body-text">Der modulare Aufbau erlaubt die Anbindung verschiedenster Datenquellen, wie Geoinformations- oder Assetmanagement-Systeme, und die Integration unterschiedlicher Interpretationsalgorithmen. Zudem können für jede Nutzergruppe passgenaue Visualisierungen erstellt werden, die unser einheitliches und modernes Design intuitiv bedienbar macht.</span>
                  </div>
                  <div className={careerStyles.imgContainer}>
                    <img src={missionImg} alt="" />
                  </div>
                </div>
                <div className={careerStyles.infoContainer}>
                  <div className={careerStyles.textContainer}>
                    <span className="font-desktop-section-title">Was bieten wir</span>
                    <div>
                      <div>
                        <span className="font-desktop-body-title">World-class projects</span>
                        <span className="font-desktop-body-text">Projects that impact millions of customers. We love challenges.</span>
                      </div>                
                      <div>
                        <span className="font-desktop-body-title">Great Set up</span>
                        <span className="font-desktop-body-text">Anything you need to get the job done. ANYTHING!</span>
                      </div>                
                      <div>
                        <span className="font-desktop-body-title">Flexible Schedule</span>
                        <span className="font-desktop-body-text">We Focus on whats gets done, not how much you work on it.</span>
                      </div>
                    </div>
                  </div>
                  <div className={careerStyles.imgContainer}>
                    <img src={offerImg} alt="" />
                  </div>
                </div>
              </div>
              {/* ------ JOBS BLOCK ------ */}
              <div className={[careerStyles.jobsBlock, "default-padding"].join(" ")}>
                <div className={careerStyles.headlineContainer}>
                  <span className="font-desktop-section-title">Jobs</span>
                  <span className="font-desktop-body-text">Lust, unser Team zu bereichern?</span>
                  <span className="font-desktop-body-text">Aktuell suchen wir für den Standort Mainz</span>
                </div>
                <div className={careerStyles.jobListContainer}>
                  <ul className={careerStyles.jobList}>
                    {allJobsMeta.map((jobElem, i) => (
                      <li key={i}>
                        <Link to={jobElem.path}>{jobElem.title}</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Layout>
            )
          }
        }
      />
    )
  }
}

export default careerPage
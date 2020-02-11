import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import ImageGallery from "react-image-gallery"
// --- styles
import "../styles/globals.scss"
import travelStyles from "../styles/travel.module.scss"
import "react-image-gallery/styles/scss/image-gallery.scss";
// --- fontawesome icons
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"

library.add(faCalendarAlt, faChevronDown)
class TravelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedTravelPosts: [],
    }
    console.log("props: ", props)
  }

  countries = ["japan", "morocco", "czechia", "hungary", "spain"];
  travelResources = [
    {
      id: "japan-1",
      country: "Japan",
      city: "Tokyo",
      date: "January 2020",
      images: []
    },
    {
      id: "morocco-1",
      country: "Morocco",
      city: "Marrakech",
      date: "March 2019",
      images: []
    },
    {
      id: "czechia-1",
      country: "Czechia",
      city: "Prague",
      date: "January 2019",
      images: []
    },
    {
      id: "hungary-1",
      country: "Hungary",
      city: "Budapest",
      date: "January 2018",
      images: []
    },
    {
      id: "spain-1",
      country: "Spain",
      city: "Seville",
      date: "January 2017",
      images: []
    }
  ];

  componentWillMount() {
    this.setTravelResources()
    console.log("this.travelResources: ", this.travelResources)
  }

  setTravelResources() {
    this.props.data.allFile.edges.forEach((edge) => {
      if(edge.node.dir.indexOf("/japan/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "japan-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/morocco/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "morocco-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/czechia/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "czechia-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/hungary/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "hungary-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/spain/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "spain-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        } 
      }
    });
  }

  toggleTravelPostVisibility(postId) {
    if (postId) {
      const idxOfTravelPost = this.state.expandedTravelPosts.indexOf(postId)
      if (idxOfTravelPost !== -1) {
        let expandedTravelPostsTemp = this.state.expandedTravelPosts
        expandedTravelPostsTemp.splice(idxOfTravelPost)
        this.setState({
          expandedTravelPosts: expandedTravelPostsTemp,
        })
      } else {
        this.setState({
          expandedTravelPosts: [...this.state.expandedTravelPosts, postId],
        })
      }
    }
  }

  render() {
    return (
      <Layout title="Travel">
        <div className={`${travelStyles.travelPageWrapper} default-padding`}>
          <div className={`${travelStyles.headerTextContainer} font-header-4`}>
            Travel Blog
          </div>
          {this.travelResources.map((travelRes, i) => (
            <div
              className={`${travelStyles.travelPostContainer} ${
                this.state.expandedTravelPosts.length > 0 &&
                this.state.expandedTravelPosts.includes(travelRes.id)
                  ? travelStyles.postExpanded
                  : ""
              }`}
              key={i}
            >
              <button
                className={travelStyles.travelImgWrapper}
                onClick={() => this.toggleTravelPostVisibility(travelRes.id)}
              >
                <div
                  className={travelStyles.travelImgContainer}
                  style={{ backgroundImage: "url(" + travelRes.imageUrl + ")", backgroundPositionY: travelRes.horizontalImgPosInPercent + "%" }}
                ></div>
                <div className={travelStyles.travelImgOverlay}></div>
                <div
                  className={`${travelStyles.titleOverlay} font-header-4 text-color-light1`}
                >
                  {travelRes.city}&#44;&nbsp;{travelRes.country}
                </div>
                <div className={travelStyles.dateOverlay}>
                  <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                  <span>{travelRes.date}</span>
                </div>
                <div className={travelStyles.chevronOverlay}>
                  <FontAwesomeIcon icon={["fas", "chevron-down"]} />
                </div>
              </button>
              <div className={travelStyles.travelContentContainer}>
                <div className={`${travelStyles.headerContainer} font-bold`}>
                  <span className="font-header-4_5">{travelRes.city}&#44;&nbsp;{travelRes.country}</span>
                  <span className="font-body-1">{travelRes.date}</span>
                </div>
                <div className={travelStyles.galleryContainer}>
                  <ImageGallery items={travelRes.images} />
                </div>
                <div className={travelStyles.divider}></div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export const query = graphql`
query {
  allFile(
    filter: {
      extension: { regex: "/(jpg)|(jpeg)|(png)/" }
      sourceInstanceName: { eq: "imagesTravel" }
    }
  ) {
    edges {
      node {
        dir
        childImageSharp {
          fixed(width: 150, height: 150) {
            originalName
            ...GatsbyImageSharpFixed
          }
          fluid(maxWidth: 1920) {
            originalName
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
}
`;

export default TravelPage

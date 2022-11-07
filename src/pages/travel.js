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
// --- videos
import japVid1 from "../images/travel/japan/videos/video_1.mp4"
import japVid2 from "../images/travel/japan/videos/video_2.mp4"
import japVid3 from "../images/travel/japan/videos/video_3.mp4"

library.add(faCalendarAlt, faChevronDown)
class TravelPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedTravelPosts: [],
    }
  }

  countries = ["emirates", "japan", "morocco", "czechia", "hungary", "spain", "austria", "california"];
  travelResources = [
    {
      id: "california-1",
      country: "California",
      city: "",
      date: "September 2022",
      videos: [],
      images: [],
      preview: {
        imageIdx: 9,
        verticalImgPosInPercent: 40
      }
    },
    {
      id: "austria-1",
      country: "Austria",
      city: "Vienna",
      date: "April 2022",
      videos: [],
      images: [],
      preview: {
        imageIdx: 6,
        verticalImgPosInPercent: 50
      }
    },
    {
      id: "emirates-1",
      country: "United Arab Emirates",
      city: "Abu Dhabi",
      date: "Januar 2020",
      images: [],
      videos: [],
      preview: {
        imageIdx: 1,
        verticalImgPosInPercent: 25
      }
    },
    {
      id: "japan-1",
      country: "Japan",
      city: "Tokyo",
      date: "November 2018",
      images: [],
      videos: [japVid1, japVid2, japVid3],
      preview: {
        imageIdx: 1,
        verticalImgPosInPercent: 50
      }
    },
    {
      id: "morocco-1",
      country: "Morocco",
      city: "Marrakech",
      date: "August 2018",
      videos: [],
      images: [],
      preview: {
        imageIdx: 0,
        verticalImgPosInPercent: 40
      }
    },
    {
      id: "czechia-1",
      country: "Czechia",
      city: "Prague",
      date: "June 2018",
      videos: [],
      images: [],
      preview: {
        imageIdx: 0,
        verticalImgPosInPercent: 65
      }
    },
    {
      id: "hungary-1",
      country: "Hungary",
      city: "Budapest",
      date: "September 2018",
      videos: [],
      images: [],
      preview: {
        imageIdx: 0,
        verticalImgPosInPercent: 40
      }
    },
    {
      id: "spain-1",
      country: "Spain",
      city: "Seville",
      date: "August 2018",
      videos: [],
      images: [],
      preview: {
        imageIdx: 1,
        verticalImgPosInPercent: 30
      }
    }
  ];

  componentWillMount() {
    this.setTravelResources()
  }

  setTravelResources() {
    this.props.data.allFile.edges.forEach((edge) => {
      if(edge.node.dir.indexOf("/california/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "california-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/austria/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "austria-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/emirates/") !== -1) {
        const relIdx = this.travelResources.findIndex((o) => o.id === "emirates-1");
        if(relIdx !== -1) {
          this.travelResources[relIdx].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src});
        }
      } else if(edge.node.dir.indexOf("/japan/") !== -1) {
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
      <Layout 
        title="Travel"
        descriptionEn="The travel page of Ercan Cicek comprises photos of my previous travels."
        descriptionDe="Die Travel Seite von Ercan Cicek umfasst Fotos meiner letzten Reisen."
      >
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
                  style={{ backgroundImage: "url(" + travelRes.images[travelRes.preview.imageIdx].original + ")", backgroundPositionY: travelRes.preview.verticalImgPosInPercent + "%" }}
                ></div>
                <div className={travelStyles.travelImgOverlay}></div>
                <div
                  className={`${travelStyles.titleOverlay} font-header-4 text-color-light1`}
                >
                  {travelRes.city.length > 0 ? travelRes.city + ', ' : ''}{travelRes.country}
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

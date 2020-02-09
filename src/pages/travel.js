import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import ImageGallery from "react-image-gallery"
// --- styles
import "../styles/globals.scss"
import travelStyles from "../styles/travel.module.scss"
import "react-image-gallery/styles/scss/image-gallery.scss";
// --- images

class TravelPage extends Component {
  constructor(props) {
    super(props);
    
    console.log("props: ", props);
  }

  countries = ["japan", "morocco", "czechia", "hungary", "spain"];
  travelResources = {
    japan: {
      images: []
    },
    morocco: {
      images: []
    },
    czechia: {
      images: []
    },
    hungary: {
      images: []
    },
    spain: {
      images: []
    }
  };

  componentWillMount() {
    this.setTravelResources()
  }

  setTravelResources() {
    this.props.data.allFile.edges.forEach((edge) => {
      if(edge.node.dir.indexOf("/japan/") !== -1) {
        this.travelResources["japan"].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src})
      } else if(edge.node.dir.indexOf("/morocco/") !== -1) {
        this.travelResources["morocco"].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src})
      } else if(edge.node.dir.indexOf("/czechia/") !== -1) {
        this.travelResources["czechia"].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src})
      } else if(edge.node.dir.indexOf("/hungary/") !== -1) {
        this.travelResources["hungary"].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src})
      } else if(edge.node.dir.indexOf("/spain/") !== -1) {
        this.travelResources["spain"].images.push({original: edge.node.childImageSharp.fluid.src, thumbnail: edge.node.childImageSharp.fixed.src})
      }
    });
    console.log("this.travelResources: ", this.travelResources);
  }

  render() {
    return (
      <Layout title="Travel">
        Japan <br />
        <ImageGallery items={this.travelResources.japan.images} />
        <br />
        Morocco <br />
        <ImageGallery items={this.travelResources.morocco.images} />
        <br />
        Czechia <br />
        <ImageGallery items={this.travelResources.czechia.images} />
        <br />
        Hungary <br />
        <ImageGallery items={this.travelResources.hungary.images} />
        <br />
        Spain <br />
        <ImageGallery items={this.travelResources.spain.images} />
        <br />
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

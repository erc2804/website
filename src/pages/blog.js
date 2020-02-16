import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import queryString from 'query-string'
// --- fontawesome icons
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
// --- styles
import "../styles/globals.scss"
import blogStyles from "../styles/blog.module.scss"
import { createRef } from "react"

library.add(faCalendarAlt, faChevronDown)
class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedBlogPosts: [],
    }
    console.log("props: ", props)
    this.toggleBlogPostVisibility = this.toggleBlogPostVisibility.bind(this)
  }

  blogPosts = [];

  componentDidMount() {
    this.setBlogPosts();
    this.setStarterBlogId();
  }

  setBlogPosts() {
    this.props.data.allMarkdownRemark.edges.forEach((edge) => {
      this.blogPosts.push({
        id: edge.node.frontmatter.id,
        date: edge.node.frontmatter.date,
        title: edge.node.frontmatter.title,
        imageUrl: edge.node.frontmatter.imageUrl,
        verticalImgPosInPercent: edge.node.frontmatter.verticalImgPosInPercent,
        htmlContent: edge.node.html,
        ref: createRef()
      });
    });
  }
  
  setStarterBlogId() {
    const urlParams = queryString.parse(this.props.location.search);
    if(urlParams && urlParams.blogId) {
      const blogId = parseInt(urlParams.blogId);
      this.setState({ expandedBlogPosts: [blogId] })
      if(blogId > 0) {
        const foundBlogPostStarter = this.blogPosts.filter(blogPost => blogPost.id === blogId);
        if(foundBlogPostStarter[0]) {
          setTimeout(() => this.scrollToRef(foundBlogPostStarter[0].ref), 100);
        }
      }
    } else {
      this.setState({
        expandedBlogPosts: [this.blogPosts[0].id]
      })
    }
  }

  toggleBlogPostVisibility(postId) {
    if (postId) {
      const idxOfBlogPost = this.state.expandedBlogPosts.indexOf(postId)
      if (idxOfBlogPost !== -1) {
        let expandedBlogPostsTemp = this.state.expandedBlogPosts
        expandedBlogPostsTemp.splice(idxOfBlogPost)
        this.setState({
          expandedBlogPosts: expandedBlogPostsTemp,
        })
      } else {
        this.setState({
          expandedBlogPosts: [...this.state.expandedBlogPosts, postId],
        })
      }
    }
  }

  scrollToRef(ref) {
    if(ref.current !== null) {
      ref.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  }

  render() {
    return (
      <Layout title="Blog">
        <div className={`${blogStyles.blogPageWrapper} default-padding`}>
          <div className={`${blogStyles.headerTextContainer} font-header-4`}>
            Blog
          </div>
          {this.blogPosts.map((blogPost, i) => (
            <div
              className={`${blogStyles.blogPostContainer} ${
                this.state.expandedBlogPosts.length > 0 &&
                this.state.expandedBlogPosts.includes(blogPost.id)
                  ? blogStyles.postExpanded
                  : ""
              }`}
              key={i}
              ref={blogPost.ref}
            >
              <button
                className={blogStyles.blogImgWrapper}
                onClick={() => this.toggleBlogPostVisibility(blogPost.id)}
              >
                <div
                  className={blogStyles.blogImgContainer}
                  style={{ backgroundImage: "url(" + blogPost.imageUrl + ")", backgroundPositionY: blogPost.verticalImgPosInPercent + "%" }}
                ></div>
                <div className={blogStyles.blogImgOverlay}></div>
                <div
                  className={`${blogStyles.titleOverlay} font-header-4 text-color-light1`}
                >
                  {blogPost.title}
                </div>
                <div className={blogStyles.dateOverlay}>
                  <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                  <span>{blogPost.date}</span>
                </div>
                <div className={blogStyles.chevronOverlay}>
                  <FontAwesomeIcon icon={["fas", "chevron-down"]} />
                </div>
              </button>
              <div className={blogStyles.blogTextContainer}>
                <div className={`${blogStyles.headerContainer} font-bold`}>
                  <span className="font-header-4_5">{blogPost.title}</span>
                  <span className="font-body-1">{blogPost.date}</span>
                </div>
                <div
                  className={`${blogStyles.textContainer} font-body-1`}
                  dangerouslySetInnerHTML={{ __html: blogPost.htmlContent }}
                ></div>
                <div className={blogStyles.divider}></div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default BlogPage
export const pageQuery = graphql`
  query {
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___id] }) {
      edges {
        node {
          frontmatter {
            id
            date(formatString: "MMMM DD, YYYY")
            title
            imageUrl
            verticalImgPosInPercent
          }
          html
        }
      }
    }
  }
`

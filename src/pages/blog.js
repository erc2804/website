import React, { Component } from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// --- fontawesome icons
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
import { faChevronDown } from "@fortawesome/free-solid-svg-icons"
// --- styles
import "../styles/globals.scss"
import blogStyles from "../styles/blog.module.scss"

library.add(faCalendarAlt, faChevronDown)
class BlogPage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      expandedBlogPosts: [1],
    }
    console.log("props: ", props)
    this.toggleBlogPostVisibility = this.toggleBlogPostVisibility.bind(this)
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

  render() {
    let blogPosts = [];
    this.props.data.allMarkdownRemark.edges.forEach((edge) => {
      blogPosts.push({
        id: edge.node.frontmatter.id,
        date: edge.node.frontmatter.date,
        title: edge.node.frontmatter.title,
        imageUrl: edge.node.frontmatter.imageUrl,
        horizontalImgPosInPercent: edge.node.frontmatter.horizontalImgPosInPercent,
        htmlContent: edge.node.html
      });
    });

    return (
      <Layout title="Blog">
        <div className={`${blogStyles.blogPageWrapper} default-padding`}>
          <div className={`${blogStyles.headerTextContainer} font-header-4`}>
            Blog
          </div>
          {blogPosts.map((blogPost, i) => (
            <div
              className={`${blogStyles.blogPostContainer} ${
                this.state.expandedBlogPosts.length > 0 &&
                this.state.expandedBlogPosts.includes(blogPost.id)
                  ? blogStyles.postExpanded
                  : ""
              }`}
              key={i}
            >
              <button
                className={blogStyles.blogImgWrapper}
                onClick={() => this.toggleBlogPostVisibility(blogPost.id)}
              >
                <div
                  className={blogStyles.blogImgContainer}
                  style={{ backgroundImage: "url(" + blogPost.imageUrl + ")", backgroundPositionY: blogPost.horizontalImgPosInPercent + "%" }}
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
    allMarkdownRemark(sort: { order: DESC, fields: [frontmatter___date] }) {
      edges {
        node {
          frontmatter {
            id
            date(formatString: "MMMM DD, YYYY")
            title
            imageUrl
            horizontalImgPosInPercent
          }
          html
        }
      }
    }
  }
`

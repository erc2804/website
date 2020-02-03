import React, { Component } from "react"
import Layout from "../components/layout"
import { library } from "@fortawesome/fontawesome-svg-core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
// --- fontawesome icons
import { faCalendarAlt } from "@fortawesome/free-regular-svg-icons"
// --- styles
import "../styles/globals.scss"
import blogStyles from "../styles/blog.module.scss"

library.add(faCalendarAlt)
class BlogPage extends Component {
  render() {
    return (
      <Layout title="Blog">
        <div className={`${blogStyles.blogPageWrapper} default-padding`}>
          <div className={`${blogStyles.headerTextContainer} font-header-4`}>
            Blog
          </div>
          <div className={blogStyles.currentBlogPostContainer}>
            <div className={blogStyles.blogImgContainer}>
              <div>
                <FontAwesomeIcon
                  icon={["far", "calendar-alt"]}
                />
                <span>Featured - 15. Januar 2020</span>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    )
  }
}

export default BlogPage

import React, { Component } from "react"
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
  constructor() {
    super()
    this.state = {
      expandedBlogPosts: [1]
    }
    this.toggleBlogPostVisibility = this.toggleBlogPostVisibility.bind(this);
  }

  toggleBlogPostVisibility(postId) {
    if(postId) {
      const idxOfBlogPost = this.state.expandedBlogPosts.indexOf(postId);
      if(idxOfBlogPost !== -1) {
        let expandedBlogPostsTemp = this.state.expandedBlogPosts;
        expandedBlogPostsTemp.splice(idxOfBlogPost);
        this.setState({
          expandedBlogPosts: expandedBlogPostsTemp
        });
      } else {
        this.setState({
          expandedBlogPosts: [...this.state.expandedBlogPosts, postId]
        });
      }
    }
  }

  render() {
    const blogPosts = [{
      id: 1,
      date: "19. Januar 2020",
      title: "Beispieltitel",
      image: "https://images.unsplash.com/photo-1558981285-501cd9af9426?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
      takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est
      Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
      hendrerit in vulputate velit esse molestie consequat, vel illum
      dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit
      augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
      sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation
      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
      consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate velit esse molestie consequat, vel illum dolore eu
      feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis
      dolore te feugait nulla facilisi. Nam liber tempor cum soluta
      nobis eleifend option congue nihil imperdiet doming id quod
      mazim placerat facer possim assum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
      in hendrerit in vulputate velit esse molestie consequat, vel
      illum dolore eu feugiat nulla facilisis. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, At accusam aliquyam diam diam
      dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
      invidunt justo labore Stet clita ea et gubergren, kasd magna no
      rebum. sanctus sea sed takimata ut vero voluptua. est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat.`
    }, {
      id: 2,
      date: "5. Januar 2020",
      title: "Beispieltitel 2",
      image: "https://images.unsplash.com/photo-1580724294050-e10a1796d5ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
      takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est
      Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
      hendrerit in vulputate velit esse molestie consequat, vel illum
      dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit
      augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
      sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation
      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
      consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate velit esse molestie consequat, vel illum dolore eu
      feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis
      dolore te feugait nulla facilisi. Nam liber tempor cum soluta
      nobis eleifend option congue nihil imperdiet doming id quod
      mazim placerat facer possim assum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
      in hendrerit in vulputate velit esse molestie consequat, vel
      illum dolore eu feugiat nulla facilisis. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, At accusam aliquyam diam diam
      dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
      invidunt justo labore Stet clita ea et gubergren, kasd magna no
      rebum. sanctus sea sed takimata ut vero voluptua. est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat.`
    }, {
      id: 3,
      date: "1. Januar 2020",
      title: "Beispieltitel 3",
      image: "https://images.unsplash.com/photo-1580724294050-e10a1796d5ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
      takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est
      Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
      hendrerit in vulputate velit esse molestie consequat, vel illum
      dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit
      augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
      sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation
      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
      consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate velit esse molestie consequat, vel illum dolore eu
      feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis
      dolore te feugait nulla facilisi. Nam liber tempor cum soluta
      nobis eleifend option congue nihil imperdiet doming id quod
      mazim placerat facer possim assum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
      in hendrerit in vulputate velit esse molestie consequat, vel
      illum dolore eu feugiat nulla facilisis. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, At accusam aliquyam diam diam
      dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
      invidunt justo labore Stet clita ea et gubergren, kasd magna no
      rebum. sanctus sea sed takimata ut vero voluptua. est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat.`
    }, {
      id: 4,
      date: "31. Dezember 2019",
      title: "Beispieltitel 4",
      image: "https://images.unsplash.com/photo-1580724294050-e10a1796d5ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
      takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est
      Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
      hendrerit in vulputate velit esse molestie consequat, vel illum
      dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit
      augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
      sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation
      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
      consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate velit esse molestie consequat, vel illum dolore eu
      feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis
      dolore te feugait nulla facilisi. Nam liber tempor cum soluta
      nobis eleifend option congue nihil imperdiet doming id quod
      mazim placerat facer possim assum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
      in hendrerit in vulputate velit esse molestie consequat, vel
      illum dolore eu feugiat nulla facilisis. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, At accusam aliquyam diam diam
      dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
      invidunt justo labore Stet clita ea et gubergren, kasd magna no
      rebum. sanctus sea sed takimata ut vero voluptua. est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat.`
    }, {
      id: 5,
      date: "10. Januar 2019",
      title: "Beispieltitel 5",
      image: "https://images.unsplash.com/photo-1580724294050-e10a1796d5ce?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1352&q=80",
      text: `Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed
      diam nonumy eirmod tempor invidunt ut labore et dolore magna
      aliquyam erat, sed diam voluptua. At vero eos et accusam et
      justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea
      takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, sed diam nonumy eirmod tempor
      invidunt ut labore et dolore magna aliquyam erat, sed diam
      voluptua. At vero eos et accusam et justo duo dolores et ea
      rebum. Stet clita kasd gubergren, no sea takimata sanctus est
      Lorem ipsum dolor sit amet. Duis autem vel eum iriure dolor in
      hendrerit in vulputate velit esse molestie consequat, vel illum
      dolore eu feugiat nulla facilisis at vero eros et accumsan et
      iusto odio dignissim qui blandit praesent luptatum zzril delenit
      augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor
      sit amet, consectetuer adipiscing elit, sed diam nonummy nibh
      euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.
      Ut wisi enim ad minim veniam, quis nostrud exerci tation
      ullamcorper suscipit lobortis nisl ut aliquip ex ea commodo
      consequat. Duis autem vel eum iriure dolor in hendrerit in
      vulputate velit esse molestie consequat, vel illum dolore eu
      feugiat nulla facilisis at vero eros et accumsan et iusto odio
      dignissim qui blandit praesent luptatum zzril delenit augue duis
      dolore te feugait nulla facilisi. Nam liber tempor cum soluta
      nobis eleifend option congue nihil imperdiet doming id quod
      mazim placerat facer possim assum.
      <br />
      <br />
      Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed
      diam nonummy nibh euismod tincidunt ut laoreet dolore magna
      aliquam erat volutpat. Ut wisi enim ad minim veniam, quis
      nostrud exerci tation ullamcorper suscipit lobortis nisl ut
      aliquip ex ea commodo consequat. Duis autem vel eum iriure dolor
      in hendrerit in vulputate velit esse molestie consequat, vel
      illum dolore eu feugiat nulla facilisis. At vero eos et accusam
      et justo duo dolores et ea rebum. Stet clita kasd gubergren, no
      sea takimata sanctus est Lorem ipsum dolor sit amet. Lorem ipsum
      dolor sit amet, consetetur sadipscing elitr, sed diam nonumy
      eirmod tempor invidunt ut labore et dolore magna aliquyam erat,
      sed diam voluptua. At vero eos et accusam et justo duo dolores
      et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus
      est Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet,
      consetetur sadipscing elitr, At accusam aliquyam diam diam
      dolore dolores duo eirmod eos erat, et nonumy sed tempor et et
      invidunt justo labore Stet clita ea et gubergren, kasd magna no
      rebum. sanctus sea sed takimata ut vero voluptua. est Lorem
      ipsum dolor sit amet. Lorem ipsum dolor sit amet, consetetur
      sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
      labore et dolore magna aliquyam erat.`
    }];

    return (
      <Layout title="Blog">
        <div className={`${blogStyles.blogPageWrapper} default-padding`}>
          <div className={`${blogStyles.headerTextContainer} font-header-4`}>
            Blog
          </div>
          {blogPosts.map((blogPost, i) => (
            <div className={blogStyles.blogPostContainer} key={i}>
              <button 
                className={blogStyles.blogImgWrapper}
                onClick={() => this.toggleBlogPostVisibility(blogPost.id)}
              >
                <div 
                  className={blogStyles.blogImgContainer}
                  style={{backgroundImage: "url(" + blogPost.image + ")"}}
                ></div>
                <div className={blogStyles.blogImgOverlay}></div>
                <div className={`${blogStyles.titleOverlay} font-header-4 text-color-light1`}>{blogPost.title}</div>
                <div className={blogStyles.dateOverlay}>
                  <FontAwesomeIcon icon={["far", "calendar-alt"]} />
                  <span>{blogPost.date}</span>
                </div>
                <div className={blogStyles.chevronOverlay}>
                  <FontAwesomeIcon icon={["fas", "chevron-down"]} />
                </div>
              </button>
              <div className={`${blogStyles.blogTextContainer} ${this.state.expandedBlogPosts.length > 0 && this.state.expandedBlogPosts.includes(blogPost.id) ? blogStyles.postExpanded : ""}`}>
                <div className={`${blogStyles.headerContainer} font-header-4 font-bold`}>
                  {blogPost.title}
                </div>
                <div className={`${blogStyles.textContainer} font-body-1`}>
                  {blogPost.text}
                </div>
              </div>
            </div>
          ))}
        </div>
      </Layout>
    )
  }
}

export default BlogPage

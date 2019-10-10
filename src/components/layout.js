import React from "react"
import Header from "./header"
import Footer from "./footer"
import { Helmet } from "react-helmet"
// --- styles
import "../styles/global.scss"
import layoutStyles from "../styles/layout.module.scss"

const Layout = props => {
  return (
    <div className={layoutStyles.container}>
      <Helmet>
        <title>{props.title} - infraView GmbH</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <div className={layoutStyles.content}>
        <Header />
        {props.children}
      </div>
      <Footer />
    </div>
  )
}

export default Layout

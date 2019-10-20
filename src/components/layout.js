import React from "react"
import Header from "./header"
import { Helmet } from "react-helmet"
// --- styles
import "../styles/global.scss"
import layoutStyles from "../styles/layout.module.scss"

const Layout = props => {
  return (
    <div className={layoutStyles.layoutWrapper}>
      <Helmet>
        <title>{props.title} - ercancicek.de</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <div className={layoutStyles.layoutContentContainer}>
        <Header />
        {props.children}
      </div>
    </div>
  )
}

export default Layout

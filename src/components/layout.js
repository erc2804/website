import React from "react"
import Header from "./header"
import { Helmet } from "react-helmet"
// --- styles
import "../styles/globals.scss"
import layoutStyles from "../styles/layout.module.scss"

const Layout = props => {
  return (
    <div className={layoutStyles.masterWrapper}>
      <Helmet>
        <title>{props.title} - ercancicek.de</title>
        <meta charset="utf-8" />
        <meta name="keywords" lang="de" content="ercan cicek, ux, designer, entwickler, developer, webdesigner, webentwickler, frontend-developer, mainz, mobile app developer" />
        <meta name="description" lang="de" content="Ercan Cicek - UX-Developer, UX-Designer, Web-App-Developer, Webentwickler, Webdesigner in Mainz" />
        <meta name="author" content="Ercan Cicek" />
        <meta name="page-topic" lang="de" content="Dienstleistung, Person" />
        <meta name="robots" content="index,follow" />
        <meta name="revisit-after" content="30 days" />
        <meta name="audience" content="alle" />
        <meta name="expires" content="0" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0, user-scalable=no" />
        <meta http-equiv="imagetoolbar" content="false" />
      </Helmet>
      <div className={layoutStyles.masterContainer}>
        <Header mode={props.darkHeader ? 'dark' : ''}/>
        {props.children}
      </div>
    </div>
  )
}

export default Layout

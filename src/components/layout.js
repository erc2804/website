import React from "react"
import Header from "./header"
import { Helmet } from "react-helmet"
// --- styles
import "../styles/globals.scss"
import layoutStyles from "../styles/layout.module.scss"
// --- images
import ecLogo from "../images/logo_original.png"

const Layout = props => {
  return (
    <div className={layoutStyles.masterWrapper}>
      <Helmet>
        <title>{props.title}&nbsp;&#8211;&nbsp;ercancicek.com</title>
        <meta charset="utf-8" />
        <meta
          name="description"
          lang="de"
          content={props.descriptionDe || ""}
        />
        <meta
          name="description"
          lang="en"
          content={props.descriptionEn || ""}
        />
        <meta property="og:title" content={props.title + ' - ercancicek.com'} />
        <meta property="og:image" content={ecLogo} />
        <meta property="og:type" content="article" />
        <meta property="og:url" content="https://www.ercancicek.com/" />
        <meta property="og:site_name" content="ercancicek.com" />
        <meta lang="de" property="og:description" content={props.descriptionDe || ""} />
        <meta lang="en" property="og:description" content={props.descriptionEn || ""} />
        <meta lang="en" name="page-topic" content="Service, Person" />
        <meta lang="de" name="page-topic" content="Dienstleistung, Person" />
        <meta name="author" content="Ercan Cicek" />
        <meta name="robots" content="index,follow" />
        <meta name="revisit-after" content="7 days" />
        <meta name="audience" content="alle" />
        <meta name="expires" content="0" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
        <meta http-equiv="imagetoolbar" content="false" />
      </Helmet>
      <div className={layoutStyles.masterContainer}>
        <Header mode={props.darkHeader ? "dark" : ""} />
        {props.children}
      </div>
    </div>
  )
}

export default Layout

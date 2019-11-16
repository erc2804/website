import React from "react"
import Header from "./header"
import { Helmet } from "react-helmet"

const Layout = props => {
  return (
    <div>
      <Helmet>
        <title>{props.title} - ercancicek.de</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0, user-scalable=no"
        />
      </Helmet>
      <div>
        <Header />
        {props.children}
      </div>
    </div>
  )
}

export default Layout

import React, { Component } from "react"
import Layout from "../components/layout"
// --- styles
import "../styles/globals.scss"
import urlErrorStyles from "../styles/url-error-page.module.scss"

class UrlErrorPage extends Component {
    render() {
        return (
            <Layout
                title="404 - Page not found"
                descriptionEn="The page you are looking for is not available."
                descriptionDe="Die gesuchte Seite ist nicht verfügbar."
            >
                <div
                    className={`${urlErrorStyles.urlErrorPageWrapper} default-padding`}
                >
                    <div className={`${urlErrorStyles.headerTextContainer} font-header-4`}>
                        Page not found. Nav your way out :)
                    </div>
                </div>
            </Layout>
        )
    }
}

export default UrlErrorPage

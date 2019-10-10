import React from "react"
import { graphql, Link } from "gatsby"
import Layout from "../components/layout"
// --- styles
import "../styles/global.scss"
import jobTemplateStyles from "../styles/job-template.module.scss"

export default function Template({
  data, 
}) {
  const { theJob, theCompany } = data 
  return (
    <Layout title={theJob.frontmatter.title}>
      {/* ------ INFO BLOCK ------ */}
      <div className={[jobTemplateStyles.infoBlock, "default-padding"].join(" ")}>
        <div className={jobTemplateStyles.companyMarkdownHtmlContainer} dangerouslySetInnerHTML={{ __html: theCompany.html }}></div>
        <div className={jobTemplateStyles.jobMarkdownHtmlContainer} dangerouslySetInnerHTML={{ __html: theJob.html }}></div>
        <div className={jobTemplateStyles.backButtonContainer}>
          <Link className="font-desktop-footer-text" to="/career">Zurück zu allen Stellenangeboten</Link>
        </div>
      </div>
      <div className={[jobTemplateStyles.buttonContainer, "default-padding"].join(" ")}>
        <span className="font-desktop-body-text">Bewirb Dich jetzt per E-Mail an jobs@infraview.net oder klicke auf</span>
        <a className="default-button" href="mailto:jobs@infraview.net">
          <span className="font-desktop-cta-text">
            Jetzt bewerben
          </span>
        </a>
      </div>
    </Layout>
  )
}

export const pageQuery = graphql`
  query ($path: String!) {
    theJob: markdownRemark(frontmatter: {path: {eq: $path}}) {
      html
      frontmatter {
        path
        title
      }
    }
    theCompany: markdownRemark(frontmatter: {title: {eq: "company info"}}) {
      html,
      frontmatter {
        path
        title
      }
    }
  }
`
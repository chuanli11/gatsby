/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component } from "react"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"
import PageWithSidebar from "../components/page-with-sidebar"
import FooterLinks from "../components/shared/footer-links"
import Container from "../components/container"
// import EvaluationTable from "../components/features/evaluation-table"
// import LogoDictionary from "../components/features/logo-dictionary"
// import LegendTable from "../components/features/legend-table"
// import FeaturesFooter from "../components/features/features-footer"
// import Breadcrumb from "../components/docs-breadcrumb"

import { getModelsData } from "../utils/get-csv-models-data"

import { graphql } from "gatsby"

class ModelTemplate extends Component {
  render() {
    const {
      location,
      data,
    } = this.props
    const titleString = `${ this.props.pageContext.model }`

    return (
      <PageWithSidebar location={location}>
        <Helmet>
          <title>{titleString}</title>
        </Helmet>
        <Container>
          <main>
            <p>
              This is a Model page for { this.props.pageContext.model }
            </p>
          </main>
          <FooterLinks />
        </Container>
      </PageWithSidebar>
    )
  }
}

export default ModelTemplate

export const pageQuery = graphql`
  query {
    allGatsbyModelsSpecsCsv {
      nodes {
        name_model
        task
        desc
        paper_url
        year
        citation
      }
    }  
  }
`

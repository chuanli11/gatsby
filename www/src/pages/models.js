/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Container from "../components/container"
import FooterLinks from "../components/shared/footer-links"
import PageWithSidebar from "../components/page-with-sidebar"


class ModelsPage extends Component {
  render() {
    return (
      <PageWithSidebar location={this.props.location}>
        <Helmet>
          <title>Models</title>
          <meta
            name="description"
            content="Learn the training performance of a Deep Learning model across all GPUs."
          />
        </Helmet>
        <Container>
        <main>
            <p>
              This is the Model summary page
            </p>
          </main>          
          {/* <main id={`reach-skip-nav`}>
            <FeaturesHeader />
            <SimpleEvaluationTable
              title="Feature Comparison"
              headers={[
                { display: `Category`, nodeFieldProperty: `Category` },
                { display: `Gatsby`, nodeFieldProperty: `Gatsby` },
                {
                  display: `JAMstack frameworks`,
                  nodeFieldProperty: `Jamstack`,
                },
                { display: `Traditional CMS`, nodeFieldProperty: `Cms` },
              ]}
              data={this.props.data.allGatsbyFeaturesSpecsCsv.nodes}
            />
            <FeaturesFooter />
          </main> */}
          <FooterLinks />
        </Container>
      </PageWithSidebar>
    )
  }
}

export default ModelsPage

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

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Container from "../components/container"
import FooterLinks from "../components/shared/footer-links"
import PageWithSidebar from "../components/page-with-sidebar"


class GPUsPage extends Component {
  render() {
    return (
      <PageWithSidebar location={this.props.location}>
        <Helmet>
          <title>GPUs</title>
          <meta
            name="description"
            content="Learn how specific features like performance and support for modern technologies make Gatsby worth using."
          />
        </Helmet>
        <Container>
        <main>
            <p>
              This is the GPU summary page
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

export default GPUsPage

export const pageQuery = graphql`
  query {
    allGatsbyGpusSpecsCsv {
      nodes {
        name_gpu
        architecture
        base_clock
        cuda_core
        tensor_core
        mem_size
        mem_type
        mem_bandwidth
        mem_clock
        price
        tdp
        date
        production
        tflops16
        tflops32
        tflops64
        dollar_per_tflops32
        desc
      }
    }
  }
`

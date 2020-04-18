/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component } from "react"
import { graphql } from "gatsby"
import { Helmet } from "react-helmet"

import Container from "../components/container"
import FooterLinks from "../components/shared/footer-links"
import PageWithSidebar from "../components/page-with-sidebar"


class BenchmarksPage extends Component {
  render() {
    return (
      <PageWithSidebar location={this.props.location}>
        <Helmet>
          <title>Benchmarks</title>
          <meta
            name="description"
            content="Learn how the performance of different GPUs on Deep Learning training tasks."
          />
        </Helmet>
        <Container>
        <main>
            <p>
              This is the Benchmark summary page
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

export default BenchmarksPage

export const pageQuery = graphql`
  query {
    allPytorchBenchmarkThroughputFp32Csv {
      nodes {
        name_gpu
        ssd_FP32
        bert_base_squad_FP32
        bert_large_squad_FP32
        gnmt_FP32
        maskrcnn_FP32
        ncf_FP32
        resnet50_FP32
        tacotron2_FP32
        transformerxlbase_FP32
        transformerxllarge_FP32
        waveglow_FP32
      }
    }
    allPytorchBenchmarkThroughputFp16Csv {
      nodes {
        name_gpu
        ssd_AMP
        bert_base_squad_FP16
        bert_large_squad_FP16
        gnmt_FP16
        maskrcnn_FP16
        ncf_FP16
        resnet50_AMP
        resnet50_FP16
        tacotron2_FP16
        transformerxlbase_FP16
        transformerxllarge_FP16
        waveglow_FP16
      }
    }    
  }
`

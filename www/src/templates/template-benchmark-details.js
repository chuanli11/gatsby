/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component, createRef } from "react"
import { Helmet } from "react-helmet"
import { css } from "@emotion/core"
import PageWithSidebar from "../components/page-with-sidebar"
import FooterLinks from "../components/shared/footer-links"
import Container from "../components/container"

import { graphql } from "gatsby"

import { BenchmarkTable } from "../components/lambda-items.js"
import theme from '../theme/lambda-theme.js'
import Box from '@material-ui/core/Box';

const data_map = {
  throughputfp32: 'allPytorchBenchmarkThroughputFp32Csv',
  throughputfp16: 'allPytorchBenchmarkThroughputFp16Csv',
  batchsizefp32: 'allPytorchBenchmarkBsFp32Csv',
  batchsizefp16: 'allPytorchBenchmarkBsFp16Csv',
}

const init_columns_fp32 = [
  { title: '', field: 'name_gpu', headerStyle: {width: theme.layout.table.first_column.width, textAlign: theme.layout.table.first_column.textAlign, paddingRight: theme.layout.table.first_column.paddingRight}, cellStyle: {width: theme.layout.table.first_column.width, textAlign: theme.layout.table.first_column.textAlign, paddingRight: theme.layout.table.first_column.paddingRight}},
  { title: 'resnet50', field: 'resnet50_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'maskrcnn', field: 'maskrcnn_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'bert base ', field: 'bert_base_squad_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'ncf', field: 'ncf_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'tacotron2', field: 'tacotron2_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'ssd', field: 'ssd_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'transformerxl base', field: 'transformerxlbase_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'gnmt', field: 'gnmt_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'waveglow', field: 'waveglow_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'bert large ', field: 'bert_large_squad_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},
  { title: 'transformerxl large', field: 'transformerxllarge_FP32', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}}
  ]

const init_columns_fp16 = [
  { title: '', field: 'name_gpu', headerStyle: {width: theme.layout.table.first_column.width, textAlign: theme.layout.table.first_column.textAlign, paddingRight: theme.layout.table.first_column.paddingRight}, cellStyle: {width: theme.layout.table.first_column.width, textAlign: theme.layout.table.first_column.textAlign, paddingRight: theme.layout.table.first_column.paddingRight}},
  { title: 'resnet50', field: 'resnet50_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'maskrcnn', field: 'maskrcnn_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'bert base', field: 'bert_base_squad_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'ncf', field: 'ncf_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'tacotron2', field: 'tacotron2_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},        
  { title: 'ssd (AMP)', field: 'ssd_AMP', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'transformerxl base', field: 'transformerxlbase_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'gnmt', field: 'gnmt_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'waveglow', field: 'waveglow_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'bert large', field: 'bert_large_squad_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
  { title: 'transformerxl large', field: 'transformerxllarge_FP16', hidden: false, headerStyle:{minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}, cellStyle: {minWidth: theme.layout.table.column.min_width, maxWidth: theme.layout.table.column.max_width, margin: theme.layout.table.column.margin, padding: theme.layout.table.column.padding}},    
]

function update_columns_state_hidden(columns, offset){
  columns.forEach((item, index) => {
      if (index >= offset){
          item.hidden = true
      }
  })
  return columns
}


function update_table_status(selected_benchmark, offsetWidth){
  console.log( window.innerWidth )
  console.log( offsetWidth )
  var columns_update = selected_benchmark.includes('fp32') ? JSON.parse(JSON.stringify(init_columns_fp32)) : JSON.parse(JSON.stringify(init_columns_fp16))
  if (offsetWidth >= 1380){
      columns_update = update_columns_state_hidden(columns_update, 100)
  }
  else if(offsetWidth < 1380 && offsetWidth >= 1280){
      columns_update = update_columns_state_hidden(columns_update, 11)
  }    
  else if(offsetWidth < 1280 && offsetWidth >= 1180){
      columns_update = update_columns_state_hidden(columns_update, 10)
  }
  else if(offsetWidth < 1180 && offsetWidth >= 1080){
      columns_update = update_columns_state_hidden(columns_update, 9)
  }    
  else if(offsetWidth < 1080 && offsetWidth >= 980){
      columns_update = update_columns_state_hidden(columns_update, 8)
  }
  else if(offsetWidth < 980 && offsetWidth >= 880){
      columns_update = update_columns_state_hidden(columns_update, 7)      
  }    
  else if(offsetWidth < 880 && offsetWidth >= 780){
      columns_update = update_columns_state_hidden(columns_update, 6)      
  }
  else if(offsetWidth < 780 && offsetWidth >= 680){
      columns_update = update_columns_state_hidden(columns_update, 5)        
  }    
  else if(offsetWidth < 680 && offsetWidth >= 580){
      columns_update = update_columns_state_hidden(columns_update, 4)        
  }
  else if(offsetWidth < 580 && offsetWidth >= 380){
      columns_update = update_columns_state_hidden(columns_update, 3)        
  }
  else if(offsetWidth < 380){
      columns_update = update_columns_state_hidden(columns_update, 2)        
  }
  return columns_update

}


class BenchmarkTemplate extends Component {

  constructor(props){
    super(props);
    this.myContainer = createRef()
    this.state = {
        columns_fp32: init_columns_fp32,
        columns_fp16: init_columns_fp16
    }
  }

  
  updateDimensions = () => { 
    let columns_update = update_table_status(this.props.pageContext.benchmark, this.myContainer.current.offsetWidth)
    if (this.props.pageContext.benchmark.includes('fp32')){
        this.setState({ columns_fp32: columns_update })
    }
    else{
        this.setState({ columns_fp16: columns_update })            
    }
  } 


  componentDidMount = () => {
    this.updateDimensions()
    window.addEventListener("resize", this.updateDimensions);
  }

  componentWillUnmount = () => {
    window.removeEventListener("resize", this.updateDimensions);
  }

  render() {
    const {
      location,
      data,
    } = this.props
    const titleString = `${ this.props.pageContext.benchmark }`        
    const benchmark_data = this.props.data[data_map[this.props.pageContext.benchmark]].nodes

    return (

      <PageWithSidebar location={location}>
        <Helmet>
          <title>{titleString}</title>
        </Helmet>
        
            <Container>
              <main >
                  <div >
                    <Box border={1} height="90%" width="90%" my={0.1} ref={this.myContainer}>
                      <BenchmarkTable selected_benchmark={this.props.pageContext.benchmark} columns={ this.props.pageContext.benchmark.includes('fp32') ? this.state.columns_fp32 : this.state.columns_fp16 } data={benchmark_data}/>
                    </Box>
                  </div>
              </main>
              <FooterLinks />
            </Container>
       </PageWithSidebar>
    )
  }
}

export default BenchmarkTemplate

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
    allPytorchBenchmarkBsFp32Csv {
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
    allPytorchBenchmarkBsFp16Csv {
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

/** @jsx jsx */
import { jsx } from "theme-ui"
import { Component, createRef } from "react"
import { Helmet } from "react-helmet"
import PageWithSidebar from "../components/page-with-sidebar"
import FooterLinks from "../components/shared/footer-links"
import Container from "../components/container_wide"
// import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import { graphql } from "gatsby"

import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

import { GPUProfileCard, GPUChart, Example } from "../components/lambda-items"

import theme from '../theme/lambda-theme.js'

function normalizeData(data_fp16, data_fp32, key_norm) {
  const dataArray = data_fp16.filter((item)=> item.name_gpu === key_norm)
  const dataNorm = []
  for (var i = 0; i < data_fp16.length; i++){
      var fp32 = 0.0
      var fp16 = 0.0
      var count32 = 0.0
      var count16 = 0.0
      for (let key in data_fp16[i]) {
          if (key !== 'name_gpu'){
              fp16 = fp16 + data_fp16[i][key] / dataArray[0][key]
              count16 = count16 + 1.0
              
              for (let key32 in data_fp32[i]){
                  if (key.includes(key32.substring(0, key32.length - 5))){
                      fp32 = fp32 + data_fp32[i][key32] / dataArray[0][key]
                      count32 = count32 + 1.0
                  }
              } 

          }   
      }

      dataNorm.push(
          {
              'name_gpu': data_fp16[i].name_gpu,
              'data_fp32': (fp32 / count32).toFixed(2),
              'data_fp16': (fp16 / count16).toFixed(2)
          }
      )
  }

  return dataNorm;
}


class GPUTemplate extends Component {

  // constructor(props){
  //   super(props);
  //   this.myContainer = createRef()
  // }

  render() {
    const {
      location,
      data,
    } = this.props

    const titleString = `${ this.props.pageContext.gpu }`

    const dataArray = data.allGatsbyGpusSpecsCsv.nodes.filter((item)=> item.name_gpu === this.props.pageContext.gpu)[0]
    
    // console.log(dataArray)    
    console.log(this.props)

    const profile_processor = {
      'item_names': [ 'Architecture', 'Base Clock', 'CUDA Core', 'Tensor Core'],
      'item_values': [ dataArray['architecture'], dataArray['base_clock'], dataArray['cuda_core'], dataArray['tensor_core']],
    }

    const profile_memory = {
      'item_names': [ 'Memory Size', 'Memory Type', 'Memory Bandwidth', 'Clock Rate'],
      'item_values': [ dataArray['mem_size'], dataArray['mem_type'], dataArray['mem_bandwidth'], dataArray['mem_clock']],
    }

    const profile_purchase = {
      'item_names': [ 'Price', 'TDP', 'Release Date', 'Production'],
      'item_values': [ dataArray['price'], dataArray['tdp'], dataArray['date'], dataArray['production']],
    }

    const profile_performance = {
      'item_names': [ 'TFLOPS (Half)', 'TFLOPS (Single)', 'TFLOPS (Double)', '$ Per TFLOPS (Single)'],
      'item_values': [ dataArray['tflops16'], dataArray['tflops32'], dataArray['tflops64'], dataArray['dollar_per_tflops32']],
    }

    console.log( data.allPytorchBenchmarkThroughputFp16Csv.nodes )
    console.log( data.allPytorchBenchmarkThroughputFp32Csv.nodes )

    const normalized_throughput = normalizeData(
      data.allPytorchBenchmarkThroughputFp16Csv.nodes,
      data.allPytorchBenchmarkThroughputFp32Csv.nodes,
      theme.data.chart_gpu_normalizer)

    const normalized_batchsize = normalizeData(
      data.allPytorchBenchmarkBsFp16Csv.nodes,
      data.allPytorchBenchmarkBsFp32Csv.nodes,
      theme.data.chart_gpu_normalizer)

    return (

      <PageWithSidebar location={location}>
        <Helmet>
          <title>{titleString}</title>
        </Helmet>
        <Container>
        <main>
          <Grid container spacing={1} direction="row" justify="space-evenly" alignItems="center">
            <Grid item xs={12} sm={6} md={3}>
                <GPUProfileCard profile_name="Processor" item_names={ profile_processor.item_names } item_values={ profile_processor.item_values }/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <GPUProfileCard profile_name="Memory" item_names={ profile_memory.item_names } item_values={ profile_memory.item_values }/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <GPUProfileCard profile_name="Purchase" item_names={ profile_purchase.item_names } item_values={ profile_purchase.item_values }/>
            </Grid>
            <Grid item xs={12} sm={6} md={3}>
                <GPUProfileCard profile_name="Performance" item_names={ profile_performance.item_names } item_values={ profile_performance.item_values }/>  
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <Box border={1} height="450px" width="100%">
                <h3 align="center">Throughput w.r.t the best</h3>
                <GPUChart normalized_gpu_data={ normalized_throughput } selected_gpu={ this.props.pageContext.gpu } title="Throughput"/>
              </Box>              
            </Grid>
            <Grid item xs={12} sm={12} md={6}>
              <div> 
                <Box border={1} height="450px" width="90%">
                  <h3 align="center">Batch size w.r.t the best</h3>
                  <GPUChart normalized_gpu_data={ normalized_batchsize } selected_gpu={ this.props.pageContext.gpu } title="Batch Size"/>
                </Box>
              </div>
            </Grid>                                                             
          </Grid> 
          </main>
          <FooterLinks />
        </Container>
      </PageWithSidebar>
    )
  }
}

export default GPUTemplate

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

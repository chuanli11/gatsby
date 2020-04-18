const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result_gpus= await graphql(`
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
  `);

  if (result_gpus.errors) {
      reporter.panic('error loading gpu csv', result_gpus.errors);
    }

  const gpus = result_gpus.data.allGatsbyGpusSpecsCsv.nodes;

  const gpuPageTemplate = path.resolve(
    `src/templates/template-gpu-details.js`
  )

  gpus.forEach(c => {
    actions.createPage({
        path: '/gpus/' + c.name_gpu.toLowerCase().replace(/\s+/g, "-"),
        component: slash(gpuPageTemplate),
        context: {
            gpu: c.name_gpu,
        },
    });
  });
}

exports.onCreateNode = helpers => {}

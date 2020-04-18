const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const bechmarkPageTemplate = path.resolve(
    `src/templates/template-benchmark-details.js`
  )
  actions.createPage({
    path: '/benchmarks/throughput/fp32',
    component: slash(bechmarkPageTemplate),
    context: {
        benchmark: 'throughputfp32',
    },
  });
  actions.createPage({
    path: '/benchmarks/throughput/fp16',
    component: slash(bechmarkPageTemplate),
    context: {
        benchmark: 'throughputfp16',
    },
  });
  actions.createPage({
    path: '/benchmarks/batchsize/fp32',
    component: slash(bechmarkPageTemplate),
    context: {
        benchmark: 'batchsizefp32',
    },
  });
  actions.createPage({
    path: '/benchmarks/batchsize/fp16',
    component: slash(bechmarkPageTemplate),
    context: {
        benchmark: 'batchsizefp16',
    },
  });    
}

exports.onCreateNode = helpers => {}

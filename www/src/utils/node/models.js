const path = require(`path`)
const { slash } = require(`gatsby-core-utils`)

exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions

  const result_models= await graphql(`
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
  `);

  if (result_models.errors) {
      reporter.panic('error loading model csv', result_models.errors);
    }

  const models = result_models.data.allGatsbyModelsSpecsCsv.nodes;

  const modelPageTemplate = path.resolve(
    `src/templates/template-model-details.js`
  )

  models.forEach(c => {
    actions.createPage({
        path: '/models/' + c.name_model.toLowerCase().replace(/\s+/g, "-"),
        component: slash(modelPageTemplate),
        context: {
            model: c.name_model,
        },
    });
  });
}

exports.onCreateNode = helpers => {}

const { createFilePath } = require(`gatsby-source-filesystem`)
const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
  const fileNode = getNode(node.parent)
  const cat = node.frontmatter.category
  const slug = "/" + cat + createFilePath({ node, getNode })
  createNodeField({
    node,
    name: `slug`,
    value: slug,
    })
  }
}


exports.createPages = async ({ graphql, actions }) => {
  // **Note:** The graphql function call returns a Promise
  // see: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise for more info
  const { createPage } = actions
  const result = await graphql(`
    query {
      allMarkdownRemark {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
            }
          }
        }
      }
    }
  `)

  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    if(node.frontmatter.category === 'blog') {
    createPage({
      path: node.fields.slug,
      component: path.resolve(`./src/templates/blog-post.js`),
      context: {
        // Data passed to context is available
        // in page queries as GraphQL variables.
        slug: node.fields.slug,
      },
    })
    } else if(node.frontmatter.category === 'portfolio') {
      createPage({
        path: node.fields.slug,
        component: path.resolve(`./src/templates/portfolio-post.js`),
        context: {
          // Data passed to context is avaislable
          // in page queries as GraphQL variables.
          slug: node.fields.slug,
        },
      })
    }
  })
}
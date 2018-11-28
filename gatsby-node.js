const _ = require("lodash");
const path = require("path");
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require("gatsby-remark-relative-images");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return graphql(`
    query {
      allContentfulBlogPost(limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
      allContentfulTag(limit: 1000) {
        edges {
          node {
            slug
          }
        }
      }
    }
  `).then(result => {
    if (result.errors) {
      result.errors.forEach(e => console.error(e.toString()));
      return Promise.reject(result.error);
    }

    const blogPosts = result.data.allContentfulBlogPost.edges;
    blogPosts.forEach(edge => {
      const slug = edge.node.slug;
      createPage({
        path: slug,
        component: path.resolve("src/templates/blog-post.js"),
        context: {
          slug
        }
      });
    });

    const tags = result.data.allContentfulTag.edges;
    tags.forEach(edge => {
      const slug = edge.node.slug;
      createPage({
        path: `/tags/${slug}`,
        component: path.resolve("src/templates/tags.js"),
        context: {
          slug
        }
      });
    });
  });
};

// exports.createPages = ({ actions, graphql }) => {
//   const { createPage } = actions;
//
//   return graphql(`
//     {
//       allMarkdownRemark(limit: 1000) {
//         edges {
//           node {
//             id
//             fields {
//               slug
//             }
//             frontmatter {
//               title
//               tags
//               templateKey
//             }
//           }
//         }
//       }
//     }
//   `).then(result => {
//     if (result.errors) {
//       result.errors.forEach(e => console.error(e.toString()));
//       return Promise.reject(result.errors);
//     }
//
//     const posts = result.data.allMarkdownRemark.edges;
//
//     posts.forEach(edge => {
//       const id = edge.node.id;
//       let context = {
//         id
//       };
//       if (edge.node.frontmatter.templateKey === "author") {
//         context["name"] = edge.node.frontmatter.title;
//       }
//       createPage({
//         path: edge.node.fields.slug,
//         tags: edge.node.frontmatter.tags,
//         component: path.resolve(
//           `src/templates/${String(edge.node.frontmatter.templateKey)}.js`
//         ),
//         // additional data can be passed via context
//         context
//       });
//     });
//
//     // Tag pages:
//     let tags = [];
//     // Iterate through each post, putting all found tags into `tags`
//     posts.forEach(edge => {
//       if (_.get(edge, `node.frontmatter.tags`)) {
//         tags = tags.concat(edge.node.frontmatter.tags);
//       }
//     });
//     // Eliminate duplicate tags
//     tags = _.uniq(tags);
//
//     // Make tag pages
//     tags.forEach(tag => {
//       const tagPath = `/tags/${_.kebabCase(tag)}/`;
//
//       createPage({
//         path: tagPath,
//         component: path.resolve(`src/templates/tags.js`),
//         context: {
//           tag
//         }
//       });
//     });
//   });
// };

// exports.onCreateNode = ({ node, actions, getNode }) => {
//   const { createNodeField } = actions;
//   fmImagesToRelative(node); // convert image paths for gatsby images
//
//   if (node.internal.type === `MarkdownRemark`) {
//     const value = createFilePath({ node, getNode });
//     createNodeField({
//       name: `slug`,
//       node,
//       value
//     });
//   }
// };

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
      allContentfulAuthor(limit: 1000) {
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

    const authors = result.data.allContentfulAuthor.edges;
    authors.forEach(edge => {
      const slug = edge.node.slug;
      createPage({
        path: `/authors/${slug}`,
        component: path.resolve("src/templates/author.js"),
        context: {
          slug
        }
      });
    });
  });
};

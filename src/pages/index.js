import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allMarkdownRemark;

    return (
      <Layout>
        <section className="section">
          <div className="container">
            <div className="columns is-centered">
              <div className="column is-two-thirds">
                {posts.map(({ node: post }) => (
                  <div
                    className="box content"
                    style={{ padding: "2rem 3rem" }}
                    key={post.id}
                  >
                    <h1 className="title">
                      <Link
                        className="has-text-black-bis"
                        to={post.fields.slug}
                      >
                        {post.frontmatter.title}
                      </Link>
                    </h1>
                    <p>
                      <small>
                        Posted
                        {post.frontmatter.author != null &&
                          ` by ${post.frontmatter.author}`}
                        {` on ${post.frontmatter.date}`}
                      </small>
                    </p>
                    <p>
                      {post.excerpt}
                      <br />
                      <br />
                      <Link className="button" to={post.fields.slug}>
                        Keep Reading →
                      </Link>
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

IndexPage.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array
    })
  })
};

export const pageQuery = graphql`
  query IndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
    ) {
      edges {
        node {
          excerpt(pruneLength: 400)
          id
          fields {
            slug
          }
          frontmatter {
            title
            templateKey
            date(formatString: "MMMM DD, YYYY")
            author
          }
        }
      }
    }
  }
`;

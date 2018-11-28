import React from "react";
import PropTypes from "prop-types";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

export default class IndexPage extends React.Component {
  render() {
    const { data } = this.props;
    const { edges: posts } = data.allContentfulBlogPost;

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
                      <Link className="has-text-black-bis" to={post.slug}>
                        {post.title}
                      </Link>
                    </h1>
                    <p>
                      <small>
                        Posted
                        {` on ${post.createdAt}`}
                      </small>
                    </p>
                    <p>
                      {post.body.childMarkdownRemark.excerpt}
                      <br />
                      <br />
                      <Link className="button" to={post.slug}>
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

export const pageQuery = graphql`
  query IndexQuery {
    allContentfulBlogPost(limit: 1000) {
      edges {
        node {
          id
          title
          slug
          body {
            childMarkdownRemark {
              excerpt
            }
          }
          authors {
            name
            slug
            avatar {
              fluid {
                base64
              }
            }
          }
          createdAt(formatString: "MMMM DD, YYYY")
        }
      }
    }
  }
`;

import React from "react";
import Helmet from "react-helmet";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";

class TagRoute extends React.Component {
  render() {
    const { contentfulTag: tag } = this.props.data;
    const posts = tag.blog_post;
    const postLinks = posts.map(post => {
      return (<li key={post.id}>
        <Link to={post.slug}>
          <h2 className="is-size-2">{post.title}</h2>
        </Link>
      </li>);
    });
    const title = tag.name;
    const totalCount = posts.length;
    const tagHeader = `${totalCount} post${
      totalCount === 1 ? "" : "s"
    } tagged with “${tag.name}”`;

    return (
      <Layout>
        <section className="section">
          <Helmet title={`${tag.name} | ${title}`} />
          <div className="container content">
            <div className="columns">
              <div
                className="column is-10 is-offset-1"
                style={{ marginBottom: "6rem" }}
              >
                <h3 className="title is-size-4 is-bold-light">{tagHeader}</h3>
                <ul className="taglist">{postLinks}</ul>
                <p>
                  <Link to="/tags/">Browse all tags</Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </Layout>
    );
  }
}

export default TagRoute;

export const tagPageQuery = graphql`
  query TagQuery($slug: String!) {
    contentfulTag(slug: { eq: $slug }) {
      id
      name
      slug
      blog_post {
        id
        title
        slug
        createdAt(formatString: "MMMM DD, YYYY")
        authors {
          id
          name
          slug
          avatar {
            fluid {
              base64
            }
          }
        }
      }
    }
  }
`;

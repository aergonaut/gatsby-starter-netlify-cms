import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";

const AuthorPage = ({
  data: { markdownRemark: author, allMarkdownRemark: posts }
}) => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {author.frontmatter.title}
            </h1>
            <div className="columns">
              <div className="column is-one-fifth">
                <figure className="image is-128x128">
                  <img
                    src={author.frontmatter.avatar.childImageSharp.fixed.src}
                  />
                </figure>
              </div>
              <div className="column">
                <HTMLContent content={author.html} />
              </div>
            </div>
            <div className="content">
              <h2 className="subtitle">
                {`Posts by ${author.frontmatter.title}`}
              </h2>
              <ul className="taglist">
                {posts.edges.map(({ node: post }) => (
                  <li key={post.id}>
                    <Link to={post.fields.slug}>
                      <h3>{post.frontmatter.title}</h3>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  </Layout>
);

export default AuthorPage;

// export const pageQuery = graphql`
//   query AuthorPageQuery($id: String!, $name: String!) {
//     markdownRemark(id: { eq: $id }) {
//       id
//       html
//       frontmatter {
//         title
//         avatar {
//           childImageSharp {
//             fixed(width: 256) {
//               src
//             }
//           }
//         }
//       }
//     }
//     allMarkdownRemark(
//       limit: 1000
//       sort: { fields: [frontmatter___date], order: DESC }
//       filter: { frontmatter: { author: { eq: $name } } }
//     ) {
//       totalCount
//       edges {
//         node {
//           id
//           fields {
//             slug
//           }
//           frontmatter {
//             title
//           }
//         }
//       }
//     }
//   }
// `;

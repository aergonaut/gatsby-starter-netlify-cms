import React from "react";
import { Link, graphql } from "gatsby";
import Layout from "../components/Layout";
import { HTMLContent } from "../components/Content";

const AuthorPage = ({ data: { contentfulAuthor: author } }) => (
  <Layout>
    <section className="section">
      <div className="container">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {author.name}
            </h1>
            <div className="columns">
              <div className="column is-one-fifth">
                <figure className="image is-128x128">
                  <img src={author.avatar.fixed.src} />
                </figure>
              </div>
              <div className="column">
                <HTMLContent content={author.bio.childMarkdownRemark.html} />
              </div>
            </div>
            <div className="content">
              <h2 className="subtitle">{`Posts by ${author.name}`}</h2>
              <ul className="taglist">
                {author.blog_post.map(post => (
                  <li key={post.id}>
                    <Link to={post.slug}>
                      <h3>{post.title}</h3>
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

export const pageQuery = graphql`
  query AuthorQuery($slug: String!) {
    contentfulAuthor(slug: { eq: $slug }) {
      id
      name
      slug
      avatar {
        fixed(width: 200) {
          src
        }
      }
      bio {
        childMarkdownRemark {
          html
        }
      }
      blog_post {
        id
        title
        slug
      }
    }
  }
`;

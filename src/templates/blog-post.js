import React from "react";
import PropTypes from "prop-types";
import { kebabCase } from "lodash";
import Helmet from "react-helmet";
import { graphql, Link } from "gatsby";
import Layout from "../components/Layout";
import Content, { HTMLContent } from "../components/Content";

export const BlogPostTemplate = ({
  content,
  contentComponent,
  tags,
  title,
  authors,
  date,
  helmet
}) => {
  const PostContent = contentComponent || Content;

  return (
    <section className="section">
      {helmet || ""}
      <div className="container content">
        <div className="columns is-centered">
          <div className="column is-two-thirds">
            <h1 className="title is-size-2 has-text-weight-bold is-bold-light">
              {title}
            </h1>
            <p className="meta">
              Posted
              {` on ${date}`}
            </p>
            <PostContent content={content} />
            <div style={{ marginTop: "4rem" }}>
              {authors.map(author => (
                <div key={author.id} className="columns authorInfo">
                  <div className="column is-narrow">
                    <Link to={`/authors/${author.slug}`}>
                      <img
                        className="authorAvatar"
                        src={author.avatar.fixed.src}
                      />
                    </Link>
                  </div>
                  <div className="column has-text-weight-bold">
                    <Link to={`/authors/${author.slug}`}>{author.name}</Link>
                  </div>
                </div>
              ))}
            </div>
            {tags && tags.length ? (
              <div style={{ marginTop: `4rem` }}>
                <h4>Tags</h4>
                <ul className="taglist">
                  {tags.map(tag => (
                    <li key={tag.id}>
                      <Link to={`/tags/${tag.slug}/`}>{tag.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

const BlogPost = ({ data }) => {
  const { contentfulBlogPost: post } = data;

  return (
    <Layout>
      <BlogPostTemplate
        content={post.body.childMarkdownRemark.html}
        contentComponent={HTMLContent}
        helmet={
          <Helmet titleTemplate="%s | Blog">
            <title>{`${post.title}`}</title>
          </Helmet>
        }
        tags={post.tags}
        title={post.title}
        authors={post.authors}
        date={post.createdAt}
      />
    </Layout>
  );
};

export default BlogPost;

export const pageQuery = graphql`
  query BlogPostByID($slug: String!) {
    contentfulBlogPost(slug: { eq: $slug }) {
      title
      slug
      authors {
        id
        name
        slug
        avatar {
          fixed(width: 64) {
            src
          }
        }
      }
      tags {
        id
        name
        slug
      }
      body {
        childMarkdownRemark {
          html
        }
      }
      createdAt(formatString: "MMMM DD, YYYY")
    }
  }
`;

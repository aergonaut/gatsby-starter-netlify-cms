import React from 'react'
import { kebabCase } from 'lodash'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'
import Layout from '../../components/Layout'

const TagsPage = ({
  data: { allContentfulTag: tags },
}) => (
  <Layout>
    <section className="section">
      <Helmet title={`Tags`} />
      <div className="container content">
        <div className="columns">
          <div
            className="column is-10 is-offset-1"
            style={{ marginBottom: '6rem' }}
          >
            <h1 className="title is-size-2 is-bold-light">Tags</h1>
            <ul className="taglist">
              {tags.edges.map(tag => (
                <li key={tag.node.name}>
                  <Link to={`/tags/${kebabCase(tag.node.name)}/`}>
                    {tag.node.name} ({tag.node.blog_post.length})
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  </Layout>
)

export default TagsPage

export const tagPageQuery = graphql`
  query TagsQuery {
    allContentfulTag(limit: 1000) {
      edges {
        node {
          name
          blog_post {
            id
          }
        }
      }
    }
  }
`

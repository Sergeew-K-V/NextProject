import { NextPage } from 'next'
import Container from '../../components/Layouts/Container'
import { REQUEST_LIMIT } from '../../constants/constants'
import { URL_POSTS } from '../../constants/URLS'
import { PostPropType, PostType } from '../../types/PostTypes'

const Post: NextPage<PostPropType> = ({ posts }) => {
  return (
    <Container>
      <div>
        <h1>Posts Page</h1>
        <div>
          <ul>
            {posts.map((post: PostType) => (
              <li key={post.id}>
                <h4>{post.title}</h4> {post.body}
                <hr />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>
        {`
          h4 {
            text-transform: uppercase;
          }
        `}
      </style>
    </Container>
  )
}

export async function getStaticProps() {
  const res = await fetch(URL_POSTS + REQUEST_LIMIT)
  const posts: PostType[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}

export default Post

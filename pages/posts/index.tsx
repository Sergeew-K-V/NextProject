import { NextPage } from 'next'
import { URL_POSTS } from '../../contstans/URLS'
import { PostPropType, PostType } from '../../types/PostTypes'

const Post: NextPage<PostPropType> = ({ posts }) => {
  return (
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
  )
}

export async function getStaticProps() {
  const res = await fetch(URL_POSTS + '?_limit=5')
  const posts: PostType[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}

export default Post

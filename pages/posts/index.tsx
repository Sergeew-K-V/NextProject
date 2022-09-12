import { REQUEST_LIMIT } from '../../constants'
import { URL_POSTS } from '../../constants/URLS'
import { PostType } from '../../types/PostTypes'
import Post from './Post'

export default Post

export async function getStaticProps() {
  const res = await fetch(URL_POSTS + REQUEST_LIMIT)
  const posts: PostType[] = await res.json()
  return {
    props: {
      posts,
    },
  }
}

import { NextPage } from 'next'
import { URL_POSTS } from '../../contstans/URLS'
import IPostsProp from '../../interfaces/IPostsProp'
import PostParams from '../../types/PostParamType'
import PostType from '../../types/PostType'

const Post: NextPage<IPostsProp> = ({ post }) => {
  return (
    <div>
      <h2>{post.id}</h2>
      <h3>{post.title}</h3>
      <p>{post.body}</p>
    </div>
  )
}

export default Post

export async function getStaticPaths() {
  const res = await fetch(URL_POSTS)
  const posts: PostType[] = await res.json()

  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: PostParams) {
  console.log('params', params)
  const res = await fetch(`${URL_POSTS}/${params.id}`)
  console.log('res', res)
  const post = await res.json()
  console.log('post', post)

  return { props: { post } }
}

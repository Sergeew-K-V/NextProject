import { NextPage } from 'next'
import Container from '../../components/Layouts/Container'
import { URL_POSTS } from '../../constants/URLS'
import { PostParamsType, PostsPropType, PostType } from '../../types/PostTypes'

const Post: NextPage<PostsPropType> = ({ post }) => {
  return (
    <Container>
      <div>
        <h2>{post.id}</h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
        <style jsx>
          {`
            h3 {
              font-size: 2rem;
              text-transform: uppercase;
            }
            p {
              font-size: 1.5rem;
            }
          `}
        </style>
      </div>
    </Container>
  )
}

export async function getStaticPaths() {
  const res = await fetch(URL_POSTS)
  const posts: PostType[] = await res.json()
  const paths = posts.map((post) => ({
    params: { id: post.id.toString() },
  }))

  return { paths, fallback: false }
}

export async function getStaticProps({ params }: PostParamsType) {
  const correctParam = `/${params.id}`
  const res = await fetch(URL_POSTS + correctParam)
  const post = await res.json()

  return { props: { post } }
}

export default Post

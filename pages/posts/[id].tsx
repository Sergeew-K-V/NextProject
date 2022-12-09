import { NextPage } from "next"
import { useRouter } from "next/router"
import ContainerBig from "../../components/Layouts/ContainerBig"
import { URL_POSTS } from "../../constants/URLS"
import { GetParentPath } from "../../utils"
import { PostParamsType, PostsPropType, PostType } from "../../types/PostTypes"

const Post: NextPage<PostsPropType> = ({ post }) => {
  const router = useRouter()

  const onClickHandler = (): void => {
    const resultPath = GetParentPath(router.asPath, router.query.id?.toString())
    router.push(resultPath)
  }

  return (
    <ContainerBig>
      <div>
        <h2>
          <span>{post.id}</span>
        </h2>
        <h3>{post.title}</h3>
        <p>{post.body}</p>
      </div>
      <button onClick={onClickHandler}>Back to all posts</button>
      <style jsx>
        {`
          h2 {
            width: 36px;
            height: 36px;
            text-align: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border: 2px solid #000000;
            border-radius: 50%;
            margin: 1rem 0;
          }
          span {
            transform: translateY(-0.25rem);
          }
          h3 {
            font-size: 2rem;
            text-transform: uppercase;
            margin: 1rem 0;
          }
          p {
            font-size: 1.5rem;
          }
          button {
            cursor: pointer;
            height: 32px;
            text-transform: uppercase;
            background-color: #000000;
            color: #ffffff;
            border: 0;
          }
          @media screen and (max-width: 500px) {
            h3 {
              font-size: 1.5rem;
            }
          }
        `}
      </style>
    </ContainerBig>
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

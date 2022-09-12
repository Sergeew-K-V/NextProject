import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { ChangeEvent, useState } from 'react'
import ContainerBig from '../../components/Layouts/ContainerBig'
import { PostPropType, PostType } from '../../types/PostTypes'
import styles from '../../scss/Posts.module.scss'

const Post: NextPage<PostPropType> = ({ posts }) => {
  const [chosenPost, setChosenPost] = useState<number>(1)
  const router = useRouter()

  const onChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setChosenPost(Number(event.target.value))
  }

  const onClickHandler = (): void => {
    router.push(`${router.pathname}/${chosenPost}`)
  }

  return (
    <ContainerBig>
      <div>
        <h1>Posts Page</h1>
        <div>
          <div className={styles.controlPanel}>
            <span>To see post №</span>
            <input type='number' max={100} min={1} value={chosenPost} onChange={onChangeHandler} />
            <button onClick={onClickHandler}>Show me</button>
          </div>
          <ul>
            {posts !== undefined
              ? posts.map((post: PostType) => (
                  <li key={post.id}>
                    <h4>{post.title}</h4> {post.body}
                    <hr />
                  </li>
                ))
              : ''}
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
    </ContainerBig>
  )
}

export default Post

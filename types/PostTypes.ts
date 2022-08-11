export type PostType = {
  id: number
  userId: number
  title: string
  body: string
}

export type PostsPropType = {
  post: PostType
}

export type PostPropType = {
  posts: PostType[]
}

export type PostParamsType = {
  params: { id: number }
}

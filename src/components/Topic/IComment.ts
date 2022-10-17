export default interface IComment {
  id: number,
  content: string,
  createdAt: Date,
  likes: Array<boolean>,
  userId: number,
  avatar: string,
}

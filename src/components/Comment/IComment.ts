import ILike from './ILike';

export default interface IComment {
  id: number,
  content: string,
  createdAt: Date,
  likes: Array<ILike>,
  userId: number,
  avatar: string,
  topicId: number,
  parentId: number,
  comments: Array<IComment>,
}

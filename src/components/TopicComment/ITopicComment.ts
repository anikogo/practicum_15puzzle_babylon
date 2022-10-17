import ILike from './ILike';

export default interface ITopicComment {
  id: number,
  content: string,
  createdAt: Date,
  likes: Array<ILike>,
  userId: number,
  avatar: string,
}

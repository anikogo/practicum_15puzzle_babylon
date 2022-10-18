import IComment from '../Comment/IComment';

export default interface ITopic {
  id: number,
  title: string,
  category: string,
  content: string,
  createdAt: Date,
  created_by: string,
  comments: Array<IComment>,
  avatar: string,
}

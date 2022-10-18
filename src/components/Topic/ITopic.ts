import IComment from '../Comment/IComment';

export default interface ITopic {
  id: number,
  title: string,
  category: string,
  content: string,
  createdAt: string,
  created_by: string,
  comments: Array<IComment>,
  avatar: string,
}

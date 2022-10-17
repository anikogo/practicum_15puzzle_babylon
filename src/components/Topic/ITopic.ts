export default interface ITopic {
  id: number,
  title: string,
  category: string,
  content: string,
  createdAt: string,
  created_by: string,
  comments: any, // Array<Record<string, string | number>>,
  avatar: string,
}

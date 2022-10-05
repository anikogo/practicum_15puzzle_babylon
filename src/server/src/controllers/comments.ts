import { Request, Response, NextFunction } from 'express';

import Comment from '../models/Comment';

const addComment = (req: Request, res: Response, next: NextFunction) => Comment
  .create(req.body)
  .then((result: unknown) => {
    res.status(201).send(result);
  })
  .catch(next);

const getComments = (req: Request, res: Response, next: NextFunction) => Comment
  .findAll({ where: { topicId: req.params.id } })
  .then((comments: Array<Comment>) => res.send(comments))
  .catch(next);

const getComment = (req: Request, res: Response, next: NextFunction) => Comment
  .findAll({ where: { id: req.params.id } })
  .then((comments: Array<Comment>) => res.send(comments))
  .catch(next);

const editComment = (req: Request, res: Response, next: NextFunction) => Comment
  .findOne({
    where: { id: req.body.id },
  })
  .then((comment: Comment | null) => {
    if (comment) {
      // eslint-disable-next-line no-param-reassign
      comment = req.body as Comment;
    }
    res.send(comment);
  })
  .catch(next);

const deleteComment = (req: Request, res: Response, next: NextFunction) => Comment
  .destroy({ where: { id: req.params.id } })
  .then((result: unknown) => res.send(result))
  .catch(next);

export {
  addComment,
  getComment,
  getComments,
  editComment,
  deleteComment,
};

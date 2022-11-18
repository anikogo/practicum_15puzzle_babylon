import { Request, Response, NextFunction } from 'express';

import Comment from '../models/Comment';
import Like from '../models/Like';

const addComment = (req: Request, res: Response, next: NextFunction) => Comment
  .create(
    {
      content: req.body.content,
      userId: req.body.userId,
      parentId: req.body.parentId,
      topicId: req.body.topicId,
    },
    {
      include: [Like],
    },
  )
  .then((result: unknown) => {
    res.status(201).send(result);
  })
  .catch(next);

const getComment = (req: Request, res: Response, next: NextFunction) => Comment
  .findAll({
    where: { id: req.params.id },
    attributes: ['id', 'content', 'userId', 'parentId', 'topicId'],
    include: [Like],
  })
  .then((comments: Array<Comment>) => res.send(comments))
  .catch(next);

const editComment = (req: Request, res: Response, next: NextFunction) => Comment
  .update(
    {
      content: req.body.content,
    },
    {
      where: { id: req.body.id },
    },
  )
  .then(() => res.send(req.body))
  .catch(next);

const deleteComment = (req: Request, res: Response, next: NextFunction) => {
  Comment
    .findOne({ where: { id: req.params.id } })
    .then((comment: Comment | null) => {
      if (comment) {
        comment.destroy();

        return res.send({ message: 'comment was deleted' });
      }

      return res.status(404).send({ message: 'comment was not deleted' });
    })
    .catch(next);
};

export {
  addComment,
  getComment,
  editComment,
  deleteComment,
};

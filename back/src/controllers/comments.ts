const { Request, Response, NextFunction } = require('express');

import Comment from '../models/Comment';

export const addComment = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return res.send('addComment');
  // return PostCommentController
  //   .new(req.body)
  //   .then(result => {
  //     res.status(201).send(result);
  // });
};

export const getComments = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return Comment
    .findAll({ where: { topicId: req.params.id } })
    .then((result: Response) => {
      res.send(result);
    })
    .catch(next);
};

export const editComment = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return res.send('editComment');
};

export const deleteComment = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return Comment.destroy({ where: { id: req.params.id } })
    .then((result: Response) => {
      res.send(result);
    })
    .catch(next);
};

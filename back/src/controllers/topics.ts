export {};

const { Request, Response, NextFunction } = require('express');

import Topic from '../models/Topic';
import Comment from '../models/Comment';

module.exports.addTopic = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return Topic
    .create(req.body)
    .then((result: Response) => {
      res.status(201).send(result);
    })
    .catch(next);
};

module.exports.getTopics = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return Topic
    .findAll()
    .then((result: Response) => {
      res.send(result);
    })
    .catch(next);
};

module.exports.getTopic = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return Topic
    .findOne({ where: { id: req.params.id }, include: [Comment] })
    .then(
      (result: Response) => {
        res.send(result);
      }
    )
    .catch(next);
};

module.exports.updateTopic = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return res.send('updateTopic');
};

module.exports.deleteTopic = (
  req: typeof Request,
  res: typeof Response,
  next: typeof NextFunction,
) => {
  return res.send('deleteTopic');
  const topic = Topic
    .findOne({ where: { id: req.params.id } })
    .then(
      (result: Response) => {
        res.send(result);
        topic.destroy();
      }
    );

  // if (topic) {
  //   await topic.destroy();
  //   return res.send();
  // }

  // return res.status(404).send();
  // next(new NotFound())
};

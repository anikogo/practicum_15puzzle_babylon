import { Request, Response, NextFunction } from 'express';
import Topic from '../models/Topic';
import Comment from '../models/Comment';

const addTopic = (req: Request, res: Response, next: NextFunction) => {
  Topic
    .create(
      {
        title: req.body.title,
        description: req.body.description,
        created_by: 1,
      },
      {
        include: [Comment],
      },
    )
    .then((result: unknown) => {
      res.status(201).send(result);
    })
    .catch(next);
};

const getTopics = (_req: Request, res: Response, next: NextFunction) => Topic
  .findAll()
  .then((result: Array<Topic>) => {
    res.send(result);
  })
  .catch(next);

const getTopic = (req: Request, res: Response, next: NextFunction) => Topic
  .findOne({ where: { id: req.params.id }, include: [Comment] })
  .then((result: Topic | null) => {
    res.send(result);
  })
  .catch(next);

const editTopic = (req: Request, res: Response, next: NextFunction) => Topic
  .findOne({
    where: { id: req.body.id },
  })
  .then((topic: Topic | null) => {
    if (topic) {
      // eslint-disable-next-line no-param-reassign
      topic = req.body as Topic;
    }
    
    res.send(topic);
  })
  .catch(next);

const deleteTopic = (req: Request, res: Response, next: NextFunction) => {
  Topic
    .findOne({ where: { id: req.params.id } })
    .then((topic: Topic | null) => {
      if (topic) {
        topic.destroy();
        res.send({ message: 'topic was deleted' });
      }

      res.status(404).send({ message: 'topic was not deleted' });
    })
    .catch(next);
};

export {
  addTopic,
  getTopics,
  getTopic,
  editTopic,
  deleteTopic,
};

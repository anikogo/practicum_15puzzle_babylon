import { Request, Response, NextFunction } from 'express';
import Topic from '../models/Topic';
import Comment from '../models/Comment';

const addTopic = (req: Request, res: Response, next: NextFunction) => {
  Topic
    .create(
      {
        title: req.body.title,
        category: req.body.category,
        content: req.body.content,
        created_by: req.body.created_by,
      },
      {
        include: [Comment],
      },
    )
    .then((result: unknown) => res.status(201).send(result))
    .catch(next);
};

const getTopics = (_req: Request, res: Response, next: NextFunction) => Topic
  .findAll({
    attributes: ['id', 'title', 'category', 'content', 'created_by'],
    // include: [Comment],
  })
  .then((result: Array<Topic>) => res.send(result))
  .catch(next);

const getTopic = (req: Request, res: Response, next: NextFunction) => Topic
  .findOne({ where: { id: req.params.id }, include: [Comment] })
  .then((result: Topic | null) => res.send(result))
  .catch(next);

const editTopic = (req: Request, res: Response, next: NextFunction) => Topic
  .update(
    {
      title: req.body.title,
      category: req.body.category,
      content: req.body.content,
    },
    {
      where: { id: req.body.id },
    },
  )
  .then(() => res.send(req.body))
  .catch(next);

const deleteTopic = (req: Request, res: Response, next: NextFunction) => {
  Topic
    .findOne({ where: { id: req.params.id } })
    .then((topic: Topic | null) => {
      if (topic) {
        topic.destroy();

        return res.send({ message: 'topic was deleted' });
      }

      return res.status(404).send({ message: 'topic was not deleted' });
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

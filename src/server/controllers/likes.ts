import { Request, Response, NextFunction } from 'express';
import Like from '../models/Like';

const addLike = (req: Request, res: Response, next: NextFunction) => Like
  .create(
    {
      comment_id: req.body.comment_id,
      user_id: req.body.user_id,
    },
  )
  .then((result: unknown) => res.status(201).send(result))
  .catch(next);

const getLikes = (_req: Request, res: Response, next: NextFunction) => Like
  .findAll()
  .then((result: Array<Like>) => res.send(result))
  .catch(next);

const removeLike = (req: Request, res: Response, next: NextFunction) => Like
  .destroy({ where: { id: req.params.id } })
  .then(() => res.send({ message: 'like was deleted' }))
  .catch(next);

export { addLike, removeLike, getLikes };

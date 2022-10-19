import { Request, Response, NextFunction } from 'express';
import SiteTheme from '../models/SiteTheme';
import UserTheme from '../models/UserTheme';

const addTheme = (req: Request, res: Response, next: NextFunction) => SiteTheme
  .create({ ...req.body })
  .then((result: unknown) => res.status(201).send(result))
  .catch(next);

const updateTheme = (req: Request, res: Response, next: NextFunction) => UserTheme
  .update({ ...req.body }, { where: { id: req.body.id } })
  .then((result: unknown) => res.send(result))
  .catch(next);

const getTheme = (_req: Request, res: Response, next: NextFunction) => SiteTheme
  .findAll(
    {
      attributes: ['id', 'theme', 'description'],
    },
  )
  .then((result: Array<SiteTheme> | null) => res.send(result))
  .catch(next);

const deleteTheme = (req: Request, res: Response, next: NextFunction) => SiteTheme
  .destroy({ where: { id: req.params.id } })
  .then(() => res.send({ message: 'theme was deleted' }))
  .catch(next);

export {
  addTheme,
  updateTheme,
  getTheme,
  deleteTheme,
};

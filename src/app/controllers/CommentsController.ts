import { Request, Response } from 'express';
import { getRepository } from 'typeorm';

import Comments from '../models/Comments';

import CommentsView from '../../views/CommentsView';

export default class CommentsController {
  async store(req: Request, res: Response) {
    const { name, comment, colorIcon } = req.body;
    const { orphanage } = req.params;

    const data = {
      name,
      comment,
      orphanage,
      colorIcon,
    };

    const CommentsRepositoty = getRepository(Comments);

    const comments = CommentsRepositoty.create(data);

    await CommentsRepositoty.save(comments);

    return res.status(200).json(CommentsView.render(comments));
  }

  async show(req: Request, res: Response) {
    const { orphanage } = req.params;

    const CommentsRepository = getRepository(Comments);
    const comments = await CommentsRepository.find({ where: { orphanage } });
    return res.status(200).json(CommentsView.renderMany(comments));
  }
}

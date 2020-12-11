import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import * as Yup from 'yup';

import OrphanageView from '../../views/Orphanages_View';

import Orphanages from '../models/Orphanages';

export default class CreateOrphanages {
  async index(req: Request, res: Response) {
    const orphanagesRepository = getRepository(Orphanages);
    const orphanages = await orphanagesRepository.find({
      relations: ['images', 'comments'],
    });
    return res.status(200).json(OrphanageView.renderMany(orphanages));
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const orphanagesRepository = getRepository(Orphanages);
      const orphanage = await orphanagesRepository.findOneOrFail(id, {
        relations: ['images', 'comments'],
      });
      return res.status(200).json(OrphanageView.render(orphanage));
    } catch (err) {
      return res.status(404).json({ err: 'could not find the orphanage' });
    }
  }

  async store(req: Request, res: Response) {
    const {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends,
    } = req.body;

    const orphanagesRepository = getRepository(Orphanages);
    const requestImages = req.files as Express.Multer.File[];
    const images = requestImages.map((image) => ({ path: image.filename }));

    const data = {
      name,
      latitude,
      longitude,
      about,
      instructions,
      opening_hours,
      open_on_weekends: open_on_weekends === 'true',
      images,
    };

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      latitude: Yup.number().required(),
      longitude: Yup.number().required(),
      about: Yup.string().max(300).required(),
      instructions: Yup.string().required(),
      opening_hours: Yup.string().required(),
      open_on_weekends: Yup.boolean().required(),
      images: Yup.array(Yup.object().shape({
        path: Yup.string().required(),
      })),
    });

    await schema.validate(data);

    const orphanage = orphanagesRepository.create(data);

    await orphanagesRepository.save(orphanage);

    return res.status(201).json({ orphanage });
  }
}

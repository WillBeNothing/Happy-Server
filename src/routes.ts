import { Router } from 'express';
import multer from 'multer';

import CreateOrphanages from './app/controllers/OrphanagesController';
import Comments from './app/controllers/CommentsController';
import configUpload from './config/upload';

const routes = Router();
const upload = multer(configUpload);

routes.post('/orphanages', upload.array('images'), new CreateOrphanages().store);
routes.get('/orphanages', new CreateOrphanages().index);
routes.get('/orphanages/:id', new CreateOrphanages().show);
routes.post('/comments/:orphanage', new Comments().store);
routes.get('/comments/:orphanage', new Comments().show);

export default routes;

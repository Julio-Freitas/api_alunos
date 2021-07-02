import { Router } from 'express';
import FotoController from '../controllers/FotoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', loginRequired, FotoController.upload.bind(FotoController));

export default router;

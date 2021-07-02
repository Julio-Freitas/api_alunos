import { Router, Routes } from 'express';
import AlunoController from '../controllers/AlunoController';
const router = new Router();

router.get('/', AlunoController.index);
router.post('/', AlunoController.create);
router.put('/:id', AlunoController.updated);
router.get('/:id', AlunoController.show);
router.delete('/:id', AlunoController.delete);

export default router;

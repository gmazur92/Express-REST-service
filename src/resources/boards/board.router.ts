import { Router } from 'express';
import BoardController from './board.controller';

const router = Router();

router.get('/', BoardController.getAll);
router.get('/:id', BoardController.get);
router.post('/', BoardController.create);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.deleteById);

export default router;

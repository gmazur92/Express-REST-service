import { Router } from 'express';
import TaskController from './task.controller';

const router = Router({ mergeParams: true });

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.get);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.deleteById);

export default router;

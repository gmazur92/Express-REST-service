import { Router } from 'express';
import UserController from './user.controller';

const router = Router();

router.get('/', UserController.getAll);
router.get('/:id', UserController.get);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteById);

export default router;

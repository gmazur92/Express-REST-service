const router = require('express').Router();
const UserController = require('./user.controller');

router.get('/', UserController.getAll);
router.get('/:id', UserController.get);
router.post('/', UserController.create);
router.put('/:id', UserController.update);
router.delete('/:id', UserController.deleteById);

module.exports = router;

const router = require('express').Router({mergeParams: true});
const TaskController = require('./task.controller');

router.get('/', TaskController.getAll);
router.get('/:id', TaskController.get);
router.post('/', TaskController.create);
router.put('/:id', TaskController.update);
router.delete('/:id', TaskController.deleteById);

module.exports = router;

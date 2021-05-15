const router = require('express').Router({mergeParams: true});
const taskController = require('./task.controller')

router.get('/', taskController.getAll )
router.get('/:id', taskController.get )
router.post('/', taskController.create )
router.put('/:id', taskController.update )
router.delete('/:id', taskController.deleteById )

module.exports = router;

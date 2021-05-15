const router = require('express').Router();
const userController = require('./user.controller')

router.get('/', userController.getAll )
router.get('/:id', userController.get )
router.post('/', userController.create )
router.put('/:id', userController.update )
router.delete('/:id', userController.deleteById )

module.exports = router;

const router = require('express').Router();
const boardController = require('./board.controller')

router.get('/', boardController.getAll )
router.get('/:id', boardController.get )
router.post('/', boardController.create )
router.put('/:id', boardController.update )
router.delete('/:id', boardController.deleteById )

module.exports = router;

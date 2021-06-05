const router = require('express').Router();
const BoardController = require('./board.controller');

router.get('/', BoardController.getAll);
router.get('/:id', BoardController.get);
router.post('/', BoardController.create);
router.put('/:id', BoardController.update);
router.delete('/:id', BoardController.deleteById);

module.exports = router;

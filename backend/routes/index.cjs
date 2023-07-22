const router = require('express').Router();
const { getEntity, addEntity, removeEntity, updateEntity } = require('../controllers/index.cjs')

router.get('/', getEntity);
router.post('/', addEntity);
router.delete('/:entityId', removeEntity);
router.patch('/:entityId', updateEntity);

module.exports = router;
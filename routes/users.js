const express = require('express');
const router = express.Router();
const controller = require('../controllers/users');
const { checkPermission } = require('../acl');

/* GET users listing.
la jerarquia importa */
router.get('/',controller.list );
router.get('/:id', controller.index)
router.post('/', controller.create);
router.put('/:id', controller.replace);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router
const {Router} = require('express');
const RetirosController = require('../controllers/retiros');

const router = Router();

router.get('/',RetirosController.getAll);

router.get('/errores',RetirosController.movimientosConError);

router.post('/',RetirosController.create);

module.exports = router;
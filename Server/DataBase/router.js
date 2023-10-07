const router = require('express').Router();
const {Create,Read,SingleRead,Update,Delete}  = require('./Controller/Controller')

router.post('/cr',Create);
router.get('/rd',Read);
router.get('/get/:id',SingleRead);
router.patch('/get/up/:id',Update);
router.delete('/del/:id',Delete);

module.exports = router;
const router = require('express').Router();
const { Create, Read, SingleRead, Update, Delete, FindDatabase } = require('./Controller/Controller')

router.post('/cr', Create);
router.get('/readall', Read);
router.get('/get/:id', SingleRead);
router.get('/read/:uid', FindDatabase);
router.patch('/get/up/:id', Update);
router.delete('/del/:id', Delete);

module.exports = router;
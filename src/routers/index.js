const express =require('express');

const router = express.Router();

const v1routers = require('./v1');

const v2routers =require('./v2');

router.use('/v1',v1routers);

router.use('/v2',v2routers);

module.exports = router;
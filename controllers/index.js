const router = require('express').Router();
const apiRoute = require('./api/');
const homepageRoute = require('./homepageRoute.js');
const dashRoute = require('./dashRoute.js');

router.use('/', homepageRoute);
router.use('/dashboard', dashRoute);
router.use('/api', apiRoute);

module.exports = router;
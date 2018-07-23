var express = require('express');
var router = express.Router();

router.use('/gateActivity', require('./gateActivity'));
router.use('/gateImage', require('./gateImage'));

router.get('/', function (req, res) {
    res.send('Welcome to  Delvia Video Apis!');
});


module.exports = router;

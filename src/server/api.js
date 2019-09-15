const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => res.send('This is the e5vosfal API.'));

module.exports = router;

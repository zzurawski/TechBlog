
const router = require('express').Router();
const { Post } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, async (req, res) => {
  
});

router.put('/:id', withAuth, async (req, res) => {
  
});

router.delete('/:id', withAuth, async (req, res) => {

});

module.exports = router;
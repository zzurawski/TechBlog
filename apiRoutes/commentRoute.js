const router = require('express').Router();
const {Comment} = require('../../models/commentModel');
const withAuth = require('../../util/auth');

router.post('/', withAuth, async (req, res) => {
  try{
    const comment = await Comment.create(req.body);

    res.status(200).json(comment)
  } catch (err){
    res.status(500).json({message: 'Failed'})
  }
});

module.exports = router;
const router = require('express').Router();
const {Post} = require('../../models/postModel');
const withAuth = require('../../util/auth');

router.post('/', withAuth, async (req, res) => {
  try{
    const newPost = await Post.create({
        title: req.body.title,
        body: req.body.body,
    });

    res.status(200).json(newPost);
  } catch(err) {
    res.status(500).json(err)
  }
});

router.put('/:id', withAuth, async (req, res) => {
  
});

router.delete('/:id', withAuth, async (req, res) => {
    try{
        const post = await Post.destroy({
            where: {
                id: req.params.id,
            },
        });

        if (!post) {
            res.status(404).json({message: 'no post found'});
            return;
        }

        res.status(200).json(post)
    } catch(err) {
        res.status(500).json(err)
    }
});

module.exports = router;
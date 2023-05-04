const router = require('express').Router();
const { Post } = require('../models/');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const posts = postData.map((post) => post.get({ plain: true }));

    res.render('all-posts-admin', {
      layout: 'dashboard',
      posts,
    });
  } catch (err) {
    res.redirect('login');
  }
});

router.post('/new', withAuth, async (req, res) => {
  try {
    const newPostData = await Post.create({
      ...req.body,
      userId: req.session.userId,
    });

    res.status(200).json(newPostData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.get('/new', withAuth, (req, res) => {
  res.render('new-post', {
    layout: 'dashboard',
  });
});

router.get('/edit/:id', withAuth, async (req, res) => {
  try {
    const postData = await Post.findByPk(req.params.id);

    if (postData) {
      const post = postData.get({ plain: true });

      res.render('edit-post', {
        layout: 'dashboard',
        post,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect('login');
  }
});

router.put('/edit/:id', withAuth, async (req, res) => {
  try {
    const [numRowsAffected, updatedPostData] = await Post.update(req.body, {
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
      returning: true,
    });

    if (numRowsAffected === 0) {
      res.status(404).end();
    } else {
      res.status(200).json(updatedPostData[0]);
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete('/edit/:id', withAuth, async (req, res) => {
  try {
    const numRowsAffected = await Post.destroy({
      where: {
        id: req.params.id,
        userId: req.session.userId,
      },
    });

    if (numRowsAffected === 0) {
      res.status(404).end();
    } else {
      res.status(200).end();
    }
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;
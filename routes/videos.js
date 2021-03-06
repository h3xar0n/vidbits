const router = require('express').Router();
const Video = require('../models/video');

router.get('/', (req, res) => {
  res.redirect(301, '/videos')
})

router.get('/videos', async (req, res) => {
  const videos = await Video.find({});
  res.render('videos/index', { videos });
});

router.post('/videos', async (req, res) => {
  const {title, description, url} = req.body;
  const video = new Video({ title, description, url });
  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/create', { video, errors: video.errors });
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
});

router.get('/videos/create', (req, res) => {
  res.render('videos/create');
});

router.get('/videos/:id', async (req, res) => {
  const video = await Video.findById(req.params.id);

  res.render('videos/show', { video });
});

router.get('/videos/:id/edit', async (req, res) => {
  const video = await Video.findById(req.params.id);

  res.render('videos/edit', { video });
});

router.post('/videos/:id/update', async (req, res) => {
  const video = await Video.findByIdAndUpdate(req.params.id, req.body, {new: true});

  video.validateSync();

  if (video.errors) {
    res.status(400).render('videos/edit', {video});
  } else {
    await video.save();
    res.redirect(`/videos/${video._id}`);
  }
});

router.post('/videos/:id/delete', async (req, res) => {
  const video = await Video.findById(req.params.id);
  video.remove('/');

  res.redirect('/');
});

module.exports = router;

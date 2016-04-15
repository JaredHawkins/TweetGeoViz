import express from 'express';

import * as tweets from './tweets.js';

const router = express.Router();

router.get('/ping', (req, res) => res.json({ message: 'pong' }));

// Tweets /////////////////////////////////
router.get('/tweets', tweets.getTweets);
///////////////////////////////////////////

export default router;

const router = require('express').Router();

import Controller from './controllor';

router.post('/giftingList', Controller.newGiftingList);
router.post('/removeGifting', Controller.removeGifting);
router.get('/giftingList/:address', Controller.getListByUserAddress);

export default router;
import Controller from './controllor';

const router = require('express').Router();

router.post('/giftingList', Controller.newGiftingList);
router.post('/removeGifting', Controller.removeGifting);
router.get('/giftingList/:address', Controller.getListByUserAddress);
router.get('/giftingKittyList/:address', Controller.getKittyListByUserAddress);

export default router;
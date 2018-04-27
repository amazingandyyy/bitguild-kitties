const router = require('express').Router();
import controller from './controller';
import socket from './socket';

import level from 'level';
let db = level('gifting.db', { valueEncoding: 'json' })


router.get('/catList/:address', (req, res, next)=>{
  const { address } = req.params;
  controller.getKitties(address).then(list=>{
    console.log('cool');
    res.send(list)
  }).catch(next)
});
router.get('/giftingList/:address', (req, res, next)=>{
  const { address } = req.params;
  db.get(address, function(err, value) {
    res.send(JSON.parse(value));
  })
});
router.post('/giftingList', (req, res, next)=>{
  const data = req.body;
  const address = data.from;
  db.get(address, function(err, value) {
    if(value) value = JSON.parse(value);
    if(!value) value = [];
    if(value.filter(v=>v.kittenId==data.kittenId).length == 0) {
      delete data.from;
      data.status = 'Pending';
      value.push(data);
      console.log(value);
      db.put(address, JSON.stringify(value))
    }
  });
  res.send();
});


export default router;
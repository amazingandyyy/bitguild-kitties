const router = require('express').Router();
import level from 'level';

import controller from './controller';
import socket from './socket';

import kittycore from './utils/kittycore';
import web3 from './utils/web3';

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
    if(!value) value = JSON.stringify([]);
    value = JSON.parse(value);
    res.send(value);
    
    console.log('====>')
    
    // getting nothing
    // var subscription = web3.eth.subscribe('logs', {
    //     address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
    //     topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
    // }, function(error, result){
    //     if (!error) console.log(result);
    // })
    // .on("data", function(log){
    //     console.log(log);
    // })
    // .on("changed", function(log){
    // })
    // .on('error', console.error);

    // getting nothing
    // kittycore.events.Transfer()
    //   .on('data', function(event){
    //       console.log('data')
    //       console.log('data', event);
    //     })
    //     .on('changed', function(event){
    //       console.log('changed')
    //       console.log('changed',event);
    //   })
    //   .on('error', console.error);
    
      // works
    // kittycore.getPastEvents('Transfer', {
    //   filter: {
    //     from: address
    //   },
    //   fromBlock: 5517568,
    //   toBlock: 'latest',
    //   limit: 1
    // },(err,evts)=>{
    //   console.log(err,evts);
    // })

    // getting nothing
      // kittycore.events.Transfer({
      //   filter: {
      //     tokenId: indexList
      //   },
      //   fromBlock: 0
      // }).on('data', function(event){
      //     console.log('data',event);
      //   })
      //   .on('changed', function(event){
      //       console.log('changed',event);
      //   })
      //   .on('error', console.error);
  });
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
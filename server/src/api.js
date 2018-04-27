const router = require('express').Router();
import { getKitties } from './services';

router.get('/catList/:address', (req, res, next)=>{
  const { address } = req.params;
  getKitties(address).then(list=>{
    console.log('cool');
    res.send(list)
  }).catch(next)
});

export default router;
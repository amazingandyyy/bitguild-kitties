const router = require('express').Router();
import controller from './controller';

router.get('/catList/:address', (req, res, next)=>{
  const { address } = req.params;
  controller.getKitties(address).then(list=>{
    console.log('cool');
    res.send(list)
  }).catch(next)
});
export default router;
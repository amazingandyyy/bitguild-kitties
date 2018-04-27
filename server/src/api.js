const router = require('express').Router();
import controller from './controller';
import io from './index';

router.get('/catList/:address', (req, res, next)=>{
  const { address } = req.params;
  controller.getKitties(address).then(list=>{
    console.log('cool');
    res.send(list)
  }).catch(next)
});

router.get('/startSocket/:address', (req, res, next)=>{
  io.on('connection', function (socket) {
    socket.emit('news', { hello: 'world' });
    socket.on('my other event', function (data) {
        console.log(data);
    });
  });
});



export default router;
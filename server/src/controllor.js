import Transactions from './model';
import socket from './socket';
import kittycore from './utils/kittycore';

export default {
  newGiftingList: (req, res, next)=>{
    const data = req.body;
    const {from, to, kittenId, image, blockNumber} = data;
    Transactions.findOne({
      from, to, kittenId
    }).then(existing=>{
      if(existing) {
        existing.status = 'Pending';
        existing.blockNumber = blockNumber;
        return existing.save()
      }else{
        const newTransaction = new Transactions({
          from, to, kittenId, image,
          blockNumber: blockNumber,
          status: 'Pending'
        })
        return newTransaction.save()
      }
    })
    .then(saved => {
      return res.send(saved)
    })
    .catch(next);
  },
  getListByUserAddress: (req, res, next)=>{
    const { address } = req.params;
    Transactions.find({
      from: address
    }).then(result=>{
      res.send(result)
    })
    .catch(next);
  },
  removeGifting: (req, res, next)=>{
    const { from, to, kittenId} = req.body;
    Transactions.findOneAndRemove({
      from, to, kittenId
    }).then(result=>{
      res.send('deleted')
    })
    .catch(next);
  }
}



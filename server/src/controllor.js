import Transactions from './model';
import listener from './listener';

export default {
  newGiftingList: (req, res, next)=>{
    const data = req.body;
    const {from, to, kittenId, image, blockNumber, txHash} = data;
    Transactions.findOne({
      from, to, kittenId
    }).then(existing=>{
      if(existing) {
        existing.status = 'Pending';
        existing.blockNumber = blockNumber;
        return existing.save()
      }else{
        const newTransaction = new Transactions({
          from, to, kittenId, image, blockNumber,
          status: 'Pending',
          txHash
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
  getKittyListByUserAddress: (req, res, next)=>{
    const { address } = req.params;
    Transactions.find({
      from: address
    }).then(transactions=>{
      const result = transactions.map(r=>r.kittenId)
      res.send(result)
    })
    .catch(next);
  },
  removeGifting: (req, res, next)=>{
    const { from, to, kittenId } = req.body;
    Transactions.findOneAndRemove({
      from, to, kittenId
    }).then(result=>{
      res.send('deleted')
    })
    .catch(next);
  },
  giftingSocket: (sk, address) =>{
    Transactions.find({
      from: address
    }).sort({
      date:1
    }).then(result=>{
      sk.emit('CURRENT_TRANSACTION', result)
    }).catch(console.error)
    listener.registerSocket(sk,address);
  },
  getLatestGiftingBySocket: (sk, address) =>{
    Transactions.find({
      from: address
    }).then(result=>{
      sk.emit('CURRENT_TRANSACTION', result)
    }).catch(console.error)
  }
}



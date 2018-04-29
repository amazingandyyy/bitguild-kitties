import Transactions from './model';
import { start } from 'repl';
import socket from './socket';
import web3 from './utils/web3';

const filterwatch = web3.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  // from: 5518793-3000*10,
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
})

function decodeData(log){
  return {
    from: '0x'+log.data.slice(2+24,66).toString(16),
    to: '0x'+log.data.slice(66+24,130),
    kittenId: parseInt(log.data.slice(131+58,195), 16),
    transactionHash: log.transactionHash.toString()
  }
}

export default {
  byAddrWithSocket: (sk, addr) =>{
    filterwatch.watch(function(err,log){
      if(err)return console.error('Filter Watch Error: ',error);
      const { from, to, kittenId, transactionHash } = decodeData(log);
      if(from==addr){
        console.log('bingGo!!!')
        Transactions.findOneAndUpdate({
          from, to, kittenId
        },{
          $set:{
            status: 'Successful',
            transactionHash
          }
        },{
          new: true
        })
        .then(dbKitten=>{
          try{socket.emit('UPDATE_TRANSACTION', {to, kittenId, transactionHash})}catch(err){};
        }).catch(console.error)
      }else{
        console.log('>>> skipped this [Transaction] event of', from);
      }
    });  

  },
  start: () => {
    console.log('>>> Listening to cryptokitties...')
    filterwatch.watch(function(err,log){
      if(err){
        return console.error('Filter Watch Error: ',error);
      } else {
        const { from, to, kittenId } = decodeData(log);
        console.log('transaction', kittenId);
        
        try{
          console.log('UPDATE_TRANSACTION');
          socket.emit('UPDATE_TRANSACTION')
        }catch(err){};
          
        Transactions.findOneAndUpdate({
          from, to, kittenId
        },{
          $set:{ status: 'Successful' }
        },{
          new: true
        })
        .then(dbKitten=>{
          console.log(dbKitten);
          // if(!dbKitten) console.log('>>> skipped this [Transaction] event');
          console.log('UPDATE_TRANSACTION');
          try{socket.emit('UPDATE_TRANSACTION', kittenId)}catch(err){};

        }).catch(err=>{
          console.error('Removing Error: ',error);
        })
      }
    });  
  }
}
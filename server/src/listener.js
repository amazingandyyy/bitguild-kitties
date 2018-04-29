import Transactions from './model';
import web3 from './utils/web3';

const filterwatch = web3.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  from: web3.eth.blockNumber,
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
    // '0x0a5311bd2a6608f08a180df2ee7c5946819a649b204b554bb8e39825b2c50ad5', // Birth
  ] 
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
    try{sk.emit('UPDATE_TRANSACTION', 'start listening...')}catch(err){};
    filterwatch.watch(function(err,log){
      if(err)return console.error('Filter Watch Error: ',err);
      const { from, to, kittenId, transactionHash } = decodeData(log);
      const d = new Date;
      if(from==addr){
        // updating only when the addr match
        console.log('bingGo!!!')
        Transactions.findOneAndUpdate({
          txHash: transactionHash
        },{
          $set:{
            status: 'Successful',
            txHash: transactionHash
          }
        },{
          new: true
        })
        .then(dbKitten=>{
          try{sk.emit('UPDATE_RELAVANT_TRANSACTION', {to, kittenId, transactionHash})}catch(err){};
        }).catch(console.error)
      }else if (from!=='0x0000000000000000000000000000000000000000'){
        // console.log('\x1b[90m[ethereum]\t>>> skipped this [Transaction] event: \x1b[0m', transactionHash);
        try{sk.emit('UPDATE_TRANSACTION', {timestamp: d.toLocaleTimeString(), from, to, kittenId, transactionHash})}catch(err){};
      }
    });
  },
  start: () => {
    console.log('\x1b[32m>>> Listening to cryptokitties...\x1b[0m');
    filterwatch.watch(function(err,log){
      if(err)return console.error('Filter Watch Error: ',err);
      const { from, transactionHash } = decodeData(log);
      if(from!=='0x0000000000000000000000000000000000000000'){
        Transactions.findOne({ txHash: transactionHash })
        .then(kitten=>{
          if(!kitten){
            return console.log(`\x1b[90m>>> Skipped [Transaction] event: ${transactionHash} \x1b[0m`);
          }else{
            return Transactions.findOneAndUpdate({
              txHash: transactionHash
            },{
              $set:{
                status: 'Successful',
                txHash: transactionHash
              }
            },{
              new: true
            }).then(updated=>{
              console.log(`Updated!`, transactionHash);
            })
          }
        })
        .catch(console.error)
      }
    })
  }
}
import Transactions from './model';
import { socketList } from './socket';

import web3 from './web3';

const filterwatch = web3.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  topics: [
    '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef', // Transfer
  ] 
})

function decodeData(log){
  return {
    from: `0x${log.data.slice(2+24,66).toString(16)}`,
    transactionHash: log.transactionHash.toString()
  }
}

export default {
  registerSocket: (sk, addr) =>{
    socketList[addr.toLowerCase()] = sk;
  },
  start: () => {
    console.log('\x1b[32m>>> Listening to cryptokitties...\x1b[0m');
    filterwatch.watch(function(err,log){
      if(err)return console.error('Filter Watch Error: ', err.message);
      const { from, transactionHash } = decodeData(log);
      if(from!=='0x0000000000000000000000000000000000000000'){
        Transactions.findOne({ txHash: transactionHash })
        .then(kitten=>{
          if(!kitten) {
            console.log(`\x1b[90m>>> Skipped [Transaction] event: ${transactionHash} \x1b[0m`);
          }else{
            if(kitten.status=='Pending'){
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
                if(Object.keys(socketList).indexOf(updated.from.toLowerCase())>-1){
                  console.log(`\x1b[90m>>> Updated [Transaction] event: ${updated.transactionHash} \x1b[0m`);
                  socketList[from.toLowerCase()].emit('UPDATE_RELAVANT_TRANSACTION', updated.from);
                }
              })
            }
          }
          
        }).catch(console.error)
      }
    })
  }
}
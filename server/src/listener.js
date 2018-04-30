import Transactions from './model';
import web3 from './web3';
import { socketList } from './socket';

const filterwatch = web3.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
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
  registerSocket: (sk, addr) =>{
    socketList[addr.toUpperCase()] = sk;
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
                if(Object.keys(socketList).indexOf(from.toUpperCase())>-1){
                  socketList[from.toUpperCase()].emit('UPDATE_RELAVANT_TRANSACTION', from);
                }
              })
            }
          }
        })
        .catch(console.error)
      }
    })
  }
}
import Transactions from './model';
import { start } from 'repl';
import socket from './socket';
import web3 from './utils/web3';

const filterwatch = web3.eth.filter({
  address: '0x06012c8cf97BEaD5deAe237070F9587f8E7A266d',
  from: 5518793-3000*10,
  topics: ['0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef']
})

function decodeData(data){
  var result = {};
  result.from = '0x'+data.slice(2+24,66).toString(16);
  result.to = '0x'+data.slice(66+24,130);
  result.kittenId = parseInt(data.slice(131+58,195), 16);  
  return result
}

export default { 
  start: (sk) => {
    console.log('>>> Listening to cryptokitties...')
    filterwatch.watch(function(err,log){
      if(err){
        return console.error('Filter Watch Error: ',error);
      } else {
        const data = decodeData(log.data);
        const {from, to, kittenId} = data;
        Transactions.findOneAndUpdate({
          from, to, kittenId
        },{
          $set:{ status: 'Successful' }
        },{
          new: true
        })
        .then(updated=>{
          if(!updated) return console.log('>>> skipped this [Transaction] event');
          console.log(updated);
          if(sk){
            sk.emit('UPDATE_TRANSACTION')
          }
        }).catch(err=>{
          console.error('Removing Error: ',error);
        })
      }
    });  
  }
}
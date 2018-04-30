import React from 'react';
import Header from './header';
import { Card } from 'semantic-ui-react';
import Socket from '../utils/socket';
import web3 from '../utils/web3';
import {CircleLoader} from './loader';
import { etherBlockNumToFail } from '../config';

class Gifting extends React.Component {
  constructor() {
    super()
    this.state={
      list: [],
      currentBlockNumber: 0
    }
  }
  async componentDidMount() {
    const accounts = await web3.eth.getAccounts();
    const socket = new Socket();
    // use socket to fetch list
    socket.emit('LISTEN_TO_UPDATE_TRANSACTION', accounts[0])
    socket.on('CURRENT_TRANSACTION', data=>{
      // get current list
      this.setState({list: data})
    })
    socket.on('LISTEN_TO_TRANSACTION_HANDSHAKE', status=>{
      console.log(status)
    })
    socket.on('UPDATE_RELAVANT_TRANSACTION', addr=>{
      console.log(addr.toUpperCase(), accounts[0]);
      if(addr.toUpperCase()==accounts[0].toUpperCase()){
        // refetch list
        console.log('cool');
        socket.emit('GET_LATEST_TRANSACTION', accounts[0]); 
      }
    })
    web3.eth.getBlockNumber((err, currentBlockNumber)=>{
      if(err)return console.error(err);
      this.setState({currentBlockNumber})
    })
  }
  renderStatue(t){
    const status = t.status.toUpperCase();
    const blockNumber = t.blockNumber;
    if(status==='SUCCESSFUL'){
      return <div style={{'marginBottom': '20px'}} >SUCCESSFUL</div>;
    }
    if(this.state.currentBlockNumber-blockNumber > etherBlockNumToFail){
      return <div style={{'marginBottom': '20px'}} >FAILED</div>;
    }
    return <CircleLoader loaderstyle={{'width': '40px', 'height': '40px'}}/>
  }
  renderList(){
    let {list} = this.state;
    if(list&&list.length>0){
      return list.map(t=><Card className='item' fluid style={{'padding': '10px', 'textAlign': 'center'}} key={t.kittenId}>
          <img src={t.image} width={150} style={{'margin':'auto'}}/>
          <p>
            You <b><a href={`https://etherscan.io/tx/${t.txHash}`} target='_blank'>gifted</a></b> <b><a href={`https://www.cryptokitties.co/kitty/${t.kittenId}`} target='_blank'>{t.kittenId}</a></b> to <b><a href={`https://www.cryptokitties.co/profile/${t.to}`} target='_blank'>{t.to}</a></b>
          </p>
          {this.renderStatue(t)}
        </Card>)
    }else{
      return <div style={{'textAlign': 'center', 'marginTop': '50px'}}>
        <div>No Transactions</div>
      </div>
    }
  }
  render() {
    return <div className='gifting-component'>
      <Header/>
      <div className='gifting-list'> 
        {this.renderList()}
      </div>
    </div>
  }
}


export default Gifting;

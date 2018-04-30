import React from 'react';
import { Form, Input, Card } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DiamondLoader } from './loader';

import { 
  getCatList,
  newGifting,
  getGiftingList,
  removeGifting,
  getGiftingKittyList
} from '../redux';

import web3 from '../utils/web3';
import Header from './header';
import kittycore from '../utils/kittycore';

class Kitties extends React.Component {
  constructor() {
    super()
    this.state = {
      address: '',
      toAddress: {
        // 0:'0x811707c6303105736fc83bfeCe9E143a0F7D59DC', 1: '0xD9dDC0A50F94d38514e02c70bcF00835B3Ba3F71' // for testing
      }
    }
  }
  async componentDidMount(){
    const accounts = await web3.eth.getAccounts();
    if(!accounts || accounts.length < 1){
      window.alert('Oops! Unlock your metamask!')
    }
    this.setState({
      address: accounts[0]
    })
    this.props.getCatList(0,this.state.address);
    this.props.getGiftingKittyList(this.state.address);
  }
  onSearchSubmit (evt){
    evt.preventDefault();
      // API doesnt work
      // const list = await kittycore.methods.tokensOfOwner(address).call();
    this.props.getCatList(0,this.state.address);
  }
  async onSubmitGift (kittenId, image, i, evt) {
    evt.preventDefault();
    const toAddress = this.state.toAddress[i];
    const accounts = await web3.eth.getAccounts();
    if(!toAddress){
      // toAddress Cannot be empty
      window.alert('Who do you want to send to?') 
      return;
    }
    if(toAddress == accounts[0]){
      // Cannot Send to self
      window.alert('You Cannot Send to Yourself')
      return;
    }
    if(accounts[0] !== this.state.address) {
      // Metamask user does not match
      window.location.reload();
      return;
    }
    try {
      // start metamask
      web3.eth.getBlockNumber((err, blockNumber)=>{
        if(err)return console.error(err);
        kittycore.methods.transfer(toAddress, kittenId).send({
          from: accounts[0],
          gas: '1000000'
        },(err,txHash)=>{
          if(err)return console.error(err);
          if(txHash){
            // send transaction to server and create in mongoDB
            this.props.newGifting({
              from: accounts[0],
              to: toAddress,
              kittenId,
              image,
              blockNumber,
              txHash
            })
            this.context.router.history.push('/gifting')
          }
        }).catch(err=>{
          // if user reject the transaction then remove it in mongoDB
          this.props.removeGifting({
            from: accounts[0],
            to: toAddress,
            kittenId
          })
        })
      })
    } catch(err) {
      console.error(err)
    }
  }
  renderKitties(){
    const {giftingKittyList, kitties} = this.props;
    if(!kitties){
      return <div style={{'marginTop': '50px'}}>
        <DiamondLoader/>
      </div>
    }
    if(kitties.length==0){
      return <div style={{'textAlign': 'center', 'marginTop': '50px'}}>
        You have not kitties yet, <a href='https://www.cryptokitties.co/marketplace' target='_blank' rel='noopener noreferrer'>buy</a> one now!
      </div>
    }
    if(kitties){
      return kitties.map((k, i)=>{
        const isPending = (giftingKittyList.indexOf(k.id)!==-1);
        return <Card fluid key={k.id}>
        <div style={{'padding': '10px'}}>
          <a href={`https://www.cryptokitties.co/kitty/${k.id}`} target='_blank'>#{k.id}</a> - {k.color}
        </div>
        <img src={k.image_url_cdn} width={100} height={100}/>
        <Form onSubmit={this.onSubmitGift.bind(this, `${k.id}`, `${k.image_url_cdn}`, `${i}`)}>
          <Form.Field>
            <Input
              disabled={isPending}
              value={this.state.toAddress[i]||''}
              onChange={evt=>this.setState({ toAddress: {...this.state.toAddress,[`${i}`]:evt.target.value} })}
              action={isPending?'Sending':'Send the Gift'} placeholder='Receiver Address'
            />
          </Form.Field>
        </Form>
      </Card>
    });
    }
  }
  render() {
    return <div>
      <Header/>
      <Form onSubmit={this.onSearchSubmit.bind(this)}>
      <Form.Field>
        <label>Your Address</label>
        <Input
          value={this.state.address}
          onChange={evt=>this.setState({ address: evt.target.value })}
          action='Search' placeholder='Address'
        />
      </Form.Field>
    </Form>
      {this.renderKitties()}
      
    </div>
  }
}


Kitties.contextTypes = {
  router: PropTypes.object
}

function mapStateToProps({props}) {
  const { kitties, offset } = props.catList;
  return { 
    kitties,
    offset,
    giftingKittyList: props.giftingKittyList
  }
}

export default connect(mapStateToProps, {
  getCatList,
  newGifting,
  getGiftingList,
  removeGifting,
  getGiftingKittyList
})(Kitties);
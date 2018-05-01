import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
}

if(!web3 || !web3.eth){
  window.alert('You need to install metamask(https://metamask.io/)~')
}

export default web3;
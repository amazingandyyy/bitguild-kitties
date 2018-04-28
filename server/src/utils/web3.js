import Web3 from 'web3';

let web3;

if(typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
  web3 = new Web3(window.web3.currentProvider);
} else {
  const provider = new Web3.providers.HttpProvider(
    'http://alpha-test.token.store:8555/'
    // 'https://mainnet.infura.io/PgVZEzt3DB0RVs5xyKKw'
  )
  web3 = new Web3(provider);
}

export default web3;
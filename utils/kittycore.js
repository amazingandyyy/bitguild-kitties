import web3 from './web3';
import abi from './kittycore-abi';

const instance = new web3.eth.Contract(
  abi,
  '0x06012c8cf97bead5deae237070f9587f8e7a266d'
)

export {instance};
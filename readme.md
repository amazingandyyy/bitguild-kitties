
<div align="center">
  <img src='https://github.com/amazingandyyy/bitguild-kitties/blob/master/client/src/images/loading.gif?raw=true' width='100px'/>
</div>
<h1 align="center">
  gifting-kitties-dapp
</h1>
<p align="center">
A dashboard that you can gift your cryptokitties to your love.
</p>

## Installation

```command
$ git clone https://github.com/amazingandyyy/gifting-kitties-dapp.git

<!-- one session -->
$ cd server && npm i
$ npm run dev

<!-- another session -->
$ cd client && npm i
$ npm run dev
```

## 


## The task:

1. We need to create our own kitten browser that is taking a provided user address as input. With this address our browser should get the list of kitten tokens owned by this user (see tokensOfOwner method on a contract address below as a starting point) and show them as a simple list. This can be done via web3 interface connected to our node.
  - `tokensOfOwner` is broken 
  - use `https://api.cryptokitties.co/v2`

2. We want to implement a gifting feature for each kitten that would take another user address and call transfer(newUser, kittenId) on the kitties smart contract (address below). Install MetaMask plugin and update the code to a) prefill user address from it via connected web3 instance, b) sign gifting transaction using connected MetaMask account.
  - React Dapp
3. We need to track the progress of the gifting transaction sent and show transaction history for this account. For that we need to a) store all gifting transactions in a trivial db, have pending/successful/failed status, b) listen to blockchain events (using our node now) for those transactions in a background process, update status, c) when the status is updated, propagate the update to the UI.
  - use `mongoDB` as the trivial db in node
  - listening to event by downgrade to old web3
  - `websocket` to indicate the update of transactions

## Deployment

- Client App: https://amazingandyyy.com/gifting-kitties-dapp/
- Node Server: https://kitties-dapp.herokuapp.com/

## About listening
  
  - web3 watch
  - contract events
  - ehterscan API(https://etherscan.io/apis#transactions)

## Author

[Amazingandyyy](https://github.com/amazingandyyy)

## Resources

- KittyCore smart contract address: `0x06012c8cf97bead5deae237070f9587f8e7a266d`


## Standard

[![JavaScript Style Guide](https://cdn.rawgit.com/standard/standard/master/badge.svg)](https://github.com/standard/standard)

## License
MIT
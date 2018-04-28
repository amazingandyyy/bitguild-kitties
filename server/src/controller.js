import cheerio from 'cheerio';
import request from 'request';
import web3 from './utils/web3';
import kittycore from './utils/kittycore';

export default {
  getKitties: (address) => {
    const url = `https://www.cryptokitties.co/profile/${address.toString()}`;
    return new Promise((resolve, reject) => {
      request(url,
      (err, res, html) => {
          if(err|| !res || !html) return reject();
          let list = [];
          let $ = cheerio.load(html);
          console.log(html);
          return resolve({list});
      })
    })
  }
}
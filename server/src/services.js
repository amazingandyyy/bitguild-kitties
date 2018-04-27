import cheerio from 'cheerio';
import request from 'request';

export function getKitties(address) {
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

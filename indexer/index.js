'use strict';

let elastic = require('elasticsearch');
let data;

// sanity check, bail on bad data
try {
  data = require('/data/data.json');
} catch(err) {
  console.error('Err: ', err);
  return;
}


//create elastic client
let client = elastic.Client({
  host: 'ss_elastic:9000',
  log: 'trace'
});

// build a body array for indexing in bulk fashion
let bodyArr = [];
data.forEach((d) => {
  bodyArr.push({ index:  { _index: 'main', _type: 'repo' } });
  bodyArr.push(d);
  console.log('setting up index for: ', d.owner.handle, '/', d.name);
});

// do indexing
client.bulk({
  body: bodyArr
}, (err, resp) => {
  if(err){
    console.error(err);
  } else{
    console.log('BULK INDEXING SUCCESSFULL');
    //console.log(resp);
  }
});

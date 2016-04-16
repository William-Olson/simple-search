#!/bin/env node
'use strict';

let elastic = require('elasticsearch');
let bulkArr = [];
let data;




//------------

//wait ~5s for required containers
// to link port-services & volumes
//then do indexing of data.
setTimeout(() => {
  getData();
  indexData();
}, 5000);

//------------





// Loads data from the data container
function getData() {
  try {
    data = require('/data/data.json');
  } catch(err) {
    process.exit(-1);
  }
  // build a body array for indexing in bulk fashion
  data.forEach((d) => {
    console.log('BULK_INDEXING: ' + d.owner.handle + '/' + d.name);
    bulkArr.push({ index:  { _index: 'localdata', _type: 'repos' } });
    bulkArr.push(d);
  });

}

// Adds data to Elasticsearch.
function indexData() {
  //create elastic client
  let client = elastic.Client({
    host: 'ss_elastic:9200'
  });

  // do indexing
  client.bulk({
    body: bulkArr
  }, (err, resp) => {
    if(err){
      console.error('AN ERROR HAS OCCURRED\n', err);
      process.exit(-1);
    } else{
      console.log('BULK INDEXING SUCCESSFULL');
    }
  });
}

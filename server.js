const express = require('express');
const fs = require('fs');
const elasticlunr = require('elasticlunr');

const index = elasticlunr.Index.load(
  JSON.parse(fs.readFileSync('dataIndex.json', 'utf8'))
);

const app = express();

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/search', (req, res) => {
  console.log('searching with term: ', req.body.term);
  const results = index.search(req.body.term);
  res.send(results.map(match => index.documentStore.getDoc(match.ref)));
});

app.listen(3000, () => console.log('Listening on port 3000!'));
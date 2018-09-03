const fs = require('fs');
const LineByLineReader = require('line-by-line');
const elasticlunr = require('elasticlunr');

const fileName = 'dataIndex.json';

if (fs.existsSync(fileName)) {
    fs.unlinkSync(fileName);
}

const reader = new LineByLineReader('title.basics.tsv');

let index = elasticlunr(function () {
    this.setRef('tconst');
    this.addField('title');
});
let lineNumber = 0;

reader.on('error', function (err) {
    console.log(err);
});

reader.on('line', function (line) {
    if(line && lineNumber !== 0) {
        if (lineNumber % 500 === 0) {
            console.log('INDEXING LINE ', lineNumber);
        }
        const current = line.split('\t');
        index.addDoc({'tconst': current[0], 'title': current[3]});
    }
    lineNumber++;
});

reader.on('end', function () {
	console.log('WRITING INDEX.')
    fs.writeFileSync(fileName, JSON.stringify(index), 'utf8');
});

const fs = require('fs');
const csv = require('csv-parser');

exports.getKelpData = (req, res) => {
    const results = [];
    fs.createReadStream('./data/clean_kelp_each_year.csv')
      .pipe(csv())
      .on('data', (data) => results.push(data))
      .on('end', () => res.json(results));
};

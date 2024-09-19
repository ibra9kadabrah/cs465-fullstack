var fs = require('fs');
var path = require('path');

const filePath = path.join(__dirname, '..', '..', 'data', 'trips.json');
var trips = JSON.parse(fs.readFileSync(filePath, 'utf8'));

const travelList = (req, res) => {
    res.render('travel', { title: 'Travel Getaways', trips});
};

module.exports = {
    travelList
};
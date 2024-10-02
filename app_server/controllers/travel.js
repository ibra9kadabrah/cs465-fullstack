const tripsEndpoint = 'http://localhost:3000/api/trips';
const options = {
    method: 'GET',
    headers: {
        'Accept': 'application/json'
    }
};

const travelList = async (req, res) => {
    try {
        const response = await fetch(tripsEndpoint, options);
        const json = await response.json();
        // console.log(json);
        res.render('travel', { title: 'Travel Getaways', trips: json });
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports = {
    travelList
};
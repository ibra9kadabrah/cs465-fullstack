const mongoose = require('mongoose');
const Trip = mongoose.model('trips');

// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  try {
      const trips = await Trip.find({});
      res.status(200).json(trips);
  } catch (err) {
      res.status(500).json({ error: err.message });
  }
};


module.exports = {
    tripsList
};
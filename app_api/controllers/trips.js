// app_api/controllers/trips.js

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

// POST: /trips - Adds a new Trip
const tripsAddTrip = async (req, res) => {
  const newTrip = new Trip({
    code: req.body.code,
    name: req.body.name,
    length: req.body.length,
    start: req.body.start,
    resort: req.body.resort,
    perPerson: req.body.perPerson,
    image: req.body.image,
    description: req.body.description
  });

  try {
    const q = await newTrip.save();
    if (!q) {
      // Database returned no data
      return res.status(400).json({ error: 'Failed to add trip.' });
    } else { // Return new trip
      return res.status(201).json(q);
    }
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const tripsFindByCode = async (req, res) => {
  const tripCode = req.params.tripCode;

  try {
    const trip = await Trip.findOne({ code: tripCode });
    if (trip) {
      res.status(200).json(trip);
    } else {
      res.status(404).json({ message: 'Trip not found.' });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const tripsUpdateTrip = async (req, res) => {
    console.log(req.params);
    console.log(req.body);
    try {
      const q = await Trip.findOneAndUpdate(
        {'code': req.params.tripCode},
        {
          code: req.body.code,
          name: req.body.name,
          length: req.body.length,
          start: req.body.start,
          resort: req.body.resort,
          perPerson: req.body.perPerson,
          image: req.body.image,
          description: req.body.description
        },
        { new: true }  // This option returns the updated document
      ).exec();
  
      if (!q) {
        return res.status(404).json({ message: "Trip not found" });
      } else {
        return res.status(200).json(q);
      }
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: "Server error" });
    }
  };
  

module.exports = {
  tripsList,
  tripsAddTrip,
  tripsFindByCode,
  tripsUpdateTrip
};

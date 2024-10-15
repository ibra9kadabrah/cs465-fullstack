const mongoose = require('mongoose');
const Trip = mongoose.model('trips');
const User = mongoose.model('users');

const getUser = async (req, res, callback) => {
  if (req.payload && req.payload.email) {
    try {
      const user = await User.findOne({ email: req.payload.email });
      if (!user) {
        console.log('User not found');
        return res.status(404).json({ "message": "User not found" });
      }
      callback(req, res, user.name);
    } catch (err) {
      console.error('Error fetching user:', err);
      return res.status(500).json({ "message": "Internal server error" });
    }
  } else {
    console.log('No payload or email in request');
    return res.status(404).json({ "message": "User not found" });
  }
};



// GET: /trips - lists all the trips
const tripsList = async (req, res) => {
  try {
    const trips = await Trip.find({});
    res.status(200).json(trips);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


const tripsAddTrip = async (req, res) => {
  getUser(req, res, async (req, res, userName) => { 
    try {
      const trip = await Trip.create({
        code: req.body.code,
        name: req.body.name,
        length: req.body.length,
        start: req.body.start,
        resort: req.body.resort,
        perPerson: req.body.perPerson,
        image: req.body.image,
        description: req.body.description
      });
      console.log('Trip added successfully:', trip);
      return res.status(201).json(trip);
    } catch (err) {
      console.error('Add Trip error:', err);
      return res.status(400).json(err);
    }
  });
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
  await getUser(req, res, async (req, res, userName) => { // Make the callback async
    try {
      const trip = await Trip.findOneAndUpdate(
        { 'code': req.params.tripCode },
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
        { new: true }
      );

      if (!trip) {
        console.log('Trip not found with code:', req.params.tripCode);
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode
        });
      }

      console.log('Trip updated successfully:', trip);
      return res.status(200).json(trip);
    } catch (err) {
      console.error('Update Trip error:', err);
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "Trip not found with code " + req.params.tripCode
        });
      }
      return res.status(500).json({ "message": "Internal server error" });
    }
  });
};



module.exports = {
  tripsList,
  tripsAddTrip,
  tripsFindByCode,
  tripsUpdateTrip
};

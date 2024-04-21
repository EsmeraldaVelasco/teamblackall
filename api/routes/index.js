var express = require('express');
var router = express.Router();
const mongoose=require('mongoose');
require('models/Place');
const Place=mongoose.model('places');

/* GET home page. */
router.get('/', async function(req, res, next) {
  const filter={};
  const places= await Place.find();
  console.log(places)
  res.render('index', { title: 'Restaurants', places:places });
});

// Route to handle POST requests for searching restaurants by city
router.post('/search', async (req, res) => {
  try {
    const { city } = req.body;

    // Query the database for restaurants in the specified city
    const restaurants = await Place.find({ city });

    // Send the restaurant data as a response
    res.json(restaurants);
  } catch (error) {
    console.error('Error searching for restaurants:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


module.exports = router;

const express = require('express');
const router = express.Router();

const Claim = require('../models/Claim');

router.get('/test', (req, res) => {
  res.send('Claims route is working!');
});



// Get all claims
router.get('/', async (req, res) => {
  try {
    const claims = await Claim.find();
    res.json(claims);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Add a new claim
router.post('/', async (req, res) => {
  try {
    const newClaim = new Claim(req.body);
    const savedClaim = await newClaim.save();

    res.status(201).json(savedClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update claim status
router.put('/:id', async (req, res) => {
  try {
    const updatedClaim = await Claim.findOneAndUpdate(
      { id: req.params.id },
      { status: req.body.status },
      { new: true }
    );

    if (!updatedClaim) {
      return res.status(404).json({ message: 'Claim not found' });
    }

    res.json(updatedClaim);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});



module.exports = router;

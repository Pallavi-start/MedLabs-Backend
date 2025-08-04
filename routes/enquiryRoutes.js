const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

router.post('/', async (req, res) => {
  try {
    const newEntry = new Enquiry(req.body);
    await newEntry.save();
    res.status(201).send("Enquiry saved");
  } catch (err) {
    res.status(500).send("Error saving enquiry");
  }
});

module.exports = router;

// routes/submit.js
const express = require('express');
const router = express.Router();
const Admission = require('../models/Admission');
const nodemailer = require('nodemailer');

// Configure mail transporter
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'pshirbhate1999@gmail.com',
    pass: 'qhtx xwxw gmrd lttr' // App password
  }
});

// Handle form submission
router.post('/', async (req, res) => {
  const { name, email, phone, campus } = req.body;

  try {
    const admission = new Admission({ name, email, phone, campus });
    await admission.save();

    // Email to admin
    await transporter.sendMail({
      from: email,
      to: 'pshirbhate1999@gmail.com',
      subject: 'New Admission Form Submitted',
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCampus: ${campus}`
    });

    // Email to user
    await transporter.sendMail({
      from: 'pshirbhate1999@gmail.com',
      to: email,
      subject: 'Form Submission Received',
      text: `Hi ${name},\n\nThank you for submitting your form.\nWe will contact you soon.\n\n- Admissions Team`
    });

    res.status(200).json({ message: 'Form submitted and emails sent' });
  } catch (err) {
    console.error('❌ Error:', err.message);
    res.status(500).json({ message: 'Error submitting form' });
  }
});

module.exports = router;


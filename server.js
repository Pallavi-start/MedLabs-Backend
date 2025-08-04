// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const bodyParser = require('body-parser');
// const nodemailer = require('nodemailer');
// const enquiryRoutes = require('./routes/enquiryRoutes');
// const app = express();
// app.use(cors());
// app.use(bodyParser.json());

// mongoose.connect('mongodb://localhost:27017/admissions', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true 
// });


// mongoose.connection.once('open', () => {
//   console.log('✅ MongoDB connected');
// });

// app.use('/api/enquiry', enquiryRoutes);
// // Define schema
// const admissionSchema = new mongoose.Schema({
//   name: String,
//   email: String,
//   phone: String,
//   campus: String,
//   submittedAt: { type: Date, default: Date.now }
// });

// const Admission = mongoose.model('Admission', admissionSchema);

// // Email configuration
// const transporter = nodemailer.createTransport({
//   service: 'gmail',
//   auth: {
//     user: 'pshirbhate1999@gmail.com',      // Replace with your sender Gmail
//     pass: 'qhtx xwxw gmrd lttr'          // Use App Password (not your Gmail password)
//   }

// });

// // POST API
// app.post('/api/submit', async (req, res) => {
//   const { name, email, phone, campus } = req.body;

//   try {
//     // Save to MongoDB
//     const admission = new Admission({ name, email, phone, campus });
//     await admission.save();

//     // Send to author
//     await transporter.sendMail({
//       from: email,
//       to: 'pshirbhate1999@gmail.com',   // Replace with recipient
//       subject: 'New Admission Form Submitted',
//       text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nCampus: ${campus}`
//     });

//     // Send confirmation to user
//     await transporter.sendMail({
//       from: 'pshirbhate1999@gmail.com',
//       to: email,
//       subject: 'Form Submission Received',
//       text: `Hi ${name},\n\nThank you for submitting your form.\nWe will contact you soon.\n\n- Admissions Team`
//     });

//     res.status(200).send({ message: 'Form submitted and emails sent' });
//   } catch (err) {
//     console.error('❌ Error:', err);
//     res.status(500).send({ message: 'Error submitting form' });
//   }
// });

// app.listen(5000, () => {
//   console.log('🚀 Server running on http://localhost:5000');
// });


const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const enquiryRoutes = require('./routes/enquiryRoutes');
const submitRoutes = require('./routes/submit'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/admissions', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});
mongoose.connection.once('open', () => {
  console.log('✅ MongoDB connected');
});

// API Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/submit', submitRoutes); // ✅ Using the modular route

// Start server
app.listen(5000, () => {
  console.log('🚀 Server running on http://localhost:5000');
});

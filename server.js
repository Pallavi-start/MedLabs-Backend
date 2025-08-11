const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config(); // ✅ Load .env variables

const enquiryRoutes = require('./routes/enquiryRoutes');
const submitRoutes = require('./routes/submit'); 

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Use environment variable for DB connection
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/admissions';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err));

// API Routes
app.use('/api/enquiry', enquiryRoutes);
app.use('/api/submit', submitRoutes); // ✅ Using the modular route

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});


require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error('DB error', err));

const app = express();
app.use(cors());
app.use(express.json());
app.use('/api', routes);

app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
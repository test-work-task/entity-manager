const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const { PORT = 4000 } = process.env;
const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect('mongodb://0.0.0.0/entity', {
  useNewUrlParser: true,
});

app.use('/', require('./routes/index.cjs'));

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Порт: ${PORT}`);
});
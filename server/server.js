require('./config/config');
const { DB_URL } = require('./config/mongoDBConexion');

const express = require('express');
const mongoose = require('mongoose');

const app = express();

const bodyParser = require('body-parser');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuario'));

mongoose
  .connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(result => console.log('Base de datos ONLINE'))
  .catch(err => console.log(err));

app.listen(process.env.PORT, () => {
  console.log('Escuchando puerto: ', process.env.PORT);
});

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

app.get('/usuario', function (req, res) {
  res.json('get Usuario');
});

app.post('/usuario', function (req, res) {
  const persona = req.body;

  if (persona.nombre === undefined) {
    res.status(400).json({
      ok: false,
      mensaje: 'El nombre es necesario',
    });
  } else {
    res.json({ persona });
  }
});

app.put('/usuario/:id', function (req, res) {
  const id = req.params.id;
  res.json({
    id,
  });
});

app.delete('/usuario', function (req, res) {
  res.json('delete Usuario');
});

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

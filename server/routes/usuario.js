const express = require('express');

const app = express();

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

module.exports = app;

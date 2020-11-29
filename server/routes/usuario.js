const express = require('express');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function (req, res) {
  res.json('get Usuario');
});

app.post('/usuario', function (req, res) {
  const persona = req.body;

  const usuario = new Usuario({
    nombre: persona.nombre,
    email: persona.email,
    password: persona.password,
    role: persona.role,
  });

  usuario.save((err, usuarioDB) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
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

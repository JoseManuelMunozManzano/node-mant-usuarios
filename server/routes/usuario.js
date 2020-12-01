const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function (req, res) {
  const desde = +req.query.desde || 0;
  const limite = +req.query.limite || 5;

  Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec()
    .then(async usuarios => {
      // El count recibe una condición que debería ser la misma
      // que la de arriba, para que los cuente de la misma manera
      const conteo = await Usuario.countDocuments({});
      res.json({
        ok: true,
        usuarios,
        cuantos: conteo,
      });
    })
    .catch(err => {
      res.status(400).json({
        ok: false,
        err,
      });
    });
});

app.post('/usuario', function (req, res) {
  const persona = req.body;

  const usuario = new Usuario({
    nombre: persona.nombre,
    email: persona.email,
    password: bcrypt.hashSync(persona.password, 10),
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

  const body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);

  Usuario.findByIdAndUpdate(
    id,
    body,
    { new: true, runValidators: true },
    (err, usuarioDB) => {
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
    }
  );
});

app.delete('/usuario', function (req, res) {
  res.json('delete Usuario');
});

module.exports = app;

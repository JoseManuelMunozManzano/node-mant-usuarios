const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore');
const Usuario = require('../models/usuario');

const app = express();

app.get('/usuario', function (req, res) {
  // Los parámetros opcionales están en un objeto llamado query
  const desde = +req.query.desde || 0;
  const limite = +req.query.limite || 5;

  // Busca todos, pero se salta los primeros x registros y luego muestra
  // los siguientes y registros

  Usuario.find({})
    .skip(desde)
    .limit(limite)
    .exec((err, usuarios) => {
      if (err) {
        return res.status(400).json({
          ok: false,
          err,
        });
      }

      res.json({
        ok: true,
        usuarios,
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

    // Ver en el fuente models/usuario.js una forma mejor de no enviar el campo password
    //usuarioDB.password = null;

    res.json({
      ok: true,
      usuario: usuarioDB,
    });
  });
});

app.put('/usuario/:id', function (req, res) {
  const id = req.params.id;

  // No actualizar password ni campo google
  // Una forma es borrar del body esas propiedades
  //      const body = req.body;
  //      delete body.password
  //      delete body.google
  // Pero es ineficiente cuando son muchos objetos
  // Otra forma de hacerlo es con la librería undescore.js
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

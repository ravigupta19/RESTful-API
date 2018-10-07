const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genreModel = require('../models/genre');

router.get('/', (req, res) => {
  genreModel.get()
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      res.status(404).send({ error: error.message });
    });
});

router.post('/', (req, res) => {
  const { error } = validateInput(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  genreModel.create(req.body)
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
      }
      res.status(404).send({ error: error.message });
    });
});

router.patch('/:id', (req, res) => {

  const { id } = req.params;
  const data  = req.body || {};
  const { error } = validateInput(data);
  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  genreModel.update(id, data)
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      if (error.name === 'ValidationError'
        || error.name === 'CastError') {
        return res.status(400).send({ error: error.message });
      }
      res.status(404).send({ error: error.message });
    });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  genreModel.del(id)
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send({ error: error.message });
      }
      res.status(404).send({ error: error.message });
    });
});

function validateInput(genre) {
  const schema = {
    name: Joi.string().min(3).required(),
  };
  return Joi.validate(genre, schema);
}

module.exports = router;
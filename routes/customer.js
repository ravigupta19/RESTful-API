const router = require('express').Router();
const Joi = require('joi');


const customerModel = require('../models/customer');

router.get('/', function(req, res) {
  customerModel.get()
    .then((data) => {
      res.send(data);
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        res.status(400).send(error.message);
      }
      res.status(404).send(error.message);
    });
});

router.post('/', function (req, res) {
  const data = req.body || {};
  const { error } = validate(data);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }
  customerModel.create(data)
    .then((customer) => {
      res.send(customer);
    }).catch((error) => {
     res.send(400).status(error.message);
    });
});

router.patch('/:id', function(req, res) {
  const { id } = req.params;
  const data = req.body || {};
  customerModel.update(id, data)
    .then((customer) => {
      res.send(customer);
    }).catch((error) => {
      if (error.name === 'ValidationError') {
        return res.status(400).send(error.message);
      }
      return res.status(404).send(error.message);
    });
});


router.delete('/:id', function(req, res) {
  const { id } = req.params;
  customerModel.del()
    .then((customer) => {
      res.send(customer);
    }).catch((error) => {
      if (error.name === 'ValidationError'
        || error.name === 'CastError'
      ) {
        return res.status(4004).send(error.message);
      }
      res.status(404).send(error.message);
    });
});

function validate(data) {
  const schema = {
    name: Joi.string().min(5).max(50).required(),
    phone: Joi.string().min(10).max(12).required(),
  };
  return Joi.validate(data, schema);
}

module.exports = router;
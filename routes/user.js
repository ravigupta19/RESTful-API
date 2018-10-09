const joi = require('joi');
const router = require('express').Router();

const userModel = require('../models/user');

router.post('/', (req, res) => {
  const data = req.body || {};
  const { error } = validate(data);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  userModel.create(data)
    .then((user) => {
      res.send(user);
    }).catch((error) => {
      res.status(400).send(error.message);
    });
});


function validate(user) {
  const schema = {
    name: joi.string().min(4).max(50).required(),
    email: joi.string().min(10).max(255).required().email(),
    password: joi.string().min(6).max(255).required()
  }
  return joi.validate(user, schema);
}
module.exports = router;
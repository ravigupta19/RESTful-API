const Joi = require('joi');

const User = require('../schema/user');

function getAll() {
  return User.find().select({ 'name': 1, 'email': 1 });
}

function getByEmailId(email) {
  return User.find({ email })
    .select({ 'name': 1, 'email': 1 })
    .then((user) => {
      if (!user) {
        throw new Error('No user found');
      }
      return user;
    });
}

function create(data) {
  const { name, email, password } = data;
  return User.findOne({ email })
    .then((exitUser) => {
      console.log(exitUser);
      if(exitUser) {
        throw new Error('User alreasy exist with email id');
      }
      const user = new User({
        name,
        email,
        password,
      });
      return user.save();
    });
}

function update(id, data) {
}

function del() {

}



module.exports = {
  getAll,
  getByEmailId,
  create,
  update,
  del,
};





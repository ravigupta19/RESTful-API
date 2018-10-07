const Joi = require('joi');
const loadash = require('lodash');

const Customer = require('../schema/customer');

function get() {
  return Customer.find();
}

function create(data) {
  const { name, phone } = data;
  const customer = new Customer({
    name,
    phone
  });

  return customer.save();
}

function update(id, data) {
  return Customer.findById(id)
    .then((customer) => {
      const customerObject = customer.toObject();
      if (!customer) {
        throw new Error('Customer Not found');
      }

      for (let key of Object.keys(data)) {
        if (Object.keys(customerObject).includes(key)) {
          customer[key] = data[key];
        }
      }
      return customer.save();
    });
}

function del(id) {
  return Customer.findById(id)
    .then((customer) => {
      if (!customer) {
        throw new Error('Customer Not found');
      }
      return customer.remove();
    });
}

module.exports = {
  get,
  create,
  update,
  del,
};
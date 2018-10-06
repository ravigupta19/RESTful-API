
const Genre = require('../schema/genre');

function get() {
  return Genre.find();
}

function update(id, data) {
  return Genre.findById(id)
    .then((genre) => {
      if (!genre) {
        throw new Error('Genre not found');
      }
      const { name } = data;
      genre.name = name;
      return genre.save();
    });
}

function create(data) {
  const { name } = data;
  const genre = new Genre({ name });
  return genre.save();
}

function del(id) {
  return Genre.findById(id)
    .then((genre) => {
      if (!genre) {
        throw new Error('Genre not Found');
      }
      return genre.remove();
    });
}

module.exports = {
  get,
  update,
  create,
  del,
 };

const Genre = require('../schema/genre');

/**
 * Get all the type of Genres
 * @returns {Array} Array of genre document
 */
function get() {
  return Genre.find();
}

/**
 * Update the Genre document
 * @param {String} id - id of the document to updates
 * @param {Object} data - data object with field as key and update
 * @returns {Promise}
 */
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

/**
 * This function will create a new genre
 * @param {Object} data - Data object for creating new genre
 * @returns {Promise}
 */
function create(data) {
  const { name } = data;
  const genre = new Genre({ name });
  return genre.save();
}

/**
 * this function will delete genre document
 * @param {String} id - mongoid for deleting genre document
 * @returns {Promise}
 */
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
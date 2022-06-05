import {mongoose} from '../index.js';

const estadospublicacionSchema = mongoose.Schema({
  nombre: {
      type: 'string'
  }
});
module.exports = mongoose.model('estadospublicaciones',estadospublicacionSchema)
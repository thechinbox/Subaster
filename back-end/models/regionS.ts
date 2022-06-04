import {mongoose} from '../index.js';

const regionSchema = mongoose.Schema({
      nombre: {
        type: 'string'
      }
});
module.exports = mongoose.model('region',regionSchema)
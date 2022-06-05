import {mongoose} from '../index.js';

const regionSchema = mongoose.Schema({
      region: {
        type: 'string'
      }
});
module.exports = mongoose.model('regiones',regionSchema)
import {mongoose} from '../index.js';

const comunaSchema = mongoose.Schema({
  comuna: {
    type: 'string'
  },
  idregion:{
    type: 'ObjectId'
  }
});
module.exports = mongoose.model('comunas',comunaSchema)
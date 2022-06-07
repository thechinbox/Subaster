import {mongoose} from '../index.js';

const contentSchema = mongoose.Schema({
  idpublicacion: {
    type: 'ObjectId'
  },
  url:{
    type: 'string'
  }
});
module.exports = mongoose.model('contenidos',contentSchema)
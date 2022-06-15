import {mongoose} from '../index.js';

const stockSchema = mongoose.Schema({
  idstock: {
    type: 'objectId'
  },
  idpublicacion: {
    type: 'objectId'
  },
  idestado: {
    type: 'objectId'
  }
});
module.exports = mongoose.model('stocks',stockSchema)
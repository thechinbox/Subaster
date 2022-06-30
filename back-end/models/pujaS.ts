import {mongoose} from '../index.js';

const pujaS = mongoose.Schema({
  idpublicacion: {
    type: 'objectId'
  },
  idusuario:{
    type: 'objectId'
  },
  valorpuja: {
    type: 'number'
  },
  fechapuja: {
    type: 'date'
  }
});
module.exports = mongoose.model('pujassubastas',pujaS)
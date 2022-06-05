import {mongoose} from '../index.js';

const direccionespublicacionesS = mongoose.Schema({
  idpublicacion: {
    type: 'objectId'
  },
  region: {
    type: 'objectId'
  },
  comuna: {
    type: 'objectId'
  },
  direccion: {
    type: 'String'
  },
  latitud: {
    type: 'Number'
  },
  longitud: {
    type: 'Number'
  }
});
module.exports = mongoose.model('direccionespublicaciones',direccionespublicacionesS)
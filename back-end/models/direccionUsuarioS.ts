import {mongoose} from '../index.js';

const direccionesusuariosS = mongoose.Schema({
  idusuario: {
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
module.exports = mongoose.model('direccionesusuarios',direccionesusuariosS)
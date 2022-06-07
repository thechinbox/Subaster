import {mongoose} from '../index.js';

const publicationS = mongoose.Schema({
    idpublicacion: {
        type: 'objectId'
      },
      nombre: {
        type: 'string'
      },
      descripcion: {
        type: 'string'
      },
      categoria: {
        type: 'objectId'
      },
      estadoproducto: {
        type: 'objectId'
      },
      estadopublicacion: {
        type: 'objectId'
      },
      unidad: {
        type: 'objectId'
      },
      fechapublicacion: {
        type: 'date'
      },
      precio: {
        type: 'Number'
      },
      cantidad: {
        type: 'Number'
      },
      iddireccion: {
        type: 'objectId'
      },
      idcontenido: {
        type: 'objectId'
      }
});
module.exports = mongoose.model('fijas',publicationS)
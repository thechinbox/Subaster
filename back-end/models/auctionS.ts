import {mongoose} from '../index.js';

const auctionS = mongoose.Schema({
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
    fechafinalizacion: {
      type: 'date'
    },
    precioinicial: {
      type: 'Number'
    },
    cantidad: {
      type: 'Number'
    },
    iddireccion: {
      type: 'objectId'
    }
});
module.exports = mongoose.model('subastas',auctionS)
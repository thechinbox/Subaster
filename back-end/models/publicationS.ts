import {mongoose} from '../index.js';

const publicationS = mongoose.Schema({
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
    unidad: {
        type: 'objectId'
    },
    fechapublicacion: {
        type: 'date'
    },
    tipoventa:{
        type: 'objectId'
    }
});
module.exports = mongoose.model('publicaciones',publicationS)
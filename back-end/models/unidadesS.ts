import {mongoose} from '../index.js';

const unidadesSchema = mongoose.Schema({
    id:{
        type: 'string'
    },
    unidad: {
        type: 'string'
    }
});
module.exports = mongoose.model('unidadesproductos',unidadesSchema)
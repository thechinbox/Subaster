import {mongoose} from '../index.js';

const categoriaSchema = mongoose.Schema({
    id:{
        type: 'string'
    },
    estado: {
        type: 'string'
    }
});
module.exports = mongoose.model('categoriasproductos',categoriaSchema)
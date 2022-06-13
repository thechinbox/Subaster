import {mongoose} from '../index.js';

const compraSchema = mongoose.Schema({
    idventa: {
        type: 'ObjectId'
    },
    idpublicacion: {
        type: 'ObjectId'
    },
    idusuario:{
        type: 'ObjectId'
    },
    fechaventa:{
        type: 'date'
    }
});
module.exports = mongoose.model('ventas',compraSchema)
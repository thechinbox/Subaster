import {mongoose} from '../index.js';

const estadosprodcutosSchema = mongoose.Schema({
  id:{
    type: 'string'
  },
  nombre: {
      type: 'string'
  }
});
module.exports = mongoose.model('estadosproductos',estadosprodcutosSchema)
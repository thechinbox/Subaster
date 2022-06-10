import {mongoose} from '../index.js';

const userSchema = mongoose.Schema({
      idusuario:{
        type: 'objectId'
      },
      nombre: {
        type: 'string'
      },
      apellidos: {
        type: 'string'
      },
      correo: {
        type: 'string'
      },
      celular: {
        type: 'Number'
      },
      contrasena: {
        type: 'string'
      },
      fechacreacion: {
        type: 'date'
      }
});
module.exports = mongoose.model('usuarios',userSchema)
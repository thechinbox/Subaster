import {mongoose} from '../index.js';

const userSchema = mongoose.Schema({
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
      contraseña: {
        type: 'string'
      },
      fechacreacion: {
        type: 'date'
      }
});
module.exports = mongoose.model('usuario',userSchema)
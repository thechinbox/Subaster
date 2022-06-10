/*
    Pasos a seguir si se desea cambiar la cuenta de origen:
    1.- Entrar a console.developers.google.com/apis/    (tener cuidado de no entrar a cloud.google.com)
    2.- Loguearse con la cuenta que desea que mande emails
    3.- Crear un nuevo proyecto
    4.- Selecciona el proyecto
    5.- Ir al apartado de "Pantalla de consentimiento"
        6.- Hay 2 opciones, interno y externo, seleccionar "Externo" y crear
        7.- Rellenar campos con (*)
        8.- Dar a continuar hasta llegar al paso de Usuarios de prueba
        9.- Agregar un nuevo usuario, en este caso, al correo que deseamos que envie emails (el error 403 aparecerá si no se completa esto)
        10.- Guardar todo y volver al panel
    11.- Ir al apartado de "Credenciales"
        12.- Crear una nueva credencial => Id Cliente OAuth
        13.- Rellenar los campos hasta URI de Direccionamientos Autorizados
        14.- En añadir URI se debe añadir el siguiente enlace https://developers.google.com/oauthplayground y dar a Crear
        15.- Guardar datos de la pestaña emergente (idCliente y Secreto)
        16.- Dirigirse al sitio OAuthPlayGround
            17.- A la derecha hay un boton tuerca, clickear para abrir configuraciones
            18.- Clickear en usar mis propias OAuth Credencials
            19.- Rellenar campos
            20.- Cerrar configuraciones y ahora ir a la derecha, para rellenar los "Steps"
            21.- Donde está el boton de autorizar Apps, ingresar: https://mail.google.com
            22.- Luego de darle a autorizar, aparecerá una ventana donde seleccionaremos nuestra cuenta de google.
            23.- Si aparece "Google no ha autorizado esta aplicacion" darle a continuar.
            24.- Confirmar uso de cuenta
            25.- Hacer click en "Exchange authorizations tokens" para que nos brinden los codigos de abajo
        
    Los datos obtenidos desde el ultimo paso, son los que deberán cambiar en las variables de más abajo.
*/

//Ejecutable con => node src/js/test.js

//Modulo que permite el envio de correos a gmail
const { google } = require('googleapis')
const nodemailer = require("nodemailer");

const REFRESH_TOKEN = "1//04iaQkcJ6x-XYCgYIARAAGAQSNwF-L9IrW3cy3VXTsdwRZnfGlRoW7koN3YdWMUBezDiFah604D2UEs7EWwDz6uApwLK3NJrk2ro";
const CLIENT_ID = "90357140452-qdmaul0i29hco6122uhqs7oielejdcmm.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const userMail = "testsubaster@gmail.com";
const REDIRECT_URI ="https://developers.google.com/oauthplayground"; // NO CAMBIAR
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI); // NO CAMBIAR
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN }); // NO CAMBIAR

const mail={
    from: "Subaster Recibo",
    to: "testsubaster@gmail.com",
    subject: "Holaa ;)",
    html: "<br>Mensaje de pruebaa ;)))</br>"
}

/**
 * 
 * @returns Comprobacion de la operacion.
 */
async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type:"OAuth2",
                user: userMail,
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });

        const result = await transporter.sendMail(mail);
        console.log("Email enviado correctamente a : " + userMail);
        return result;
    } catch (err){
        console.log(err);
    }
    //sendMail().then(result => res.status(200).send("enviado")).catch((error) => console.log(error.message));
}

sendMail();
//module.exports = router;

//exports.sendMail = () => this.sendMail()
//sendMail().catch(console.error);
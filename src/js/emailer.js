//Ejecutable con => node src/js/test.js

const nodemailer = require("nodemailer");

//Modulo que permite el envio de correos a gmail
const { google } = require('googleapis')

const CLIENT_ID = "819414500361-q84tih61plbbha5kqrq38bn24g5pgac5.apps.googleusercontent.com";
const CLIENT_SECRET = "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";
const REDIRECT_URI ="https://developers.google.com/oauthplayground";
const REFRESH_TOKEN = "1//04KRcOX37Bi3bCgYIARAAGAQSNwF-L9Irs7kGA7LxlxYpGjxvS9ecv3IZGwP2npwFkXsS1zW9INO4C2z3dx8VCfE3pqmsgtSwR-c";
const oAuth2Client = new google.auth.OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URI);
oAuth2Client.setCredentials({ refresh_token:REFRESH_TOKEN });

async function sendMail() {
    try {
        const accessToken = await oAuth2Client.getAccessToken();
        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                type:"OAuth2",
                user:"toroelian4@gmail.com",
                clientId: CLIENT_ID,
                clientSecret: CLIENT_SECRET,
                refreshToken: REFRESH_TOKEN,
                accessToken: accessToken
            }
        });
        const mail={
            from: "Subaster Recibo",
            to: "testsubaster@gmail.com",
            subject: "Holaa ;)",
            html: "<br>Mensaje de pruebaa ;)))</br>"
        }

        const result = await transporter.sendMail(mail);
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
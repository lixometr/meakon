const https = require('https');

async function generateLink(params) {
    https.get('https://payop.com/v1/invoices/create', (resp) => {
        let data = '';

        // A chunk of data has been recieved.
        resp.on('data', (chunk) => {
            data += chunk;
        });

        // The whole response has been received. Print out the result.
        resp.on('end', () => {
            console.log(JSON.parse(data).explanation);
        });

    }).on("error", (err) => {
        console.log("Error: " + err.message);
    });
}

function getSignature(params) {

}
module.exports = { generateLink, getSignature }
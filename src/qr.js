const QRCode = require('qr-image');
const https = require('https');

const QR = {}

QR.getQR = async (text) => {
    var qr = QRCode.image(text, { type: 'png' });
    return qr;
}

module.exports = QR
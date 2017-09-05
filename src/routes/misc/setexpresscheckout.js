export default function (router) {
    router.get('/', (req, res) => {
        
        let paypal = req.app.kraken.get('paypalClassic');
        let port = process.env.PORT || 3000;
        let ip = process.env.IP || 'localhost';
        port = ':' + port || '';

        let nvpParams = {
            RETURNURL: 'http://' + ip + port + '/misc/returnurl.html',
            CANCELURL: 'http://' + ip + port + '/misc/cancelurl.html',
            PAYMENTREQUEST_0_AMT: '100.00'
        };
            
        paypal.call('SetExpressCheckout', nvpParams, (err, response) => {
            res.redirect('https://www.sandbox.paypal.com/checkoutnow?token=' + response.TOKEN);
        });
    });
}
export default function (router) {
    router.get('/', (req, res) => {
        
        let paypal = req.app.kraken.get('paypalClassic');
        let hostconfig = req.app.kraken.get('host');
        let port = ':' + hostconfig.port || '';

        let nvpParams = {
            RETURNURL: 'http://' + hostconfig.name + port + '/misc/returnurl.html',
            CANCELURL: 'http://' + hostconfig.name + port + '/misc/cancelurl.html',
            PAYMENTREQUEST_0_AMT: '100.00'
        };
            
        paypal.call('SetExpressCheckout', nvpParams, (err, response) => {
            if (err) {
                res.json(err);
            } else {
                res.json(response);
            }

        });
    });
}
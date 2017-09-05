import express from 'express';
import path from 'path';
import kraken from 'kraken-js';
import braintree from 'braintree';
import paypal from 'paypal-rest-sdk';
import PayPal from 'paypal-classic-api';


let app = express();
let port = process.env.PORT || 3000;
let ip = process.env.IP || 'localhost';

let krakenOpts = {
    onconfig: (config, callback) => {

        let btConfig = config.get('braintreeConfig');
        btConfig.environment = btConfig.enviroment === 'Production' ? braintree.Environment.Production : braintree.Environment.Sandbox;
        let btGateway = braintree.connect(btConfig);
        config.set('btGateway', btGateway);

        let restConfig = config.get('paypalRestConfig');
        paypal.configure(restConfig);
        config.set('paypalRest', paypal);

        let classicConfig = config.get('paypalClassicConfig');
        let paypalClassic = new PayPal(classicConfig);
        config.set('paypalClassic', paypalClassic);
        if (process.env.NODE_ENV === 'production') {
          console.log('Visit http://' + ip + ':' + port);
        }

        callback(null, config);
    }
};

app.use(kraken(krakenOpts));

app.use(express.static(path.resolve(__dirname, '../client')));



let server = app.listen(port, ip);

server.on('listening', () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log('Server running on ' + server.address().address + ' on port ' + server.address().port + '!');
  }
});
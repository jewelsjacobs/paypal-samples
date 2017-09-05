import express from 'express';
import path from 'path';
import kraken from 'kraken-js';
import braintree from 'braintree';
import paypal from 'paypal-rest-sdk';
import PayPal from 'paypal-classic-api';


let app = express();
app.set('port', (process.env.PORT || 3001));

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

        callback(null, config);
    }
};

app.use(kraken(krakenOpts));

app.use(express.static(path.resolve(__dirname, '../client')));

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
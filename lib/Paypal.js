const paypal = require('paypal-rest-sdk');

class PayPalGateway {
    constructor(clientId, clientSecret) {
        paypal.configure({
            mode: 'sandbox',
            client_id: clientId,
            client_secret: clientSecret,
        });
    }

    createPayment(amount, currency, returnUrl, cancelUrl) {
        const create_payment_json = {
            intent: 'sale',
            payer: {
                payment_method: 'paypal',
            },
            redirect_urls: {
                return_url: returnUrl,
                cancel_url: cancelUrl,
            },
            transactions: [{
                amount: {
                    currency: currency,
                    total: amount,
                },

            }],
        };

        return new Promise((resolve, reject) => {
            paypal.payment.create(create_payment_json, (error, payment) => {
                if (error) {
                    reject(error);
                } else {
                    resolve(payment);
                }
            });
        });
    }

}

module.exports = PayPalGateway;

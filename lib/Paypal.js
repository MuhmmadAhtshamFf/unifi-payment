import paypal from 'paypal-rest-sdk';
const { configure, payment: _payment } = paypal;
class PayPalGateway {
  constructor(clientId, clientSecret, environment = "sandbox") {
    /**
     * Initializes the PayPal gateway with the provided client ID and client secret.
     * @param {string} clientId - Your PayPal client ID.
     * @param {string} clientSecret - Your PayPal client secret.
     */
    if (!clientId || !clientSecret) {
      throw new Error("PayPal clientId and clientSecret are required");
    }
    configure({
      mode: environment,
      client_id: clientId,
      client_secret: clientSecret,
    });
  }
  /**
   * Creates a payment with PayPal.
   * @param {number} amount - The amount to be charged.
   * @param {string} currency - The three-letter ISO currency code (e.g., 'USD').
   * @param {string} returnUrl - The URL to redirect to after a successful payment.
   * @param {string} [description] - An optional description for the payment.
   * @param {string} cancelUrl - The URL to redirect to if the payment is canceled.
   * @returns {Promise<Object>} - A promise that resolves with the payment object.
   * @throws {Error} - Throws an error if the payment creation fails or validation errors occur.
   */
  createPayment(amount, currency, returnUrl, cancelUrl, description = "") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a three-letter ISO currency code");
    }
    if (typeof returnUrl !== "string" || typeof cancelUrl !== "string") {
      throw new Error("Both returnUrl and cancelUrl must be strings");
    }
    const create_payment_json = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: returnUrl,
        cancel_url: cancelUrl,
      },
      transactions: [
        {
          amount: {
            currency: currency,
            total: amount.toFixed(2),
          },
        },
      ],
      description,
    };

    return new Promise((resolve, reject) => {
      _payment.create(create_payment_json, (error, payment) => {
        if (error) {
          reject(error);
        } else {
          resolve(payment);
        }
      });
    });
  }
}

export default PayPalGateway;

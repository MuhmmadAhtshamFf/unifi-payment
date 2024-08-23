import Stripe from "stripe";
class StripeGateway {
  constructor(apiKey) {
    /**
   * Initializes the Stripe gateway with the provided API key.
   * @param {string} apiKey - Your Stripe secret API key.
   */
    this.stripe = new Stripe(apiKey);
  }

  /**
   * Creates a Payment Intent with Stripe.
   * @param {number} amount - The amount to be charged in the smallest currency unit (e.g., cents for USD).
   * @param {string} currency - The three-letter ISO currency code (e.g., 'usd').
    * @param {string} [description] - An optional description for the payment.
   * @returns {Promise<Object>} - A promise that resolves with the payment intent object.
   * @throws {Error} - Throws an error if the payment creation fails or validation errors occur.
   */

  async createPaymentIntent(amount, currency  ,description = "") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a three-letter ISO currency code");
    }
    let smallestAmountUnit = amount;
    if (currency === "jpy") {
      smallestAmountUnit = amount * 1;
    } else {
      smallestAmountUnit = amount * 100;
    }

    try {
      const paymentIntentParams = {
        amount: smallestAmountUnit,
        currency: currency.toUpperCase(),
      };

      if (description) {
        paymentIntentParams.description = description;
      }
      const paymentIntent = await this.stripe.paymentIntents.create(
        paymentIntentParams
      );
      return paymentIntent;
    } catch (error) {
      throw new Error(`stripe payment failed : ${error.message}`);
    }
  }
}

export default StripeGateway;














// const StripeGateway = require("./lib/stripe.js");
// const RazorpayGateway = require("./lib/razorpay.js");
// const PayPalGateway = require("./lib/Paypal.js");
// const AuthorizeNetGateway = require("./lib/authorizenet.js");

// class UnifiPayment {
//   constructor(type, config) {
//     switch (type) {
//       case "stripe":
//         this.gateway = new StripeGateway(config.apiKey);
//         break;
//       case "razorpay":
//         this.gateway = new RazorpayGateway(config.keyId, config.keySecret);
//         break;
//       case "paypal":
//         this.gateway = new PayPalGateway(config.clientId, config.clientSecret);
//         break;
//       case "authorizenet":
//         this.gateway = new AuthorizeNetGateway(
//           config.apiLoginId,
//           config.apiTransactionKey
//         );
//         break;
//       default:
//         throw new Error("Unsupported payment gateway type");
//     }
//   }

//   async createPayment(amount, currency, returnUrl, cancelUrl, environment) {
//     try {
//       if (!amount) {
//         return new Error("amount is required");
//       }
//       if (!currency) {
//         return new Error("currency is required");
//       }

//       if (this.gateway.createPaymentIntent) {
//         return await this.gateway.createPaymentIntent(amount, currency);
//       } else if (this.gateway.createPayment) {
//         return await this.gateway.createPayment(
//           amount,
//           currency,
//           returnUrl,
//           cancelUrl,
//           environment
//         );
//       } else {
//         throw new Error("Unsupported payment gateway type");
//       }
//     } catch (error) {
//       throw new Error(`Payment processing failed: ${error.message}`);
//     }
//   }
// }
// module.exports =  UnifiPayment;

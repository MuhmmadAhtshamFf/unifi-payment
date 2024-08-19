const express = require("express");
const StripeGateway = require("./lib/stripe");
const RazorpayGateway = require("./lib/razorpay");
const PayPalGateway = require("./lib/Paypal");
const app = express();
const port = 3000;

class UnifiPayment {
  constructor(type, config) {
    switch (type) {
      case "stripe":
        this.gateway = new StripeGateway(config.apiKey);
        break;
      case "razorpay":
        this.gateway = new RazorpayGateway(config.keyId, config.keySecret);
        break;
      case "paypal":
        this.gateway = new PayPalGateway(config.clientId, config.clientSecret);
        break;
      case "authorizenet":
        this.gateway = new AuthorizeNetGateway(
          config.apiLoginId,
          config.apiTransactionKey
        );
        break;
      default:
        throw new Error("Unsupported payment gateway type");
    }
  }

  async createPayment(amount, currency, returnUrl, cancelUrl) {
    try {
      if (!amount) {
        return new Error("amount is required");
      }
      if (!currency) {
        return new Error("currency is required");
      }

      if (this.gateway.createPaymentIntent) {
        return await this.gateway.createPaymentIntent(amount, currency);
      } else if (this.gateway.createPayment) {
        return await this.gateway.createPayment(
          amount,
          currency,
          returnUrl,
          cancelUrl
        );
      } else {
        throw new Error("Unsupported payment gateway type");
      }
    } catch (error) {
      throw new Error(`Payment processing failed: ${error.message}`);
    }
  }
}

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});

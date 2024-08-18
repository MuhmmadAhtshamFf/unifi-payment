const Stripe = require("stripe");

class StripeGateway {
  constructor(apiKey) {
    this.stripe = new Stripe(apiKey);
  }

  async createPaymentIntent(amount, currency) {
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`stripe payment failed : ${error.message}`);
    }
  }
}

module.exports = StripeGateway;

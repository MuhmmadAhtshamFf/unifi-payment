const Razorpay = require("razorpay");

class RazorpayGateway {
  constructor(keyId, keySecret) {
    if(!keyId || !keySecret) {
      throw new Error("keyId and keySecret are required");
    }
    this.razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }

  async createPaymentIntent(amount, currency) {
    try {
      const paymentIntent = await this.razorpay.payment_intents.create({
        amount,
        currency,
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Razorpay Payment failed: ${error.message}`);
    }
  }
}

module.exports = RazorpayGateway;

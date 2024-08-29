import Stripe from "stripe";
class StripeGateway {
  constructor(apiKey) {
    /**
     * Initializes the Stripe gateway with the provided API key.
     * @param {string} apiKey - Your Stripe secret API key.
     */
    // if (apiKey) throw new Error("stripe apiKey are required");
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

  async CreateCheckoutSession({ amount, currency, description = "" }) {
    if (amount < 0) {
      throw new Error("amount must be postive");
    }
    if (!amount) {
      throw new Error("amount are required");
    }
    if (!currency) {
      throw new Error("currency are required");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a three-letter ISO currency code");
    }
    let smallestAmountUnit = amount;
    if (currency === "jpy") {
      smallestAmountUnit = amount;
    } else {
      smallestAmountUnit = amount * 100;
    }
    try {
      const paymentIntent = await this.stripe.paymentIntents.create({
        amount: parseInt(smallestAmountUnit),
        currency: currency.toUpperCase(),
        description,
      });

      return paymentIntent;
    } catch (error) {
      throw new Error(`stripe payment failed : ${error.message}`);
    }
  }
  async capturePayment(paymentId) {
    if (!paymentId) {
      throw new Error("paymentId are required");
    }
    try {
      const payment = await this.stripe.paymentIntents.capture(paymentId);
      return payment;
    } catch (error) {
      throw new Error(`stripe payment failed : ${error.message}`);
    }
  }
}

export default StripeGateway;

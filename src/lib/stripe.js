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

  async createPaymentIntent(amount, currency, description = "") {
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
      // Create a payment intent with Stripe.
      return paymentIntent;
    } catch (error) {
      throw new Error(`stripe payment failed : ${error.message}`);
    }
  }
}

export default StripeGateway;

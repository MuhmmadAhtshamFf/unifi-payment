import Razorpay from "razorpay";
class RazorpayGateway {
  constructor(keyId, keySecret) {
    /**
     * Initializes the Razorpay gateway with the provided key ID and key secret.
     * @param {string} keyId - Your Razorpay key ID.
     * @param {string} keySecret - Your Razorpay key secret.
     */
    if (!keyId || !keySecret) {
      throw new Error("razorpay clientId and clientSecret are required");
    }
    this.razorpay = new Razorpay({ key_id: keyId, key_secret: keySecret });
  }
  /**
   * Creates a Payment with Razorpay.
   * @param {number} amount - The amount to be charged in the smallest currency unit.
   * @param {string} currency - The three-letter ISO currency code (e.g., 'INR').
   * @param {string} [description] - An optional description for the payment.
   * @returns {Promise<Object>} - A promise that resolves with the payment object.
   * @throws {Error} - Throws an error if the payment creation fails or validation errors occur.
   */
  async CreateCheckoutSession({ amount, currency, description = "" }) {
    if (!amount) {
      throw new Error("amount are required");
    }
    if (!currency) {
      throw new Error("currency are required");
    }
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
      const paymentIntent = await this.razorpay.payment_intents.create({
        amount: parseFloat(smallestAmountUnit),
        currency: currency.toUpperCase(),
        receipt: description || undefined,
        notes: description ? { description } : {},
      });
      return paymentIntent;
    } catch (error) {
      throw new Error(`Razorpay Payment failed: ${error.message}`);
    }
  }
  async capturePayment(paymentId){
    if(!paymentId){
      throw new Error("paymentId are required");
    }
    try {
      const payment = await this.razorpay.payments.capture(paymentId);
      return payment;
    } catch (error) {
      throw new Error(`Razorpay payment failed : ${error.message}`);
    }
  }
}
export default RazorpayGateway;

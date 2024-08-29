import paypal from "@paypal/paypal-js";
const _ = paypal;
class PayPalGateway {
  // clientId, clientSecret, environment = "sandbox"
  constructor(clientId, clientSecret, environment = "sandbox") {
    /**clientId, clientSecret, environment = "sandbox"
     * Initializes the PayPal gateway with the provided client ID and client secret.
     * @param {string} clientId - Your PayPal client ID.
     * @param {string} clientSecret - Your PayPal client secret.
     */
    if (!clientId || !clientSecret) {
      throw new Error("PayPal clientId and clientSecret are required");
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.environment = environment;
    this.baseUrl = {
      sandbox: "https://api-m.sandbox.paypal.com",
      production: "https://api-m.paypal.com",
    };
  }
  async generateAccessToken() {
    try {
      const auth = Buffer.from(
        `${this.clientId}:${this.clientSecret}`
      ).toString("base64");
      const response = await fetch(
        `${this.baseUrl[this.environment]}/v1/oauth2/token`,
        {
          method: "POST",
          body: "grant_type=client_credentials",
          headers: {
            Authorization: `Bearer ${auth}`,
          },
        }
      );

      const data = await response.json();
      return data.access_token;
    } catch (error) {
      console.error("Failed to generate Access Token:", error);
    }
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
  async CreateCheckoutSession({ amount, currency, returnUrl, cancelUrl }) {
    if (!amount) {
      throw new Error("amount are required");
    }
    if (!currency) {
      throw new Error("currency are required");
    }
    if (!returnUrl) {
      throw new Error("amount are required");
    }
    if (!cancelUrl) {
      throw new Error("cancelUrl are required");
    }
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a three-letter ISO currency code");
    }
    if (typeof returnUrl !== "string" || typeof cancelUrl !== "string") {
      throw new Error("Both returnUrl and cancelUrl must be strings");
    }

    try {
      const accessToken = await generateAccessToken();
      const url = `${this.baseUrl[this.environment]}/v2/checkout/orders`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify({
          intent: "CAPTURE",
          purchase_units: [
            {
              amount: {
                currency_code: currency.toUpperCase(),
                value: parseInt(amount).toFixed(2),
              },
            },
          ],
          application_context: {
            return_url: returnUrl,
            cancel_url: cancelUrl,
          },
        }),
      });
      if (!response.ok) {
        throw new Error(`Error capturing payment: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
  async capturePayment(paymentId) {
    try {
      const accessToken = await generateAccessToken();
      const url = `${
        this.baseUrl[this.environment]
      }/v2/checkout/orders/${paymentId}/capture`;

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        throw new Error(`Error capturing payment: ${response.statusText}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      throw error;
    }
  }
}
export default PayPalGateway;

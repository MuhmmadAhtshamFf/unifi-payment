import PayPalGateway from "./lib/Paypal.js";
import StripeGateway from "./lib/stripe.js";
import RazorpayGateway from "./lib/razorpay.js";
import AuthorizenetGateway from "./lib/Authorizenet.js";

class Unipay {
  constructor(config) {
    this.gateway = {
      stripe: config.StripeApiKey
        ? new StripeGateway(config.StripeApiKey)
        : null,

      paypal:
        config.PaypalclientId && config.PaypalClientSecret
          ? new PayPalGateway(
              config.PaypalclientId,
              config.PaypalClientSecret,
              config.PaypalMode,
              config.environment
            )
          : null,

      razorpay:
        config.RazorpayKeyId && config.RazorpayKey_secret
          ? new RazorpayGateway(config.RazorpayKeyId, config.RazorpayKey_secret)
          : null,

      authorizenet:
        config.apiLoginId && config.ApiTransactionKey
          ? new AuthorizenetGateway(config.ApiTransactionKey, config.apiLoginId)
          : null,
    };
  }
  async createCheckoutSession({
    amount,
    currency,
    returnUrl,
    cancelUrl,
    provider = [],
  }) {
    const session = provider.map(async (provider) => {
      if (this.gateway[provider] === null) {
        throw new Error(`Provide the Apikey of ${provider}`);
      }
      if (!this.gateway[provider]) {
        throw new Error(`Provider ${provider} is not supported`);
      }

      return await this.gateway[provider].CreateCheckoutSession({
        amount,
        currency,
      });
    });
    return Promise.all(session);
  }
  async capturePayment(id) {
    const session = provider.map(async (provider) => {
      if (this.gateway[provider] === null) {
        throw new Error(`Provide the Apikey of ${provider}`);
      }
      if (!this.gateway[provider]) {
        throw new Error(`Provider ${provider} is not supported`);
      }
      if (!this.gateway[provider].capturePayment) {
        throw new Error(`Provider ${provider} does not support capturePayment`);
      }
      if (!id) {
        throw new Error("id is required");
      }
      return await this.gateway[provider].capturePayment(id);
    });
    return Promise.all(session);
  }

  async createPaymentIntent({ amount, currency, description = "" }) {
    const session = provider.map(async (provider) => {
      if (this.gateway[provider] === null) {
        throw new Error(`Provide the Apikey of ${provider}`);
      }
      if (!this.gateway[provider]) {
        throw new Error(`Provider ${provider} is not supported`);
      }
      if (!this.gateway[provider].createPaymentIntent) {
        throw new Error(
          `Provider ${provider} does not support createPaymentIntent`
        );
      }
      return await this.gateway[provider].createPaymentIntent({
        amount,
        currency,
        description,
      });
    });
    return Promise.all(session);
  }
}

export default Unipay;

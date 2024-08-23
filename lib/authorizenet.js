import * as authorizenet from 'authorizenet';

const { APIContracts, APIControllers } = authorizenet;

class AuthorizeNetGateway {
  constructor(apiLoginId, apiTransactionKey) {
    /**
     * Initializes the Stripe gateway with the provided API key.
     * @param {string} apiLoginId - Your Stripe secret API key.
     * @param {string} apiTransactionKey - Your Stripe secret API key.
     */
    if (!apiLoginId || !apiTransactionKey) {
      throw new Error(
        "Authorize.Net API Login ID and Transaction Key are required"
      );
    }
    this.apiLoginId = apiLoginId;
    this.apiTransactionKey = apiTransactionKey;
  }
  /**
   * Creates a payment with Authorize.Net.
   * @param {number} amount - The amount to be charged in the smallest currency unit (e.g., cents for USD).
   * @param {string} currency - The three-letter ISO currency code (e.g., 'USD').
   * @param {string} [description] - An optional description for the payment.
   * @param {string} returnUrl - The URL to redirect to after a successful payment.
   * @param {string} cancelUrl - The URL to redirect to if the payment is canceled.
   * @returns {Promise<Object>} - A promise that resolves with the payment response object.
   * @throws {Error} - Throws an error if the payment creation fails or validation errors occur.
   */
  createPaymentIntent(amount, currency, description = "") {
    if (typeof amount !== "number" || amount <= 0) {
      throw new Error("Amount must be a positive number");
    }
    if (typeof currency !== "string" || currency.length !== 3) {
      throw new Error("Currency must be a three-letter ISO currency code");
    }
    if (typeof returnUrl !== "string" || !returnUrl) {
      throw new Error("Return URL must be a non-empty string");
    }
    if (typeof cancelUrl !== "string" || !cancelUrl) {
      throw new Error("Cancel URL must be a non-empty string");
    }
    const merchantAuthentication =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthentication.setName(this.apiLoginId);
    merchantAuthentication.setTransactionKey(this.apiTransactionKey);

    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTHCAPTURETRANSACTION
    );
    transactionRequest.setAmount(amount);
    transactionRequest.setCurrencyCode(currency.toUpperCase());
    if (description) {
      transactionRequest.setDescription(description);
    }
    const createTransactionRequest =
      new APIContracts.CreateTransactionRequest();
    createTransactionRequest.setMerchantAuthentication(merchantAuthentication);
    createTransactionRequest.setTransactionRequest(transactionRequest);

    const ctrl = new APIControllers.CreateTransactionController(
      createTransactionRequest.getJSON()
    );

    return new Promise((resolve, reject) => {
      ctrl.execute(() => {
        const apiResponse = ctrl.getResponse();
        const response = new APIContracts.CreateTransactionResponse(
          apiResponse
        );

        if (
          response.getMessages().getResultCode() ===
          APIContracts.MessageTypeEnum.OK
        ) {
          resolve(response);
        } else {
          const errors = response.getMessages().getMessage()
            ? response
                .getMessages()
                .getMessage()
                .map((msg) => msg.getText())
                .join(", ")
            : "Unknown error occurred.";
          reject(new Error(`Authorize.Net error: ${errors}`));
        }
      });
    });
  }
}

export default AuthorizeNetGateway;

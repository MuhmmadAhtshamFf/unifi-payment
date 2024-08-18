const { APIContracts, APIControllers } = require("authorizenet");

class AuthorizeNetGateway {
  constructor(apiLoginId, apiTransactionKey) {
    if (!apiLoginId || !apiTransactionKey) {
      throw new Error(
        "Authorize.Net API Login ID and Transaction Key are required"
      );
    }
    this.apiLoginId = apiLoginId;
    this.apiTransactionKey = apiTransactionKey;
  }

  createPayment(amount, currency, returnUrl, cancelUrl) {
    const merchantAuthentication =
      new APIContracts.MerchantAuthenticationType();
    merchantAuthentication.setName(this.apiLoginId);
    merchantAuthentication.setTransactionKey(this.apiTransactionKey);

    const transactionRequest = new APIContracts.TransactionRequestType();
    transactionRequest.setTransactionType(
      APIContracts.TransactionTypeEnum.AUTH_CAPTURE_TRANSACTION
    );
    transactionRequest.setAmount(amount);
    transactionRequest.setCurrencyCode(currency);

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
          const errors = response
            .getMessages()
            .getMessage()
            .map((msg) => msg.getText())
            .join(", ");
          reject(new Error(`Authorize.Net error: ${errors}`));
        }
      });
    });
  }
}

module.exports = AuthorizeNetGateway;

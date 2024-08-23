

# 🛠️ UnifiPayment Library

**UnifiPayment** is a unified and easy-to-use multiple payment gateway library that integrates Stripe, Razorpay, PayPal, and Authorize.Net into your Node.js applications effortlessly. Whether you
Your README looks great! It’s well-organized and provides clear instructions for using the **UnifiPayment** library. Here’s a refined version with a few adjustments for clarity and consistency:

----------

# 📚 Table of Contents

1.  [🌟 Features](#-features)
2.  [🚀 Getting Started](#-getting-started)
    -   [Installation](#installation)
    -   [Supported Payment Gateways](#supported-payment-gateways)
3.  [📚 API Reference](#-api-reference)
    -   [`UnifiPayment(type, config)`](#unifipaymenttype-config)
    -   [`createPayment(amount, currency, returnUrl, cancelUrl)`](#createpaymentamount-currency-returnurl-cancelurl)
4.  [🛠️ Example Implementations](#-example-implementations)
    -   [Stripe Payment](#stripe-payment)
    -   [Razorpay Payment](#razorpay-payment)
    -   [PayPal Payment](#paypal-payment)
    -   [Authorize.Net Payment](#authorize-net-payment)
5.  [💻 Contributing](#-contributing)
6.  [🔧 License](#-license)

----------

### 🌟 Features

-   **Unified Interface**: One API to interact with multiple payment gateways.
-   **Multi-Gateway Support**: Out-of-the-box support for Stripe, Razorpay, PayPal, and Authorize.Net.
-   **Error Handling**: Robust error handling to manage gateway-specific errors gracefully.
-   **Asynchronous Operations**: Built with modern async/await syntax for efficient payment processing.
-   **Extensible Design**: Easily extendable to include additional payment gateways as needed.

## 🚀 Getting Started

### Installation

Install the **UnifiPayment** library via npm:
```bash 
npm i unifi-payment
```
### Supported Payment Gateways

-   **Stripe**
-   **Razorpay**
-   **PayPal**
-   **Authorize.Net**
  
  
   
## 📚 API Reference

### `UnifiPayment(type, config)`

-   **type**: `string` - Specifies the payment gateway. Supported values include `"stripe"`, `"razorpay"`, `"paypal"`, `"authorizenet"` .
-   **config**: `object` - Configuration object with gateway-specific keys:
    -   **Stripe**: `{ apiKey: 'your-stripe-api-key' }`
   
    
    -   **Razorpay**: `{ keyId: 'your-razorpay-key-id',        
 keySecret: 'your-razorpay-key-secret' }`
 
    -   **PayPal**: `{ clientId: 'your-paypal-client-id', clientSecret: 'your-paypal-client-secret' }`
   
    -   **Authorize.Net**: `{ apiLoginId: 'your-authorize-net-login-id', transactionKey: 'your-authorize-net-transaction-key' }`
 

### `createPayment(data)`

**data**: `object` - Contains payment details:

-   **amount**: Amount to be charged in the smallest unit of the currency.
-   **currency**: Currency code (e.g., `USD`, `EUR`, `INR`).
-   **description**: `string` - (Optional) A description for the payment.
-   **returnUrl**: `string` - (Required for PayPal) The URL to which the customer is redirected after payment.
-   **cancelUrl**: `string` - (Required for PayPal) The URL to which the customer is redirected if the payment is canceled.
-   **environment**: `string` - (Required for PayPal)
    -   **Type**: `string`
    -   **Values**:
        -   **`sandbox`**: Use this mode for testing. It allows you to simulate payments without processing real transactions. Ideal for development and testing purposes.
        -   **`production`**: Use this mode for live transactions. Once testing is complete, switch to this mode to process real payments.

 
## **🛠️ Example Implementations**
 ## Stripe Payment:
 
 ```javascript 
** Stripe
---------------------------------------------
const payment = new UnifiPayment('stripe', { apiKey: 'your-stripe-api-key' });

payment.createPayment({
  amount: 1000,
  currency: 'usd',
  description: 'Payment for order #1234',
})
  .then(result => console.log(result))
  .catch(err => console.error(err))
  ````
  
  ## Razorpay Payment:
```javascript
** Razorpay
-----------------------------------------------
const payment = new UnifiPayment('razorpay', {
  keyId: 'your-razorpay-key-id',
  keySecret: 'your-razorpay-key-secret',
});

payment.createPayment({
  amount: 1000,
  currency: 'inr',
  description: 'description',
})
  .then(result => console.log(result))
  .catch(err => console.error(err));

````

## Paypal Payment:
```javascript
 ** Paypal
---------------------------------------------
const payment = new UnifiPayment('paypal', {
  clientId: 'your-paypal-client-id',
  clientSecret: 'your-paypal-client-secret',
});

payment.createPayment({
  amount: '50.00',
  currency: 'USD',
  description: "description",
  returnUrl: 'https://your-site.com/success',
  cancelUrl: 'https://your-site.com/cancel',
  environment:"production" //// Either 'sandbox' or 'production' default is "sandbox"
})
  .then(result => console.log(result))
  .catch(err => console.error(err));
  ````
  
  ## Authorize.Net Payment:
  ```javascript
** Authorize.Net
--------------------------------------------------
const payment = new UnifiPayment('authorizenet', {
  apiLoginId: 'your-authorize-net-login-id',
  transactionKey: 'your-authorize-net-transaction-key',
});

payment.createPayment({
  amount: 5000,
  currency: 'usd',
  description: "description"
})
  .then(result => console.log(result))
  .catch(err => console.error(err));

````


## 💻 Contributing

We welcome contributions to enhance the functionality and add more payment gateways. Please fork the repository and submit a pull request.

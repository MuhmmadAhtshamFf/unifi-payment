
# 🛠️ Unipay Library

**Unipay** is a unified library that integrates multiple payment gateways—Stripe, Razorpay, PayPal, and Authorize.Net—into your Node.js applications. This library provides a single interface for creating payment sessions, capturing payments, and creating payment intents across different payment providers.

## 📚 Table of Contents
1. [🌟 Features](#features)
2. [🚀 Getting Started](#getting-started)
   - [Installation](#installation)
   - [Configuration](#configuration)
3. [📚 API Reference](#api-reference)
   - [Unipay(config)](#unipayconfig)
   - [createCheckoutSession(data)](#createcheckoutsessiondata)
   - [capturePayment(data)](#capturepaymentdata)
   - [createPaymentIntent(data)](#createpaymentintentdata)
4. [🛠️ Example Implementations](#example-implementations)
   - [Using Multiple Payment Gateways](#using-multiple-payment-gateways-with-unipay)
   - [Using Single Payment Gateways](#using-single-payment-gateways-with-unipay)
     - [Stripe](#stripe)
     - [Razorpay](#razorpay)
     - [PayPal](#paypal)
     - [Authorize.Net](#authorize-net)
5. [💻 Contributing](#contributing)
6. [🔧 License](#license)

## 🌟 Features
- **Unified Interface**: Simplifies interaction with multiple payment gateways.
- **Multi-Gateway Support**: Supports Stripe, Razorpay, PayPal, and Authorize.Net.
- **Flexible Payment Management**: Create payment sessions, capture payments, and create payment intents with ease.
- **Error Handling**: Includes robust error handling for different payment providers.
- **Asynchronous Operations**: Uses modern async/await syntax for efficient payment processing.

## 🚀 Getting Started

### Installation
Install the Unipay library via npm
```bash
npm install unifi-payment
```


### Configuration

Configure **Unipay** with the necessary API keys for each payment provider you want to use. Here’s an example of how to set up the configuration:

```javascript
 import Unipay from 'unifi-payment';

 const unipay = new Unipay({
   // Stripe API key
   StripeApiKey: 'your-stripe-api-key',
  
   // Razorpay API key and secret
   RazorpayKeyId: 'your-razorpay-key-id',
   RazorpayKey_secret: 'your-razorpay-key-secret',

   // Authorize.Net API login ID and transaction key
   ApiTransactionKey: 'your-authorize-net-transaction-key',
   apiLoginId: 'your-authorize-net-login-id',

   // PayPal client ID and secret
   PaypalClientSecret: 'your-paypal-client-secret',
   PaypalclientId: 'your-paypal-client-id',
   PaypalMode: 'sandbox', // or 'production'
});
``` 
📚 API Reference

### `Unipay(config)`

-   **config**: `object` - Configuration object with API keys for each gateway:
    -   **Stripe**: `{ StripeApiKey: 'your-stripe-api-key' }`
    -   **Razorpay**: `{ RazorpayKeyId: 'your-razorpay-key-id', RazorpayKey_secret: 'your-razorpay-key-secret' }`
    -   **Authorize.Net**: `{ ApiTransactionKey: 'your-authorize-net-transaction-key', apiLoginId: 'your-authorize-net-login-id' }`
    -   **PayPal**: `{ PaypalClientSecret: 'your-paypal-client-secret', PaypalclientId: 'your-paypal-client-id', PaypalMode: 'sandbox' }`

### `createCheckoutSession(data)`

-   **data**: `object` - Payment session details:
    -   **amount**: `number` - Amount to be charged in the smallest unit of the currency (e.g., cents).
    -   **currency**: `string` - Currency code (e.g., 'USD', 'EUR').
    -   **returnUrl**: `string` - URL to redirect to after successful payment (required for PayPal).
    -   **cancelUrl**: `string` - URL to redirect to if payment is canceled (required for PayPal).
    -   **provider**: `array` - List of providers to use (e.g., `["stripe", "paypal"]`).

### `capturePayment(data)`

-   **data**: `object` - Contains:
    -   **paymentId**: `string` - ID of the payment to capture.
    -   **provider**: `array` - List of providers to use (e.g., `["stripe"]`).

### `createPaymentIntent(data)`

-   **data**: `object` - Contains:
    -   **amount**: `number` - Amount to be charged in the smallest unit of the currency.
    -   **currency**: `string` - Currency code (e.g., 'USD', 'EUR').
    -   **description**: `string` - (Optional) Description of the payment.
    -   **provider**: `array` - List of providers to use (e.g., `["stripe"]`).

## 🛠️ Example Implementations


### Using Multiple Payment Gateways with Unipay
```javascript	
 import Unipay from 'unifi-payment';

 // Initialize Unipay with configuration for multiple gateways
  const unipay = new Unipay({
   // Stripe API key
   StripeApiKey: 'your-stripe-api-key',

   // Razorpay API key and secret
   RazorpayKeyId: 'your-razorpay-key-id',
   RazorpayKey_secret: 'your-razorpay-key-secret',

   // Authorize.Net API login ID and transaction key
   ApiTransactionKey: 'your-authorize-net-transaction-key',
   apiLoginId: 'your-authorize-net-login-id',

   // PayPal client ID and secret
   PaypalClientSecret: 'your-paypal-client-secret',
   PaypalclientId: 'your-paypal-client-id',
   PaypalMode: 'sandbox', // or 'production'
});

 // Define payment details
 const paymentDetails = {
   amount: 5000,
   currency: 'USD',
   returnUrl: 'https://your-site.com/success',
   cancelUrl: 'https://your-site.com/cancel',
   provider: ['stripe', 'razorpay', 'paypal', 'authorizenet'] // List of providers to use
};

// Create checkout sessions with multiple gateways
 unipay.createCheckoutSession(paymentDetails)
   .then(results => {
     console.log('Payment sessions created successfully:', results);
   })
   .catch(error => {
     console.error('Error creating payment sessions:', error);
  });

```
### Using Single Payment Gateways with Unipay

### Stripe

```javascript
 import Unipay from 'unifi-payment';

 const unipay = new Unipay({
   StripeApiKey: 'your-stripe-api-key',
 });

 unipay.createCheckoutSession({
   amount: 1000,
   currency: 'USD',
   provider: ['stripe'],
})
  .then(result => console.log(result))
  .catch(err => console.error(err));` 
```
### Razorpay
```javascript

 import Unipay from 'unifi-payment';

 const unipay = new Unipay({
   RazorpayKeyId: 'your-razorpay-key-id',
   RazorpayKey_secret: 'your-razorpay-key-secret',
});

 unipay.createCheckoutSession({
   amount: 1000,
   currency: 'INR',
   provider: ['razorpay'],
})
  .then(result => console.log(result))
  .catch(err => console.error(err));` 
  ```
### PayPal

```javascript
 import Unipay from 'unifi-payment';

 const unipay = new Unipay({
   PaypalClientSecret: 'your-paypal-client-secret',
   PaypalclientId: 'your-paypal-client-id',
   PaypalMode: 'sandbox', // or 'production'
});

 unipay.createCheckoutSession({
   amount: 50.00,
   currency: 'USD',
   returnUrl: 'https://your-site.com/success',
   cancelUrl: 'https://your-site.com/cancel',
   provider: ['paypal'],
})
  .then(result => console.log(result))
  .catch(err => console.error(err));
  ```

### Authorize.Net

```javascript
import Unipay from 'unifi-payment';

const unipay = new Unipay({
  ApiTransactionKey: 'your-authorize-net-transaction-key',
  apiLoginId: 'your-authorize-net-login-id',
});

unipay.createCheckoutSession({
  amount: 5000,
  currency: 'USD',
  provider: ['authorizenet'],
})
  .then(result => console.log(result))
  .catch(err => console.error(err));
  ```

### createPaymentIntent()

| Gateway        | Supported |
|----------------|-----------|
| Stripe         | ❌        |
| Razorpay       | ❌        |
| PayPal         | ❌        |
| Authorize.Net  | ✔️        |

### createCheckoutSession()

| Gateway        | Supported |
|----------------|-----------|
| Stripe         | ✔️        |
| Razorpay       | ✔️        |
| PayPal         | ✔️        |
| Authorize.Net  | ✔️        |

### capturePayment()
  
| Gateway        | Supported |
|----------------|-----------|
| Stripe         | ✔️        |
| Razorpay       | ✔️        |
| PayPal         | ✔️        |
| Authorize.Net  | ✔️        |


## 💻 Contributing

Contributions to enhance functionality or add more payment gateways are welcome. Please fork the repository and submit a pull request. Make sure to follow the code of conduct and guidelines provided in the repository.




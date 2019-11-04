const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

(async () => {
  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    payment_intent_data: {
      setup_future_usage: 'off_session',
    },
    customer_email: 'customer@example.com',
    line_items: [{
      name: 'T-shirt',
      description: 'Comfortable cotton t-shirt',
      images: ['https://example.com/t-shirt.png'],
      amount: 500,
      currency: 'usd',
      quantity: 1,
    }],
    success_url: 'https://goldwatersystems.com/thanks',
    cancel_url: 'https://goldwatersystems.com/buy',
  });
})();

//
// module.exports.handler = (event, context, callback) => {
//   console.log('createCharge');
//   console.log(event);
//   const requestBody = JSON.parse(event.body);
//   console.log(requestBody);
//
//   const token = requestBody;
//
//   (async () => {
//     const charge = await stripe.charges.create({
//       amount: 999,
//       currency: 'usd',
//       description: 'Example charge',
//       source: token,
//     });
//   })();

  // const amount = requestBody.charge.amount;
  // const currency = requestBody.charge.currency;

  // return stripe.charges.create({ // Create Stripe charge with token
  //   amount,
  //   currency,
  //   description: 'Serverless Stripe Test charge',
  //   source: token,
  // })
  //   .then((charge) => { // Success response
  //     console.log(charge);
  //     const response = {
  //       statusCode: 200,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //       body: JSON.stringify({
  //         message: `Charge processed succesfully!`,
  //         charge,
  //       }),
  //     };
  //     callback(null, response);
  //   })
  //   .catch((err) => { // Error response
  //     console.log(err);
  //     const response = {
  //       statusCode: 500,
  //       headers: {
  //         'Access-Control-Allow-Origin': '*',
  //       },
  //       body: JSON.stringify({
  //         error: err.message,
  //       }),
  //     };
  //     callback(null, response);
  //   })
// };

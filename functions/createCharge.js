const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  console.log('createCharge');
  console.log(event);
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);

  const token = requestBody.token.id;
  const amount = requestBody.charge.amount;
  const currency = requestBody.charge.currency;
  const name = requestBody.name;
  const email = requestBody.email;

  return stripe.charges.create({ // Create Stripe charge with token
    amount: amount,
    currency: currency,
    description: 'Goldwater deposit',
    source: token,
    metadata: {
      name: name,
      email: email
    }
  })
    .then((charge) => { // Success response
      console.log(charge);
      const response = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          message: `Charge processed succesfully!`,
          charge,
        }),
      };
      callback(null, response);
    })
    .catch((err) => { // Error response
      console.log(err);
      const response = {
        statusCode: 500,
        headers: {
          'Access-Control-Allow-Origin': '*',
        },
        body: JSON.stringify({
          error: err.message,
        }),
      };
      callback(null, response);
    })
};

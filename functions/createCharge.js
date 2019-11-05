const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

module.exports.handler = (event, context, callback) => {
  console.log('createCharge');
  console.log(event);
  const requestBody = JSON.parse(event.body);
  console.log(requestBody);

  const token = requestBody.token.id;
  const amount = requestBody.charge.amount;
  const currency = requestBody.charge.currency;
  const name = requestBody.metadata.name;
  const email = requestBody.metadata.email;
  const company = requestBody.metadata.company;
  const phone = requestBody.metadata.phone;
  const installationAddress = requestBody.metadata.installationAddress;
  const sensor = requestBody.metadata.sensor;
  const connectivity = requestBody.metadata.connectivity;
  const plan = requestBody.metadata.plan;
  const quantity = requestBody.metadata.quantity;

  return stripe.customers.create({
    source: token,
    name: name,
    email: email,
    phone: phone,
  }).then((customer) => {
    console.log(customer);
    return stripe.charges.create({ // Create Stripe charge with token
        amount: amount,
        currency: currency,
        description: 'Goldwater Scout AI Core order deposit',
        receipt_email: email,
        customer: customer.id,
        metadata: {
          name: name,
          email: email,
          company: company,
          phone: phone,
          installationAddress: installationAddress,
          sensor: sensor,
          connectivity: connectivity,
          plan: plan,
          quantity: quantity,
        },
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
      });
  })

};

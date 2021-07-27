const { stripeSecretKey } = require('../config/keys');
// eslint-disable-next-line import/order
const stripe = require('stripe')(stripeSecretKey);
const requireAuth = require('../middleware/requireAuth');

module.exports = (app) => {
  app.post('/api/stripe', requireAuth, async (req, res) => {
    await stripe.charges.create({
      amount: 500,
      currency: 'usd',
      description: '$5 for 5 credits',
      source: req.body.id,
    });

    req.user.credits += 5;
    res.send(await req.user.save());
  });
};

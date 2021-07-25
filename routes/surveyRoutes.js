const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys', requireAuth, (req, res) => {

  });

  app.post('/api/surveys/webhooks', (req, res) => {

  });

  app.post('/api/surveys', requireAuth, requireCredits(1), async (req, res) => {
    const { title, subject, body, recipients } = req.body;
    const survey = new Survey({
      title,
      subject,
      body,
      recipients: recipients.split(',').map((e) => ({ email: e.trim() })),
      _user: req.user.id,
      dateSent: Date.now(),
    });
    await survey.save();
  });
};

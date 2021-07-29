const mongoose = require('mongoose');
const requireAuth = require('../middleware/requireAuth');
const requireCredits = require('../middleware/requireCredits');
const Mailer = require('../services/Mailer');
const surveyTemplate = require('../services/emailTemplates/surveyTemplate');
const { redirectDomain } = require('../config/keys');

const Survey = mongoose.model('surveys');

module.exports = (app) => {
  app.get('/api/surveys/:surveyId/:choice', (req, res) => {
    res.send('Thanks for voting!');
  });

  app.get('/api/surveys', requireAuth, async (req, res) => {
    const surveys = await Survey.find({
      _user: req.user.id,
    }).select({
      recipients: false,
    });

    res.send(surveys);
  });

  app.post('/api/surveys/webhook', (req, res) => {
    req.body
      .filter(({ event }) => event === 'click')
      .filter(({ url }) => url.startsWith(`${redirectDomain}/api/surveys/`))
      .forEach(({ email, url }) => {
        const tokens = url.split('/');
        const surveyId = tokens[tokens.length - 2];
        const choice = tokens[tokens.length - 1];

        Survey.updateOne({
          _id: surveyId,
          recipients: {
            $elemMatch: { email, responded: false },
          },
        }, {
          $inc: { [choice]: 1 },
          $set: { 'recipients.$.responded': true },
          $currentDate: { lastResponded: true },
        }).exec();
      });

    return res.sendStatus(200);
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

    const mailer = new Mailer(survey, surveyTemplate(survey));
    try {
      await mailer.send();
      await survey.save();
      req.user.credits -= 1;
      const user = await req.user.save();
      res.send(user);
    } catch (err) {
      res.status(422).send(err);
    }
  });
};

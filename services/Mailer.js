const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const { sendGridApiKey } = require('../config/keys');

class Mailer extends helper.Mail {
  constructor({ subject, recipients }, content) {
    super();

    this.sgApi = sendgrid(sendGridApiKey);
    this.from_email = new helper.Email('atengamnuay@gmail.com');
    this.subject = subject;
    this.body = new helper.Content('text/html', content);
    this.recipients = recipients.map((r) => new helper.Email(r.email));

    this.addContent(this.body);
    this.addClickTracking();
    this.addRecipients();
  }

  addClickTracking() {
    const trackingSettings = new helper.TrackingSettings();
    trackingSettings.setClickTracking(new helper.ClickTracking(true, true));
    this.addTrackingSettings(trackingSettings);
  }

  addRecipients() {
    const personalize = new helper.Personalization();
    this.recipients.forEach((r) => personalize.addTo(r));
    this.addPersonalization(personalize);
  }

  async send() {
    return this.sgApi.API(this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON(),
    }));
  }
}

module.exports = Mailer;

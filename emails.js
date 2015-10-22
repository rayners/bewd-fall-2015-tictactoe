'use strict';

var SparkPost = require('sparkpost');

var client = new SparkPost(); // uses process.env.SPARKPOST_API_KEY
var from = 'test@rayners.bewd-fall15.com'; // 'test@sparkpostbox.com'

var host_url = 'http://morning-crag-3336.herokuapp.com/';

function sendUserVerificationEmail(user) {
  var txObject = { transmissionBody: {
    campaign: 'email-verification',
    content: {
      from: from,
      subject: 'Please verify your email address',
      text: 'Hello world ' + host_url + 'users/verify?k=' + user.emailKey
    },
    recipients: [
        { address: user.email }
      ]
    }
  };

  var txResponseHandler = function txResponseHandler(err, data) {
    if(err) {
      console.error('ERROR: ', err);
      new Error(err);
    } else {
      console.log('WOOHOO, Transmission accepted by SparkPost!');
      console.log(data);
    }
  };

  // Simplify sending transmission and response handling using the SparkPost Node SDK Transmission request
  client.transmissions.send(txObject, txResponseHandler);
}

function sendReminderEmails(boards) {
  // do stuff
}

module.exports = {
  sendUserVerificationEmail: sendUserVerificationEmail,
  sendReminderEmails: sendReminderEmails
};

const express = require('express')
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express()
const port = 3000;
//  Pulls in API key from env variable source the file from terminal.
// sgMail.setApiKey('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');
sgMail.setApiKey('//Put API Key here');

app.use(bodyParser.json());

// Perhaps with a nodejs templating engine down the line we can do /templates/:templateName
app.post('/templates/:templateID', (req, res) => {
    const msg = {
        to: req.body.recipient,
        from: req.body.sender,
        subject: req.body.subject,
        /* Possible template IDs at the moment:
         * d-004a6537cdf84a849573f4f2f51b9cf7 Template01: One column
         * d-c960938547f3433f843160f695c6192f Template02: Two Column
         */
        templateId: req.params.templateID,
        dynamic_template_data: {
          username: req.body.username,
          body: req.body.body,
          url: req.body.url
        },
      };

      sgMail.send(msg).then(() => {
        return res.send('Email has been sent!');
      }).catch((error) => {
        res.status(500)
        //oops!
        return res.send(error);
      })
});

app.listen(port, () => console.log(`App listening on port ${port}!`))
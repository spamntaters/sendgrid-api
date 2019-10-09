const express = require('express')
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express()
const port = 3000;
//  Pulls in API key from env variable source the file from terminal.
// sgMail.setApiKey('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');
sgMail.setApiKey('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');

app.use(bodyParser.json());

// Perhaps with a nodejs templating engine down the line we can do /templates/:templateName
app.post('/templates/:templateID', (req, res) => {
    const msg = {
        to: req.body.recipient,
        from: req.body.sender,
        subject: req.body.recipient,
        /* Possible template IDs at the moment:
         * d-7537e4854e2c485d8f9cd2c6d27e77bc Template01: One column
         * d-28c0459b7d944631a02875863e032181 Template02: Two Column
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
const express = require('express')
const bodyParser = require('body-parser');
const sgMail = require('@sendgrid/mail');

const app = express()
const port = 3000;
//  Pulls in API key from env variable source the file from terminal.
sgMail.setApiKey('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');


app.use(bodyParser.json());

// Perhaps with a nodejs templating engine down the line we can do /templates/:templateName
app.post('/templates/:templateID', (req, res) => {
    const msg = {
        to: req.body.recipient,
        from: req.body.sender,
        subject: req.body.recipient,
        /* Possible template IDs at the moment:
         * d-2f299cb6611e4054ab4ced10df8f9af2 Template01: One column
         * d-a624e35c613740328678d97b6eeb829b Template02: Two Column
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
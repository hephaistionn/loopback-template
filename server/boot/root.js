'use strict';
var path = require('path');
var sendmail = require('sendmail')();

module.exports = function(server) {
  // Install a `/` route that returns server status
  var router = server.loopback.Router();
  router.get('/status', server.loopback.status());

  router.get('/hostname',  function(req, res) {
  	res.send(  	process.env.HOST_NAME);
  }); 

  router.get('/mailer', function(req, res) {

  	var host = process.env.HOST_NAME;
    var port = process.env.PORT;
    var protocol = process.env.PROTOCOL;

    var url = '{PROTOCOL}://{HOST_NAME}{PORT}/'
    .replace('{PROTOCOL}', protocol)
    .replace('{HOST_NAME}', host)
    .replace('{PORT}', ':'+port); 
    var options = {
      type: 'email',
      to: 'alexandre.monge.mail@gmail.com',
      from: 'noreply@'+host.replace('localhost', 'stenchon.fr'),
      subject: 'test',
      verifyHref:  'http://localhost:3000/status',
      text:'email test'
    };

    console.log(options);

  	return app.models.Email.send(
  		options
  	).then(function(response){
          console.log(response);
      	res.send('sended');
  	}).catch(function(err){
        console.log(err)
         res.send('sended fail');
    });

  });

  server.use(router);

};

'use strict';
var path = require('path');

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
      from: 'noreply@'+host,
      subject: 'test',
      verifyHref:  'http://localhost:3000/status',
      text:'email test'
    };

  	return server.loopback.Email.send(
  		options
	).then(function(response){
        console.log(response);
    	res.send('sended');
	}).catch(function(err){});
        console.log('Upppss something crash', err.response.body.errors[0]);
        res.send('sended fail');
	});

  server.use(router);
};




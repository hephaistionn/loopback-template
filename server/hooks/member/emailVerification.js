var path = require('path');

module.exports = function(member) {
  //send verification email after registration
  member.afterRemote('create', function(context, userInstance, next) {
    var host = process.env.HOST_NAME;
    var port = process.env.PORT;
    var protocol = process.env.PROTOCOL;

    var url = '{PROTOCOL}://{HOST_NAME}{PORT}/'
    .replace('{PROTOCOL}', protocol)
    .replace('{HOST_NAME}', host)
    .replace('{PORT}', ':'+port); 

    var options = {
      type: 'email',
      to: userInstance.email,
      from: 'noreply@'+host,
      subject: 'Thanks for registering.',
      template: path.resolve(__dirname, '../../templates/verify.ejs'),
      redirect: url,
      host: host,
      user: member,
      title: 'Signed up successfully',
      content: ' Thanks for registering. Please follow the link below to complete your registration.',
      redirectToLinkText: 'Log in'
    };

    userInstance.verify(options, function(err, response, next) {
      if (err) {
        console.log(err.response.body.errors[0])
        return next(err);
      } 
      context.res.send(response.email);
    });
  });
}
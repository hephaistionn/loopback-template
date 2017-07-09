var path = require('path');
module.exports = function(Member) {
  //send verification email after registration
  Member.afterRemote('create', function(context, userInstance, next) {
    return userInstance.createAccessToken(86400).then(tokenData => {
      var host = process.env.HOST_NAME;
      var port = ':'+ process.env.PORT;
      var protocol = process.env.PROTOCOL;
      var token = tokenData.id;
      var id = tokenData.userId;
      var email = userInstance.email;

      var url = '{PROTOCOL}://{HOST_NAME}{PORT}/?token={token}&id={id}'
        .replace('{PROTOCOL}', protocol)
        .replace('{HOST_NAME}', host)
        .replace('{PORT}', port)
        .replace('{token}', token)
        .replace('{id}', id);

      var options = {
        type: 'email',
        to: email,
        from: 'noreply@'+host,
        subject: 'Thanks for registering.',
        template: path.resolve(__dirname, '../../templates/verify.ejs'),
        redirect: url,
        host: host,
        user: Member,
        title: 'Signed up successfully',
        content: ' Thanks for registering. Please follow the link below to complete your registration.',
        redirectToLinkText: 'Log in'
      };

      userInstance.verify(options, function(err, response, next) {
        if (err) {
          console.log(err.response.body.errors[0]);
          return next(err);
        }
        context.res.send(response.email);
      });

    });

  });
}
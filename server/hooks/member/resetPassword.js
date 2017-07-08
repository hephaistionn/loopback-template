var path = require('path');
var loopback = require('loopback');

module.exports = function(Member) {
  Member.on('resetPasswordRequest', function(modelInstance) {
      var host = process.env.HOST_NAME;
      var port = ':'+ process.env.PORT;
      var protocol = process.env.PROTOCOL;
      var token = modelInstance.accessToken.id;
      var email = modelInstance.email;
      var id = modelInstance.user.id;
      var username = modelInstance.user.username;
      
      var url = '{PROTOCOL}://{HOST_NAME}{PORT}/reset/?token={token}&id={id}'
        .replace('{PROTOCOL}', protocol)
        .replace('{HOST_NAME}', host)
        .replace('{PORT}', port)
        .replace('{token}', token)
        .replace('{id}', id);

      var render = loopback.template(path.resolve(__dirname, '../../templates/reset.ejs'));
      var html = render({
          link: url,
          username: username,
          title: 'Password reset',
          content: 'A password change request has been requested. If you want to change your password click on the link below.',
          redirectToLinkText: 'Reset'
      });

      var options = {
        type: 'email',
        to: email,
        from: 'reset@'+host,
        subject: 'Password reset',
        html: html
      };

      Member.app.models.Email.send(options, function(err) {
        if (err) {
          console.log(err.response.body.errors[0])
        } 
      });
  });
}
var path = require('path');
var loopback = require('loopback');

module.exports = function(Member) {
    Member.on('resetPasswordRequest', modelInstance => {
        const host = process.env.HOST_NAME;
        const port = ':' + process.env.PORT;
        const protocol = process.env.PROTOCOL;
        const token = modelInstance.accessToken.id;
        const email = modelInstance.email;
        const id = modelInstance.user.id;
        const username = modelInstance.user.username;
        const hostmail = host.includes('.') ? host : host + '.com';

        const url = `${protocol}://${host}${port}/reset/?token=${token}&$id=${id}`;

        const render = loopback.template(path.resolve(__dirname, '../../templates/reset.ejs'));
        const html = render({
            link: url,
            username: username,
            title: 'Password reset',
            content: 'A password change request has been requested. If you want to change your password click on the link below.',
            redirectToLinkText: 'Reset'
        });

        const options = {
            type: 'email',
            to: email,
            from: `reset@${hostmail}`,
            subject: 'Password reset',
            html: html
        };

        Member.app.models.Email.send(options, function(err) {
            if(err) {
                console.log(err.response.body.errors[0])
            }
        });
    });
}
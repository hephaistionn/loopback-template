var path = require('path');
module.exports = function(Member) {
    //send verification email after registration
    Member.afterRemote('create', function(context, userInstance) {
        return userInstance.createAccessToken(86400).then(tokenData => {
            const host = process.env.HOST_NAME;
            const port = process.env.PORT ? ':' + process.env.PORT : '';
            const protocol = process.env.PROTOCOL;
            const token = tokenData.id;
            const id = tokenData.userId;
            const email = userInstance.email;
            const hostmail = host.includes('.') ? host : host + '.com';

            const url = `${protocol}://${host}${port}/?token=${token}&id=${id}`;

            const options = {
                type: 'email',
                to: email,
                from: `reset@${hostmail}`,
                subject: 'Thanks for registering.',
                template: path.resolve(__dirname, '../../templates/verify.ejs'),
                redirect: url,
                host: host,
                user: Member,
                title: 'Signed up successfully',
                content: ' Thanks for registering. Please follow the link below to complete your registration.',
                redirectToLinkText: 'Log in'
            };

            userInstance.verify(options, (err, response, next) => {
                if(err) {
                    console.log(err.response.body.errors[0]);
                    return next(err);
                }
                context.res.send(response.email);
            });

        });

    });
};
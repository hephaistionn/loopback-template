'use strict';

module.exports = function(server) {
    // Install a `/` route that returns server status
    const router = server.loopback.Router();
    router.get('/status', server.loopback.status());

    router.get('/hostname', (req, res) => {
        res.send(process.env.HOST_NAME);
    });

    router.get('/mailer', (req, res) => {

        const host = process.env.HOST_NAME;
        const port = process.env.PORT ? ':' + process.env.PORT : '';
        const protocol = process.env.PROTOCOL;
        const hostmail = host.includes('.') ? host : host + '.com';

        const url = `${protocol}://${host}${port}/`;

        console.log(url);

        const options = {
            type: 'email',
            to: 'alexandre.monge.mail@gmail.com',
            from: `reset@${hostmail}`,
            subject: 'test',
            verifyHref: 'http://localhost:3000/status',
            text: 'email test'
        };

        console.log(options);

        return server.loopback.Email.send(options)
            .then(response => {
                console.log(response);
                res.send('sended');
            }).catch(err => {
                console.log(err);
                res.send('sended fail');
            });

    });

    server.use(router);

};

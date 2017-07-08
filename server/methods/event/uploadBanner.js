var upload = require('../../common/upload');

module.exports = function(Event) {

 Event.uploadBanner = function(context, eventId, req) {
        console.log('---uploadBanner---');
        return upload(req.accessToken.userId, eventId, Event, 'banner', context);
  };

  Event.remoteMethod(
        'uploadBanner', {
            description: 'upload banner',
            http: {path: '/:eventId/uploadBanner', verb: 'post'},
            accepts: [
                {arg: 'context', type: 'object', http: {source: 'context'}},
                {arg: 'eventId', type: 'string', http: {source: 'path'}, required: true},
                {arg: 'req', type: 'object', 'http': {source: 'req'}}
            ],
            returns: {
                type: 'string', root: true
            }
        });

}

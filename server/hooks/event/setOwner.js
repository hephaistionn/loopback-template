var setOwner = require('../../common/setOwner');

module.exports = function(Event) {
    Event.beforeRemote('create', setOwner);
};

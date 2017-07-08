var path = require('path');
var loopback = require('loopback');

module.exports = function(Member) {
  Member.afterRemote('confirm', function(context, modelInstance, next) {
    Member.findById(context.args.uid).then(member => {

    });
  })
};
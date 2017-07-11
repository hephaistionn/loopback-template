module.exports = function setOwner(context, instance, next) {
    context.args.data.ownerId = context.req.accessToken.userId;
    next();
};

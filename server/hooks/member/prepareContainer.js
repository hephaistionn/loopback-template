module.exports = function(Member) {
    Member.afterRemote('confirm', (context) => {
        Member.findById(context.args.uid).then(member => {
            console.log(`new member : ${member}`);
        });
    })
};
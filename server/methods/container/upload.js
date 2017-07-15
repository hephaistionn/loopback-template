'use strict';
const Promise = require("bluebird");

module.exports = function(Container) {
    Container.uploadFile = (context, req) => {
        const userId = req.accessToken.userId;
        const containerId = `container${userId}`;
        const Member = Container.app.models.Member;
        let member;

        return getMember()
            .then(checkContainerExistence)
            .then(createContainer)
            .then(getMemberFiles)
            .then(getContainerFiles)
            .then(deleteUserlessFiles)
            .then(uploadFile)
            .then(response);

        function getMember() {
            return Member.find({
                where: {
                    id: userId
                },
                include: [{
                    relation: 'events',
                    scope: {
                        fields: ['banner']
                    }
                }]
            }).then(instance => {
                member = instance[0];
            });
        }

        function checkContainerExistence() {
            const deferred = Promise.defer();
            Container.getContainer(containerId, (err, data)=> {
                if(err)
                    deferred.resolve();
                else
                    deferred.resolve(data);
            });
            return deferred.promise;
        }

        function createContainer(hasContainer) {
            if(hasContainer) return;
            const deferred = Promise.defer();
            Container.createContainer({name: containerId}, (err, data) => {
                return (err) ? deferred.reject(err) : deferred.resolve(data);
            });
            return deferred.promise;
        }

        function getMemberFiles() {
            const currentFiles = [];
            if(member.avatar)
                currentFiles.push(member.avatar);
            const deferred = Promise.defer();
            member.events.getAsync((err, events) => {
                events.map(event=> {
                    if(event.banner)
                        currentFiles.push(event.banner);
                });
                deferred.resolve(currentFiles);
            });

            return deferred.promise;
        }

        function getContainerFiles(currentFiles) {
            const userless = [];
            const deferred = Promise.defer();
            Container.getFiles(containerId, (err, files)=> {
                if(err) deferred.reject(err);
                files.map((file)=> {
                    const fileUrl = urlCompose(file.container, file.name);
                    if(currentFiles.indexOf(fileUrl) === -1) {
                        userless.push(file.name);
                    }
                });
                deferred.resolve(userless)
            });
            return deferred.promise;
        }

        function deleteUserlessFiles(userless) {
            if(!userless.length) return;
            const deferred = Promise.defer();
            Promise.map(userless, fileName => {
                Container.removeFile(containerId, fileName, (err, data)=> {
                    return (err) ? deferred.reject(err) : deferred.resolve(data);
                });
            });
            return deferred.promise;
        }

        function uploadFile() {
            const deferred = Promise.defer();
            context.req.params.container = containerId;
            Container.upload(context.req, context.res, (err, data) => {
                return (err) ? deferred.reject(err) : deferred.resolve(data);
            });
            return deferred.promise;
        }

        function response(responseUpload) {
            const file = responseUpload.files.file[0];
            return urlCompose(file.container, file.name);
        }

        function urlCompose(containerName, fileName) {
            return '/api/Containers/' + containerName + '/download/' + fileName;
        }
    };

    Container.remoteMethod(
        'uploadFile', {
            description: 'upload banner',
            http: {path: '/upload', verb: 'post'},
            accepts: [
                {arg: 'context', type: 'object', http: {source: 'context'}},
                {arg: 'req', type: 'object', 'http': {source: 'req'}}
            ],
            returns: {
                type: 'string', root: true
            }
        });
};

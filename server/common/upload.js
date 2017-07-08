var path = require('path');
var _ = require('lodash');

module.exports = function(userId, modelId, Model, fieldName, context) {

    const Container = Model.app.models.Container;
    const Member = Model.app.models.Member;

    let member;
    let model;
    let containerId;

    function getMemeber(instance) {
        member = instance;
        containerId  = 'container' + member.id.toString();
    }

    function getModel(){
        return Model.findById(modelId)
        .then(instance =>{
            model = instance;
            console.log(model)
        })
    }


    function checkContainerExistence() {
        var deferred = Promise.defer();
        Container.getContainer(containerId, (err, data)=>{
            return (err) ? deferred.reject(err) : deferred.resolve(data);
        });
        return deferred.promise;
    }

    function createContainer() {
        var deferred = Promise.defer();
        Container.createContainer({name: containerId}, (err, data) => {
            return (err) ? deferred.reject(err) : deferred.resolve(data);
        });
        return deferred.promise;
    }

    function removePreviousFile() {
        if(!model[fieldName]) return;
        const fileName =  model[fieldName].split('/').pop();
        if(!fileName) return;
        var deferred = Promise.defer();
        Container.removeFile(containerId, fileName, (err, data) => {
            return deferred.resolve(data);
        });
        return deferred.promise;  
    }

    function uploadFile() {
        var deferred = Promise.defer();
        context.req.params.container = containerId;
        Container.upload(context.req, context.res,(err, data) => {
            return (err) ? deferred.reject(err) : deferred.resolve(data);
        });
        return deferred.promise;
    }

    function saveNewFile(newFile) {
        console.log('-----saveNewFile');
        const file = newFile.files.banner[0];
        console.log(file);
        const containerName =  file.container;
        const fileName = file.name;
        model[fieldName] = '/api/Containers/'+containerName+'/download/'+fileName;
        return model.save();
    }

    function response() {
        return 'upload success';
    }

    return Member.findById(userId)
    .then(getMemeber)
    .then(getModel)
    .then(checkContainerExistence)
    .catch(createContainer)
    .then(removePreviousFile)
    .then(uploadFile)
    .then(saveNewFile)
    .then(response);

};

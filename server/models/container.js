'use strict';

module.exports = function(Container) {
    /*
     * Remote Methods
     */
    /*
     * Remote Hooks
     */
    /*
     * Listeners
     */

    Container.disableRemoteMethod('getContainers', true);
    Container.disableRemoteMethod('getContainer', true);
    Container.disableRemoteMethod('createContainer', true);
    Container.disableRemoteMethod('destroyContainer', true);
    Container.disableRemoteMethod('getFiles', true);
    Container.disableRemoteMethod('removeFile', true);
    Container.disableRemoteMethod('upload', true);
};

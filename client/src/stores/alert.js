import Reflux from 'reflux';

//Action
export const actionsAlert = Reflux.createActions(['success', 'warning', 'error', 'remove']);

//Store
export class StoreAlert extends Reflux.Store {

    constructor() {
        super();
        this.listenables = actionsAlert;
        this.state = {
            alerts: []
        };
        this.duration = 4000;
        this.timeouts = [];
    }

    onSuccess(message) {
        this.onAdd(message, 'success');
    }

    onWarning(message) {
        this.onAdd(message, 'warning');
    }

    onError(message) {
        this.onAdd(message, 'error');
    }

    onAdd(message, type) {
        this.state.alerts.push({
            message: message,
            type: type,
            timeout: setTimeout(()=> {
                actionsAlert.remove()
            }, this.duration)
        });
        this.setState({alerts: this.state.alerts});
    }

    onRemove(index) {
        const alert = this.state.alerts.splice(index || 0, 1)[0];
        clearTimeout(alert.timeout);
        this.setState({alerts: this.state.alerts});
    }

}
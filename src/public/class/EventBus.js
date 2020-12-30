export default class {
    events = {};
    addListen(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new Set();
        }
        this.events[eventName].add(callback);
        return () => {
            this.removeListen(eventName, callback);
        };
    }
    removeListen(eventName, callback) {
        this.events[eventName]?.delete(callback);
    }
    trigger(eventName, params) {
        this.events[eventName]?.forEach((cb) => {
            cb(params);
        });
    }
}

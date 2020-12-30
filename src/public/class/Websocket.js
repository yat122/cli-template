class EventWebsocket {
    events = {};

    open(url) {
        if (this.isConnected) {
            return;
        }
        this.ws = new WebSocket(url);
        this.isConnected = false;
        this.ws.onmessage = ({ data: params }) => {
            if (params) {
                try {
                    const { event, data } = JSON.parse(params);
                    if (this.events[event]) {
                        this.events[event].forEach((cb) => {
                            cb(data);
                        });
                    }
                } catch (e) {
                    console.log(e);
                }
            }
        };
        this.ws.onopen = () => {
            this.isConnected = true;
        };
    }
    close() {
        this.ws.close();
        this.isConnected = false;
    }
    addListen(eventName, callback) {
        if (!this.events[eventName]) {
            this.events[eventName] = new Set();
        }
        this.events[eventName].add(callback);
    }
    removeListen(eventName, callback) {
        this.events[eventName]?.delete(callback);
    }
    send(event, data) {
        if (!this.isConnected) return;
        console.log("发送", event, data);
        this.ws.send(
            JSON.stringify({
                code: 0,
                event,
                data,
            }),
        );
    }
}

export default EventWebsocket;

export const SocketEvent = {
    DeviceStatusChange: "DeviceStatusChange", //设备状态改变 {deviceId:设备id,status:状态}
    PushWarning: "PushWarning", //警告推送 {推送详情内容}
    DataUpdate: "DataUpdate", //数据改变(读取到新数据)
};

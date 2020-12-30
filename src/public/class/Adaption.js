import { debounce } from "@/public/util";

class Adaption {
    #events = new Set();

    constructor({ baseSize = 1080, resizeBy = "height" } = {}) {
        this.baseSize = baseSize;
        this.resizeBy = resizeBy;
        this.deviceSize = this.#getDeviceSize();
    }

    #getDeviceSize() {
        if (this.resizeBy === "height") {
            return (
                document.documentElement.clientHeight ||
                document.body.clientHeight ||
                document.innerHeight ||
                0
            );
        }
        if (this.resizeBy === "width") {
            return (
                document.documentElement.clientWidth ||
                document.body.clientWidth ||
                document.innerWidth ||
                0
            );
        }
        return 0;
    }

    #setDocFontSize() {
        document.documentElement.style.fontSize = this.fontSize(100) + "px";
    }

    add(callback) {
        this.#events.add(callback);
    }

    delete(callback) {
        this.#events.delete(callback);
    }

    init() {
        window.addEventListener(
            "resize",
            debounce(() => {
                this.deviceSize = this.#getDeviceSize();
                this.#setDocFontSize();
                this.#events.forEach((callback) => {
                    callback();
                });
            }, 300),
        );
        this.setDocFontSize();
    }

    fontSize(size) {
        return size * (this.deviceSize / this.baseSize);
    }
}

export default Adaption;

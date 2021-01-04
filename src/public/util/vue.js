import Vue from "vue";

export function staticComputer(init) {
    let deliver = init;
    const state = Vue.observable({ toolMan: false });

    return {
        get() {
            !state.toolMan;
            return deliver;
        },
        set(val) {
            this.toolMan = !this.toolMan;
            deliver = val;
        },
    };
}

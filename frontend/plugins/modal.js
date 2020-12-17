let eventMixin = {

    on(eventName, handler) {
        if (!this._eventHandlers) this._eventHandlers = {};
        if (!this._eventHandlers[eventName]) {
            this._eventHandlers[eventName] = [];
        }
        this._eventHandlers[eventName].push(handler);
    },


    off(eventName, handler) {
        let handlers = this._eventHandlers && this._eventHandlers[eventName];
        if (!handlers) return;
        for (let i = 0; i < handlers.length; i++) {
            if (handlers[i] === handler) {
                handlers.splice(i--, 1);
            }
        }
    },


    trigger(eventName, ...args) {
        if (!this._eventHandlers || !this._eventHandlers[eventName]) {
            return; // обработчиков для этого события нет
        }

        // вызовем обработчики
        this._eventHandlers[eventName].forEach(handler => handler.apply(this, args));
    }
};
class ModalController {
    constructor() {
        Object.assign(this, eventMixin)
    }

    open(name, { props, on } = {}) {
        this.trigger('open', { name, props, on })
        this._open()

    }
    _open() {
    }
    close() {
        this.trigger('close', name)
        this._close()
    }
    _close() {

    }
}
export default ({ app }, inject) => {
    const controller = new ModalController
    inject('modal', controller)

}
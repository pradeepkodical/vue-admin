import store from '../store'

export default class ProgressServices {
    static show() {
        store.dispatch('progress/show');
    }
    static hide() {
        store.dispatch('progress/hide');
    }
}

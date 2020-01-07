import dispatcher from "./Dispatcher";
import {EventEmitter} from "events";
import * as AppActions from "./AppActions";

class AppStore extends EventEmitter {

    constructor() {
        super();
        this.isLoading = false;
    }

    handleActions(action) {
        switch (action.type) {
            case AppActions.APP_ACTIONS.IS_LOADING: {
                this.isLoading = action.value;
                this.emit("storeUpdated");
                break;
            }
            default: {
            }
        }
    }

    isAppLoading() {
        return this.isLoading;
    }
}

const appStore = new AppStore();
dispatcher.register(appStore.handleActions.bind(appStore));
export default appStore;
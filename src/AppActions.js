import dispatcher from "./Dispatcher";

export const APP_ACTIONS = {
    IS_LOADING: 'appActions.IsLoading'
};

export function isLoading(loading) {
    dispatcher.dispatch({
        type: APP_ACTIONS.IS_LOADING,
        value: loading
    })
}
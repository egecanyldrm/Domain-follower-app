import { createStore, combineReducers } from 'redux';
import reducer from './Reducer';

export default () => {
    const store = createStore(combineReducers({
        global_state : reducer
    })
    );
    return store;
}
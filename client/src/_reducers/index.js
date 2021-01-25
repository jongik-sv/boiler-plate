import { combineReducers } from 'redux';
import user from './user_reducer';

// 여러 reducer를 combineReducers를 통해 rootReducer로 합쳐주는 역할
const rootReducer = combineReducers({
    user
});

export default rootReducer;
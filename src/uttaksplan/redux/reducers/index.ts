import { combineReducers } from 'redux';

import formReducer from './formReducer';
import utsettelseReducer from './utsettelseReducer';
import viewReducer from './viewReducer';

const PlanleggerAppReducer = combineReducers({
    form: formReducer,
    utsettelse: utsettelseReducer,
    view: viewReducer
});

export default PlanleggerAppReducer;

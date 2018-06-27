import { combineReducers } from 'redux';

import formReducer from './formReducer';
import uttaksplanReducer from './uttaksplanReducer';
import viewReducer from './viewReducer';

const UttaksplanReducer = combineReducers({
    form: formReducer,
    uttaksplan: uttaksplanReducer,
    view: viewReducer
});

export default UttaksplanReducer;

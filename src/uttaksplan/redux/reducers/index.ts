import { combineReducers } from 'redux';

import formReducer from './formReducer';
import periodeReducer from './periodeReducer';
import viewReducer from './viewReducer';

const UttaksplanReducer = combineReducers({
    uttaksplanForm: formReducer,
    periode: periodeReducer,
    view: viewReducer
});

export default UttaksplanReducer;

import { combineReducers } from 'redux';
import AuthReducer from './Auth/AuthReducer';
// import FbReducer from './FacebookAuthReducer';

import EmployeeFormReducer from './Employee/EmployeeFormReducer';
import EmployeeReducer from './Employee/EmployeeReducer';


import CalendarReducer from './Employee/CalendarReducer';

export default combineReducers({
  auth: AuthReducer,
  // fb_auth: FbReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  calendar: CalendarReducer
})
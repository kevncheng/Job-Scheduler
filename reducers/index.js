import { combineReducers } from 'redux';
import AuthReducer from './AuthReducer';
import FbReducer from './FacebookAuthReducer';
import EmployeeFormReducer from './EmployeeFormReducer';
import EmployeeReducer from './EmployeeReducer';
import EmployeeEditReducer from './EmployeeEditReducer';

export default combineReducers({
  auth: AuthReducer,
  fb_auth: FbReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  selectedEmployee: EmployeeEditReducer
})
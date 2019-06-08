import { combineReducers } from 'redux';
import AuthReducer from './Auth/AuthReducer';
import FbReducer from './FacebookAuthReducer';

import EmployeeFormReducer from './Employee/EmployeeFormReducer';
import EmployeeReducer from './Employee/EmployeeReducer';


import AnnouncementReducer from './Announcement/AnnouncementReducer';
import AnnouncementFetchReducer from './Announcement/AnnouncementReducer';

import CalendarReducer from './Employee/CalendarReducer';

export default combineReducers({
  auth: AuthReducer,
  fb_auth: FbReducer,
  employeeForm: EmployeeFormReducer,
  employees: EmployeeReducer,
  announcementForm: AnnouncementReducer,
  announcements: AnnouncementFetchReducer,
  calendar: CalendarReducer
})
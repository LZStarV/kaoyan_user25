import http from '../utils/http';

export const getCalendar = (data) => http.get('/calendar/list', data);

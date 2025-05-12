import http from '../utils/http'

export const getCalendar=(data)=>{
  return http.get('/calendar/list',data);
}
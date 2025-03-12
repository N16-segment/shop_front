
//회원과 관련된 모든 axios내용

import axios from "axios"

//회원가입
export const regUser = (userData) => {
  const respanse = axios.post('/api/users', userData);
  return respanse;
}

//회원등록조회
export const getUserList = () => {
  const respanse = axios.get('/api/users');
  
  return respanse;
}
//로그인 
//params : 로그인 데이터는 객체형태로
//loginData{userId:'aa', userPw:'111'}
export const loginUser = (loginData) => {
  const respanse = axios.get('api/users/login',
    {params:loginData}
  )
  return respanse;
}

import React, { useState } from 'react'
import styles from './Login.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import axios from 'axios'
import { loginUser } from '../apis/userApi'
/**
 * axios.get 으로 여러 데이터를 전달하는 방법
 * axios.get('url), {params:{전달한 데이터}}
 * 
 * 전달할 데이터는 객체형식으로 전달
 * 
 * 위의 방식으로 전달한 데이터는 스프링에서 
 * 1. RequestParam 어노테이션을 사용해서 받거나,
 * 2. DTO 객체로 데이터를 받으면 된다.
 * ps.리액트 2번 pdf Query String으로 전달된 데이터를 받는 방식과 일치
 * (페이지 번호 23번)
*/
const Login = () => {
  //회원이 입력한 로그인 정보를 저장하는 변수
  const [loginaData, setLoginData] = useState({
    userId : '',
    userPw : ''
  });

  const changeLoginData = (e) => {
    setLoginData({
      ...loginaData,
      [e.target.name] : e.target.value
    });
  }
  //로그인한 정보를 조회
  const login = () =>{
    loginUser(loginaData)
    .then(res=>{
      console.log(res.data);
      //자바에서 null데이터가 넘어오면 ''(빈문자)로 받는다.
      if(res.data === ''){
        alert('로그인 실패');
      }
      else{
        alert('로그인 성공');
      }

    })
    .catch(error=>console.log(error));
  }
  
  
  return (
    <div className={styles.container}>
      <h3>로그인</h3>
      <div className={styles.contentContainer}>
        <div>
          <p>아이디</p>
          <ShopInput 
          name='userId'
          values={loginaData.userId}
          onChange={e=>changeLoginData(e)}
          size='wide'/>
        </div>
        <div>
          <p>비밀번호</p>
          <ShopInput size='wide' 
          name='userPw'
          values={loginaData.userPw}
          onChange={e=>changeLoginData(e)}
          type='password'/>
        </div>
        <div>
          <ShopButton title='로그인'
          click={()=>{login()}}/>
        </div>
      </div>
    </div>
  )
}

export default Login
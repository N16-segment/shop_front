
import React, { useState } from 'react'
import styles from './Login.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import axios from 'axios'
import { loginUser } from '../apis/userApi'
import { useNavigate } from 'react-router-dom'
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
const Login = ({setLoginInfo}) => {
  const nav = useNavigate();
  //회원이 입력한 로그인 정보를 저장하는 변수
  const [loginData, setLoginData] = useState({
    userId : '',
    userPw : ''
  });

  const changeLoginData = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name] : e.target.value
    });
  }
  //로그인한 정보를 조회
  const login = () =>{
    loginUser(loginData)
    .then(res=>{
      console.log(res.data);
      //자바에서 null데이터가 넘어오면 ''(빈문자)로 받는다.
      if(res.data === ''){
        alert('로그인 실패');//아이디와 비번이 일치하는 회원이 없네, 까지
      }
      else{
        alert('로그인 성공');//로그인 가능한 상태
        //로그인에 성공하면 
        //sessionStorage에 로그인하는 회원의 아이디, 이름 권한 정보를 저장한다.
        // sessionStorage.setItem('userId', res.data.userId);
        // sessionStorage.setItem('userName', res.data.userName);
        // sessionStorage.setItem('userRoll', res.data.userRoll);

        //로그인한 회원의 아이디, 이름, 권한 정보만 가진 객체 생성
        const loginInfo = {
          userId : res.data.userId,
          userName : res.data.userName,
          userRoll : res.data.userRoll
        }
        //loginInfo 객체를 json(객체형태로 생긴 문자열)으로 변환 (-> 객체를 문자열로 바꾼다. => json) 후,
        //세션에 저장
        //JSON.stringify(객체) -> 객체를 문자열화(json) 한다/
        //JAON.parse(json) ->json데이터를 객체로 변환한다.
       
        sessionStorage.setItem('loginInfo',  JSON.stringify(loginInfo));
        setLoginInfo(loginInfo);
        nav('/')
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
          values={loginData.userId}
          onChange={e=>changeLoginData(e)}
          size='wide'/>
        </div>
        <div>
          <p>비밀번호</p>
          <ShopInput size='wide' 
          name='userPw'
          values={loginData.userPw}
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
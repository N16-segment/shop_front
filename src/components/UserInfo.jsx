import React, { useEffect, useState } from 'react'
import styles from './UserInfo.module.css'
import ShopInput from '../common_component/ShopInput'
import ShopButton from '../common_component/ShopButton'
import ShopSelect from '../common_component/ShopSelect'
import * as userApi from '../apis/userApi'

const UserInfo = () => {
  //id 입력이 잘못되었을 때 나타나는 에러메세지
  const [errorMsg, setErrorMsg] = useState({
    userId : '',
    userPw : '',
    userTel : ''
  });
    
  //사용자가 입력한 데이터를 저장하는 변수
  const [userData, setUserData] = useState({
    userId : '',
    userPw : '',
    userName : '',
    userEmail : '', //완성된 이메일
    email1 : '',
    email2 : '@gmail.com',
    userTel : '', //완성된 연락처 010-111-1111
    tel1 : '', 
    tel2 : '', 
    tel3 : '' 
  });

  //입력할 회원정보를 저장할 변수 
  const [userList, setUserList] = useState('');
  //회원목록을 재조회 하기 위한 변수
  const [selectUserData, setSelectUserData] = useState({});

  //회원정보 등록 버튼 클릭 시 실행하는 함수 
  const insertUserData = (e) => {
    userApi.insertUserData(userData)
    .then(res=>{
      if(res.data === 0){
        userApi.regUser(userData)
        .then(res => {
          //회원가입 됐을 때
          if(res.data){
            alert('성공');
          }
          //회원가입 안됐다 -> 아이디가 중복일때
          else{
            setErrorMsg({
              ...errorMsg,
              userId: '중복된 아이디입니다.'
            });
          }
        })
        .catch(error => console.log(error));
      }
    })
  }

  //email1, email2 값이 변경될때만다 실행
  useEffect(()=>{
    setUserData({
      ...userData,
      userEmail : userData.email1 + userData.email2
    });
  }, [userData.email1, userData.email2]);

  //tel1, tel2, tel3 값이 변경될때만 실행
  useEffect(()=>{
    setUserData({
      ...userData,
      userTel :[userData.tel1, userData.tel2, userData.tel3].join('-')
    });
  }, [userData.tel1, userData.tel2, userData.tel3]);


  //키보드로 데이터를 입력할때마다 실행되는 함수
  const changeUserData = (e) => {
      setUserData({
        ...userData,
        [e.target.name] : e.target.value, 
      });
  }

  console.log(userData);

  //회원가입 전 유효성 검사
  const joinValidate = () => {
    let result = 0;
    setErrorMsg((state)=>{
      return {
        userId : '',
        userPw : '',
        userTel : ''
      }
    });

    //4~16글자의 영문자로만 이루어진 정규식
    const regex_id = /^[a-zA-Z]{4,16}$/;
     if(!regex_id.test(userData.userId)){
      result = 1;
      setErrorMsg(state=>{
        return {
          ...state,
          userId : '사용할 수 없는 id입니다.'
        }
      });
     }

    //비밀번호 정규식
    //영어는 소문자나 대문자 + 숫자는 포함
    const regex_pw = /^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;
     if(!regex_pw.test(userData.userPw)){
      result = 1;
      setErrorMsg(state=>{
        return {
          ...state,
          userPw : '사용할 수 없는 비밀번호입니다.'
        }
      });
      }

    //전화번호 정규식
    const regex_Tel = /^01[0-9]-\d{3,4}-\d{4}$|^0\d{1,2}-\d{3,4}-\d{4}$/;
     if(!regex_Tel.test(userData.userTel)){
      result = 1;
      setErrorMsg(state=>{
        return {
          ...state,
          userTel : '전화번호를 정확하게 입력해주세요.'
         }
       });
      }
      return result;
  }

  //회원가입 버튼 클릭 시 회원가입 진행
  const join = () => {
    //유효성 검사
    const result = joinValidate();
      if(result === 0){
        regUser(userData)
        .then(res=>alert('회원가입 성공'))
        .catch(error=>console.log(error));
      }
    
  }

  return (
    <div className={styles.container}>
    <h3>회원 가입하기</h3>
    <div className={styles.content_container}>

      <div className={styles.form}>
        <p>아이디</p>
        <div>
          <ShopInput 
            size='wide'
            name='userId'
            value={userData.userId}
            onChange={e=>changeUserData(e)}
            />
        </div>
        {errorMsg.userId && <p className='error-Msg'>{errorMsg.userId}</p>}
      </div>

      <div className={styles.form}>
        <p>비밀번호</p>
        <div>
        <ShopInput 
          size='wide' 
          type='password'
          name='userPw'
          value={userData.userPw}
          onChange={e=>changeUserData(e)}
          />
        </div>
        {errorMsg.userPw && 
        <p className='error-Msg'>{errorMsg.userPw}</p>}
      </div>

      <div className={styles.form}>
        <p>이름</p>
        <div>
          <ShopInput 
          size='wide'
          name='userName'
          value={userData.userName}
          onChange={e=>changeUserData(e)}
          />
        </div>
      </div>

      <div className={styles.form}>
        <p>이메일</p>
        <div className={styles.email_div}>
          <ShopInput 
          name='email1'
          value={userData.email1}
          onChange={e=>changeUserData(e)}
          />
          <ShopSelect
          name='email2'
          value={userData.email2}
          onChange={e=>changeUserData(e)}
          >
            <option value="@gmail.com">@gmail.com</option>
            <option value="@naver.com">@naver.com</option>
          </ShopSelect>
        </div>
      </div>

      <div className={styles.form}>
        <p>연락처</p>
        <div className={styles.tel_div}>
          <ShopInput size='wide'
          name='tel1'
          value={userData.tel1}
          onChange={e=>changeUserData(e)}
          />
          <ShopInput size='wide' 
          name='tel2'
          value={userData.tel2}
          onChange={e=>changeUserData(e)}
          />
          <ShopInput size='wide'
          name='tel3'
          value={userData.tel3}
          onChange={e=>changeUserData(e)}
          />
        </div>
        {errorMsg.userTel && <p className='error-Msg'>{errorMsg.userTel}</p>}
      </div>

      <div className={styles.btn_div}>
        <ShopButton title='회원가입'
        click={()=>{join()}}
        />
      </div>
    </div>
  </div>
   
  )
}

export default UserInfo
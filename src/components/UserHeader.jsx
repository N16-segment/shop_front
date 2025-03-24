import React, { useEffect, useState } from 'react'
import styles from './UserHeader.module.css'
import { Link, useNavigate } from 'react-router-dom'

export const UserHeader = ({loginInfo, setLoginInfo}) => {
  const nav = useNavigate();
  
  return (
    
    <div className={styles.header_container}>

      <div className={styles.login_div}>
        {//삼항연산자도 조건이 맞으면 리턴하므로 스판태그를 감싸는 부모태그가 있어야 된다.<></>
          loginInfo == null
          ? 
          <>
            <span>
            <Link to={'/login'}>LOGIN</Link>
            </span>
            <span>
            <Link to={'/users'}>JOIN</Link>
            </span>
          </>
          : 
          <>
            <span>{loginInfo.userId}님 반갑습니다.</span>
            <span onClick={()=>{
              sessionStorage.removeItem('loginInfo')
              setLoginInfo(null);
              nav('/');
              }}>LOGOUT</span>
          </>
        }

        
        </div>
      <div className={styles.banner_div}>
        <img src="/book_banner.PNG" />
        <p>BOOK CAFE</p>
        </div>
      <div className={styles.menu_div}>
        <ul className={styles.menu_ul}>
          <li>전체</li>
          <li>IT/인터넷</li>
          <li>문학</li>
          <li>자기계발</li>
        </ul>
      </div>

    </div>

  
    
   
  )
}


import { Route, Routes } from 'react-router-dom'
import './App.css'
import UserLayout from './components/UserLayout'
import AdminLayout from './components/AdminLayout'
import ItemForm from './components/ItemForm'
import MyItemForm from './components/MyItemForm'
import { CateManage } from './components/CateManage'
import State변경함수흐름 from './components/practice/State변경함수흐름'
import Axios흐름 from './components/practice/Axios흐름'
import ShopButton from './common_component/ShopButton'
import ShopInput from './common_component/ShopInput'
import UserInfo from './components/UserInfo'
import Login from './components/Login'
import ShopSelect from './common_component/ShopSelect'
import State변경함수흐름2 from './components/practice/State변경함수흐름2'
import State변경함수흐름3 from './components/practice/State변경함수흐름3'
import StorageTest from './components/practice/StorageTest'
import { useEffect, useState } from 'react'
import UploadTest from './components/practice/UploadTest'

function App() {
   //로그인 정보를 저장할 state변수
    const [loginInfo, setLoginInfo] =useState(null);

    //Login.jsx에서 로그인을 성공하면 setLoginInfo()함수를 이용해서
    //로그인한 정보를 loginInfo 변수에 저장한다.
    //하지만 로그인한 정보가 들어간 상태에서 새로고침(F5)하면 loginInfo 변수에 저장된 로그인 정보가 사라진다. 
    //그래서 새로고침을 하더라도 sessionStorage에 저장된 데이터로 로그인 정보를 유지시켜주기 위해 아래의 useEffect에서 한 번 더 로그인 정보를 가져온다. 
    useEffect(()=>{
    //sessionStorage에 있는 loginInfo 데이터 가져오기(문자로 가져온다.)
      //loginInfo 데이터가 없다면 로그인 안한 것.->null
      //위처럼 받아온 데이터는 json 형태이다.
      const strLoginInfo = sessionStorage.getItem('loginInfo');
      //sessionStorage에 로그인 정보가 있으면, 
      if(strLoginInfo != null){
        //sessionStorage에서 받은 json 데이터를 객체로 변환한다.
        //변환된 loginInfo 객체에는 로그인한 회원의 아이디, 이름, 권한 정보가 들어있다.
        setLoginInfo(JSON.parse(strLoginInfo));
      }
      },[]);
      
  //sessionStorage에 있는 loginInfo 데이터 받아오기
  //받은 데이터는 객체가 아닌 json 데이터이다.(문자열 데이터)
  //사용하려면 객체로 변환해주어야 한다.
  //->문법 : JSON.parse(json데이터)
  const data = sessionStorage.getItem('loginInfo');
  console.log(data);
  //json->객체
  const result = JSON.parse(data);
  console.log(result);
  
  return (
    <div className='container'>
      {/* <StorageTest/> */}
      {/* <State변경함수흐름2/> */}
      {/* <State변경함수흐름3/> */}
      {/* <ShopSelect>
        <option value="">1</option>
        <option value="">2</option>
      </ShopSelect> */}

      {/* <div><ShopInput type='password'
      name='id'
      value={'aaa'}
      onChange={()=>{}}
      /></div>

      <div><ShopInput size='wide'/></div>

      <ShopButton title={'버튼1'} size='small' 
      click={ ()=>alert(1)}/>

      <ShopButton title={'버튼2'} size={'normal'}
      click={ ()=>console.log(5)}/>

      <ShopButton size='large'/> */}
     {/* <UploadTest/> */}
     <Routes>

      {/* 유저가 접속하는 페이지 */}
      <Route path='/' 
      element={ <UserLayout 
      loginInfo={loginInfo}
      setLoginInfo={setLoginInfo}
      /> }>
      {/* 중첩 라우트 : 구획을 나눠서 페이지를 추가
      라우트 안에 있는 라우트에서 작성된 path에는 보낼 주소지에 /를 넣지 않는다. path='page1' */}

        {/* 상품목록 페이지 */}
        <Route path='' element={<div>상품 목록 페이지</div>} />
        {/* 상품상세 페이지 */}
        <Route path='detail' element={ <div>상품 상세 페이지</div>} />

        {/* 회원가입 페이지 */}
        <Route path='/users' element={<UserInfo />}/>

        {/* 로그인 페이지 */}
        <Route path='/login' element={<Login setLoginInfo={setLoginInfo}/>} />

      </Route>
      

      {/* 관리자가 접속하는 페이지 */}
      <Route path='/admin' element={ <AdminLayout loginInfo={loginInfo}
      setLoginInfo={setLoginInfo}/>}>


        {/* 상품등록 */}
        <Route path='reg-item' element={ <ItemForm />}/>
        
        {/* 회원관리 */}
        <Route path='user-manage' element={ <div>회원관리</div>}/>

        {/* 카테고리 관리 페이지 */}
        <Route path='cate-manage' element={ <CateManage/> }/>


      </Route>



    </Routes>
    </div>
  )
}

export default App

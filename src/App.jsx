
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

function App() {

  return (
    <div className='container'>
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

     <Routes>

      {/* 유저가 접속하는 페이지 */}
      <Route path='/' element={ <UserLayout /> }>
      {/* 중첩 라우트 : 구획을 나눠서 페이지를 추가
      라우트 안에 있는 라우트에서 작성된 path에는 보낼 주소지에 /를 넣지 않는다. path='page1' */}

        {/* 상품목록 페이지 */}
        <Route path='' element={<div>상품 목록 페이지</div>} />
        {/* 상품상세 페이지 */}
        <Route path='detail' element={ <div>상품 상세 페이지</div>} />

        {/* 회원가입 페이지 */}
        <Route path='/users' element={<UserInfo />}/>

        {/* 로그인 페이지 */}
        <Route path='/login' element={<Login />}/>

      </Route>
      

      {/* 관리자가 접속하는 페이지 */}
      <Route path='/admin' element={ <AdminLayout/>}>


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

import React, { useEffect } from 'react'

//아래는 데이터들을 저장할 수 있는 저장소
//sessionStorage, localStorage는 웹상에 데이터를 저장할 수 있는 공간이다.
//위의 두 곳에 저장된 데이터는 개발자 모드의 Application탭에서 확인 가능
const StorageTest = () => {
  //localStoragy에 데이터를 저장하는 법 
  // -> 여러번 새로고침해도 키값이 중복이면 다시 저장되지 않고
  // -> 달라진 밸류값만 변경된다. 계속 중복값이 저장되지는 않는다.
  //sessionStorage, localStorage는 새로고침에도 데이터가 살아있다.
  //localStorage는 탭 간에 데이터를 공유한다.
  //sessionStorage는 탭 간에도 데이터를 공유하지 않는다. -> 인터넷을 껐다 키면 사라진다.
  //localStorage는 웹 브라우저가 종료되어도 데이터가 존재한다.=>영구보존
  //sessionStorage는 웹 브라우저가 종료되면 데이터가 사라진다.
  //이 두 곳에는 객체 데이터 저장 불가! 하지만 다른 방법으로 객체 사용 가능
  useEffect(()=>{
    localStorage.setItem('name', 'hong');
    localStorage.setItem('name', 'kim');
    //localStorage.setItem('loginInfo', {id:'hong', name:'honggildong'});

    sessionStorage.setItem('addr', '울산시');
    sessionStorage.setItem('tel', '010-111-2222');
  }, []);
  
  return (
    <>
      <div>StorageTest</div>
      <button type='button' onClick={()=>{
        localStorage.removeItem('name');
        sessionStorage.removeItem('addr');
      }}>데이터 삭제 버튼</button>

      <button type='button' onClick={()=>{
        const age = localStorage.getItem('age');
        const tel = sessionStorage.getItem('tel');
        alert(`age=${age}, tel=${tel}`)
      }}>데이터 확인 버튼</button>
    </>
  )
}

export default StorageTest
import React, { useEffect, useState } from 'react'

/**
 * state 변경함수의 인자로는 데이터, 함수가 전달된다.
 * state 변경함수의 인자로 전달되는 함수를 updater라 부른다.
 * 인자로 함수를 사용하면 항상 최신의 state갑을 전달 받을 수 있음 
 * updater를 사용한 state 변경함수는 
 * state 변경함수가 2회 연속 진행되면서 
 * 2번째 state변경함수의 기능이
 * 첫번째 state 변경함수의 결과에 의존적일때 사용.
*/
const State변경함수흐름2 = () => {
  const[num, setNum] = useState(0);
  // state 변경 함수는 모든 코드 해석 후 마지막에 일괄 처리한다. 
  // 때문에 state 변경 함수가 여러줄 실행되도 한 번만 재렌더링 된다.
  const changeNum = () => {
    // setNum(num+1);
    // setNum(num+1);
    // setNum(num+1);

    //매개변수 : state 변수의 값. 이 값은 항상 최신의 값을 유지
    //함수의 리턴 값을 state변수의 값으로 update
    //아래처럼 코드를 작성한다고 해도 여전히 비동기로 동작
    setNum((state)=>{
      return state + 1
    });
    console.log('a = ', num);
    setNum((state)=>{
      return state + 1
    });
    console.log('a = ', num);
    setNum((state)=>{
      return state + 1
    });
 
    console.log('a = ', num);
  }
  useEffect(()=>{
    changeNum();
  }, []);

  console.log('b = ', num);

  return (
    <div>State변경함수흐름2</div>
  )
}

export default State변경함수흐름2
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import styles from './CateManage.module.css'
import * as bookApi from '../apis/bookApi'
// import에서 ./ -> 현재 위치
//           ../ -> 상위 폴더에서

export const CateManage = () => {
//카테고리 목록을 저장할 변수
const [cateList, setCateList] = useState([]);

//입력할 카테고리명을 저장할 변수 - cateName 하나뿐이어서 빈문자하나
const [categoryData, setCategoryData] = useState('');

//카테고리 목록 재조회 실행을 위한 변수
const [categoryTrigger, setCategoryTrigger] = useState({});

//오류 메세지를 저장할 변수
const [errorMsg, setErrorMsg] = useState('');

//카테고리 목록 조회
useEffect(()=>{
  bookApi.getCategoryList()
  .then(res=>{
    console.log(res.data)
    setCateList(res.data)
  })
  .catch(error=>console.log(error));
}, [categoryTrigger]);
//카테고리 등록 버튼 클릭 시 실행하는 함수
const insertCategory = (e) => {
  //카테고리명 입력 안했으면 중지
  if(categoryData === ''){
    setErrorMsg('카테고리명은 최소 한글자 이상입니다.')
    return;
  }
  bookApi.insertCategory(categoryData)
  .then(res=>{
    //등록 여부에 따라 다른 코드 진행
    if(res.data === 1){
      alert('성공!!');
      //카테고리 목록을 다시 조회
      setCategoryTrigger({});
      //input태그의 값을 초기화
      setCategoryData('');
      setErrorMsg('');
    }
    else{
      setErrorMsg('이미 등록된 카테고리입니다');
      
    }
  })
  .catch(error=>console.log())

}
console.log(categoryData);
  return (
    <>
    <h3>카테고리 관리</h3>
  <div>
    <p>카테고리 등록</p>
    {/* 함수가 아니므로 name 값은 필요없다. */}
    <input type="text" 
      value={categoryData}
      onChange={(e)=>{
      setCategoryData(e.target.value);
    }}
    onKeyDown={(e)=>{
      if(e.key === 'Enter'){
        insertCategory()
      }
    }}
    />
    <button type='button' 
      onClick={e=>insertCategory()}>카테고리 등록</button>
    {
      errorMsg && 
      <p className={styles.error_p}>{errorMsg}</p>
    }
    
  </div>

  <div>
    <p>카테고리 목록</p>
    <table border={1}>
      <thead>
        <tr>
          <td>No</td>
          <td>카테고리 코드</td>
          <td>카테고리명</td>
          <td>수정</td>
          <td>삭제</td>
        </tr>
      </thead>
      <tbody>
      {
            cateList.map((cate, i)=>{
              return (
        <tr key={i}>
          <td>{cateList.length -i}</td>
          <td>{cate.cateCode}</td>
          <td>{cate.cateName}</td>
          <td>
            <button type='button'>수정</button>
          </td>
          <td>
            <button type='button'>삭제</button>
          </td>
        </tr>

                
              )
            })
          }
      </tbody>
    </table>

  </div>








    </>
  )
}

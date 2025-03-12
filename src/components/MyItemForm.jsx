import React, { useEffect, useState } from 'react'
import styles from './MyItemForm.module.css'
import axios from 'axios';

const MyItemForm = () => {
   //카테고리 목록을 저장할 변수
   const [cateList, setCateList] = useState([]);

   //카테고리 목록 조회
   useEffect(()=>{
     axios.get('/api/categories')
     .then(res=>{
       console.log(res.data)
       setCateList(res.data)
     })
     .catch(error=>console.log(error));
   }, []);

  //조회한 상품 목록을 저장할 변수
  const [bookList, setBookList] = useState([]);
  //상품 목록 조회
  useEffect(()=>{
    axios.get('/api/orders')
    .then(res=>{setBookList(res.data)})
    .catch(error=>console.log(error));
  }, []);
  //입력한 정보를 저장할 변수 - input태그에 넣어주는 데이터는 항상 key값을 넣어줘야함
  const [orderBook, setOrderBook] = useState({
    cateCode : '',
    bookName : '',
    bookPrice : 0,
    publisher : '',
    boolInfo: '',
    bookStock : '',
  });
  console.log(orderBook);

  //주문하기


  return (
    <div className={styles.itemForm_div}>
    {/* <div>ItemForm</div> */}

    <div className={styles.table_container}>
      <table>
        <tbody>
          <tr>
            <td>카테고리</td>
            <td>
              <select>
          {
            cateList.map((cate, i)=>{
              return (
                <option key={i} value={cate.cateCode}>{cate.cateName}</option>
              )
            })
          }
        </select>
            </td>
          </tr>
          <tr>
            <td>도서명</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>출판사</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>도서가격</td>
            <td>
              <input type="text" />
            </td>
          </tr>
          <tr>
            <td>책 소개</td>
            <td>
              <textarea name="" id=""></textarea>
            </td>
          </tr>
          <tr>
            <td>도서재고</td>
            <td>
              <input type="text" />
            </td>
          </tr>
        </tbody>
      </table>

      <button type='button'>상품목록 돌아가기</button>

    </div>
    
    </div>
  )
}

export default MyItemForm
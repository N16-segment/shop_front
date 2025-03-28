import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {getCategoryList, insertBook} from '../apis/bookApi';
import ShopInput from '../common_component/ShopInput';
import ShopButton from '../common_component/ShopButton';
//상품 등록 컴포넌트
//도서명 input
//도서가격 input
//출판사 input
//책소개 textarea
//도서재고 input -> 자유
//카테고리 코드 select

const ItemForm = () => {
  //카테고리 목록을 저장할 변수
  const [cateList, setCateList] = useState([]);
  //입력한 input태그들에 입력한 데이터를 저장하는 변수
  const [bookData, setBookData] = useState({
    cateCode : 1,
    bookName : '',
    bookPrice : 0,
    publisher : '',
    bookInfo: '',
  });
 
  //첨부파일을 저장할 변수
  //선택한 메인 이미지를 저장할 변수
  const [mainImg, setMainImg] = useState(null);
  //선택한 상세 이미지를 저장할 변수
  const [subImg, setSubImg] = useState(null);
  //카테고리 목록 조회
  useEffect(()=>{
    getCategoryList()
    .then(res=>{
      console.log(res.data)
      setCateList(res.data)
    })
    .catch(error=>console.log(error));
  }, []);

  //값 입력 시 반복 실행되는 함수
  const changeBookData = (e) => {
    setBookData({
      ...bookData,
      [e.target.name] : e.target.value
    })
  }
  console.log(bookData);
//등록버튼 실행시 도서 등록 실행
const regBook = ()=>{
  const regForm = new FormData();
  //도서 등록 시(DB에 insert) 필요한 데이터 적재
  regForm.append('cateCode', bookData.cateCode);
  regForm.append('bookName', bookData.bookName);
  regForm.append('bookPrice', bookData.bookPrice);
  regForm.append('publisher', bookData.publisher);
  regForm.append('bookInfo', bookData.bookInfo);

  //첨부파일 데이터도 적재(메인, 상세 이미지)
  regForm.append('mainImg', mainImg);
  regForm.append('subImg', subImg);

  insertBook(regForm)
  .then(res=>{
    alert('성공');
  })
  .catch(error=>console.log(error))
}

  return (
    <div className='item-form-container'>
    {/* <div>ItemForm</div> */}

     <div>
      도서등록
     </div>
    {/* 입력해야되는 정보 5개 */}
     <div>
      <div>
        <p>카테고리</p>
        <select name='cateCode' value={bookData.cateCode}
        onChange={e=>changeBookData(e)}>
          {
            cateList.map((cate, i)=>{
              return (
                <option key={i} value={cate.cateCode}>{cate.cateName}</option>
              )
            })
          }
        </select>
      </div>
      <div>
        <p>도서명</p>
        {/* <input type="text" name='bookName' value={bookData.bookName}
        onChange={e=>changeBookData(e)}/> */}

        <ShopInput name='bookName' value={bookData.bookName}
        onChange={e=>changeBookData(e)}/>

      </div>
      <div>
        <p>출판사</p>
        {/* <input type="text" name='publisher' value={bookData.publisher} onChange={e=>changeBookData(e)}/> */}

        <ShopInput name='publisher' value={bookData.publisher} onChange={e=>changeBookData(e)}/>

      </div>

      <div>
        <p>도서가격</p>
        {/* <input type="text" name='bookPrice' value={bookData.bookPrice} onChange={e=>changeBookData(e)}/> */}

        <ShopInput name='bookPrice' value={bookData.bookPrice} onChange={e=>changeBookData(e)}/>

      </div>

      <div>
        <p>책소개</p>
        <textarea name='bookInfo' 
                  value={bookData.bookInfo}
                  onChange={e=>changeBookData(e)}>     
                  </textarea>
      </div>
      <div>
        <p>도서 메인 이미지</p>
        <input 
        type='file' 
        onChange={e=>setMainImg(e.target.files[0])}
        />
      </div>
      <div>
        <p>도서 상세 이미지</p>
        <input 
        type='file' 
        onChange={e=>setSubImg(e.target.files[0])}
        />
      </div>
     </div>

     <div>
      {/* <button type='button' onClick={e=>regBook()}>등록</button> */}
      <ShopButton 
      title='등 록'
      size='small'
      click={e=>regBook()}
      />
     </div>

    </div>
  )
}

export default ItemForm
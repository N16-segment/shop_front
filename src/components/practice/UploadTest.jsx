import axios from "axios";
import React, { useState } from "react";

const UploadTest = () => {
  //첨부파일 input 태그에서 선택한 파일을 저장할 변수
  const [firstFile, setFirstFile] = useState(null); // -1 재렌더링되어도 값을 갖고있다.

  //첨부파일 input 태그에서 선택한 여러 파일을 저장할 변수
  const [secondFiles, setScondFiles] = useState(null);

  //자바로 데이터를 전달할 대 문자뿐만 아니라 파일 데이터도 가져간다는 것을 설정
  //첨부파일 할 때 무조건 붙여줘야하는 규칙이다.
  const fileConfig = { header: { "Content-Type": "multipart/form-data" } };

  const sendFile = () => {
    const form = new FormData(); // -3
    //첨부파일 데이터를 자바로 전달하기 위해서는 FormData()객체를 사용해야 함
    //form 데이터 객체 생성
    // -> 첨부파일, input태그 등의 모든 데이터를 자바로 가져갈 수 있는 객체
    form.append("bookName", "kim");
    form.append("bookPrice", 20000);
    form.append("firstFile", firstFile); //실제 파일

    //post()메서드의 세번재 매개변수로 fileConfig를 전달(이걸 해야 파일 첨부 됨)
    axios
      .post(
        "/api/test/upload1",
        form, //여기까지는 데이터를 문자형태로 보내준다. 객체를 문자형태로 보내준다.
        // -> 파일도 그대로 넘겨줄 수 없으므로 받을 수 있는 상태로 변환시켜주는 내용 파일을->010100같은 식으로 바꿔준다고 생각하면 된다.
        fileConfig //이미지를 가져가기 위해 반드시 작성! fileConfig
      ) //->세번째 매개변수로 작성해줘야 이미지를 첨부파일 형식으로 가져간다.
      .then()
      .catch();
  };
  return (
    <div>
      <input
        //multiple //이 속성을 사용하면 한 번에 여러 파일을 선택할 수 있다. -2
        type="file"
        onChange={(e) => {
          //파일 선택할 때마다 onChang 실행
          //e.target.files : 선택한 파일들의 정보 - 파일들은 여러개가 들어올 수 있으므로 배열로 들어간다. 따라서 복수형 files
          console.log(e.target.files);
          //multiple 없으면 어짜피 파일은 하나밖에 들어가지 못한다.
          console.log(e.target.files[0]);

          //파일을 선택할 때마다 선택한 파일을 firstFile에 저장한다.
          setFirstFile(e.target.files[0]); //비동기라서 데이터가 마지막에 실행
        }}
      />
      <button
        type="button"
        onClick={() => {
          sendFile();
        }}
      >
        파일전송 1
      </button>
      <br />
      <input
        type="file"
        multiple
        onChange={(e) => {
          setScondFiles(e.target.files);
        }}
      />
      <button
        type="button"
        onClick={() => {
          const form2 = new FormData();

          //파일 첨부를 했을 때만.
          if (secondFiles != null) {
            //첨부한 파일 갯수만큼 formData에 저장
            for (const eachFile of secondFiles) {
              form2.append("files", eachFile);
            }
          }

          axios.post("/api/test/upload2", form2, fileConfig).then().catch();
        }}
      >
        다중 파일 전송
      </button>
    </div>
  );
};

export default UploadTest;

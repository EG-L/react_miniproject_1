import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {useParams} from "react-router-dom";
/*
     Fragment : 임시 루트를 만들 때
     <>
     </>
     <useState : 변수 => state(계속 변경된 데이터가 있는 경우에 설정)
     props : 고정된 데이터 => 태그의 속성으로 값을 넘겨주는 경우
     => 함수의 매개변수로 받는다.
     useEffect : mounted == window.onload
     ,[] => mounted
     ,[변수명] => 변경 될 때마다 호출
     useParams : URL을 이용해서 데이터 전송 => getParameter()
     useRef : 태그를 제어
     useNavigate : 브라우저 이동 제어
     useMemo / useContext / useReducer ==> Redux
*/

function BoardDetail(){
    return(
        <div></div>
    )
}

export default BoardDetail
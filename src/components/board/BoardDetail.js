import {Fragment,useState,useEffect} from "react";
import axios from "axios";
import {Link, useParams} from "react-router-dom";

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
     사용자 정의 Hooks
     금융권 / 증권 / next.js nust.js nest.js ... TypeScript

     hooks => 함수 기반에서만 사용이 가능

     function App()  선언적 함수
     const App=()=>{} 묵시적 함수
     const App=function(){}
     => 다른 JS에서 사용 시에 반드시 export를 설정한다.
*/

function BoardDetail(){
    const {no} = useParams()
    const [detail,setDetail] = useState({})
    /*
        => List => [{},{},{}...] useState([])
        => VO => {} useState({})
        => int => useState(0)
        => boolean => useState(true)
        => String => useState('')
    */
    useEffect(() => {
        axios.get('http://localhost/board/detail_react',{
            params:{
                no:no
            }
        }).then(response=>{
            setDetail(response.data)
        })
    }, []);
    return(
        <div className={"row"}>
            <h3 className={"text-center"}>내용보기</h3>
            <table className={"table"}>
                <tbody>
                <tr>
                    <td className={"text-center success"} width={"20%"}>번호</td>
                    <td className={"text-center"} width={"30%"}>{detail.no}</td>
                    <td className={"text-center success"} width={"20%"}>작성일</td>
                    <td className={"text-center"} width={"30%"}>{detail.regdate}</td>
                </tr>
                <tr>
                    <td className={"text-center success"} width={"20%"}>이름</td>
                    <td className={"text-center"} width={"30%"}>{detail.name}</td>
                    <td className={"text-center success"} width={"20%"}>조회수</td>
                    <td className={"text-center"} width={"30%"}>{detail.hit}</td>
                </tr>
                <tr>
                    <td className={"text-center success"} width={"20%"}>제목</td>
                    <td colSpan={"3"}>{detail.subject}</td>
                </tr>
                <tr>
                    <td className={"text-left"} height={"200"} colSpan={"4"} valign={"top"}>
                        <pre style={{"whiteSpace":"pre-wrap","backgroundColor":"white","border":"none"}}>{detail.content}</pre>
                    </td>
                </tr>
                <tr>
                    <td className={"text-right"} colSpan={"4"}>
                        <Link to={"/board/update/"+no} type={"button"}
                               className={"btn-info btn-xs"}
                        >수정</Link>
                        <Link to={"/board/delete/"+no} type={"button"}
                               className={"btn-success btn-xs"}
                        >삭제</Link>
                        <Link to={"/board/list"} className={"btn btn-warning btn-xs"} >목록</Link>
                    </td>
                </tr>
                </tbody>
            </table>
        </div>
    )
}

export default BoardDetail
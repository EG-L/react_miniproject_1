import {Fragment,useState,useEffect} from "react";
import {useParams} from "react-router-dom";
import {Link} from "react-router-dom";
import axios from "axios";
/*global kakao*/
import FoodDetail from "./FoodDetail";
/*
*   Hooks = function단위
*   상태관리 (데이터 관리) => state (변경이 가능한 변수) => vue (data(){})
*                         props (변경이 불가능한 변수)
*
*                         => state : useState()
*                         => props : 함수의 매개변수(parameter)로 이용
*                            function Detail(props)
*   useState : 프로그램 종료시까지 유지
*   생명주기
*      class App extends Component
*      {
*           constructor(){
*              => state 변수
*              => 이벤트 등록
*           }
*           componentWillMount(){}
*           componentDidMount(){} == mounted(), window.onload
*           componentWillUpdate(){}
*           componentDidUpdate(){} == state가 변경이 될 때 호출
*      }
*      function App(){
*         state ==> useState
*         componentDidMount(){} => useEffect()
*         componentDidUpdate(){} => 사용이 가능
*      }
*      useEffect(()=>{
*          처리 내용 => 서버 연결 => axios,fetch
*                                ======= 동기 , 비동기
*                                async axios
*      },[]) => 한번만 수행
*      useEffect(()=>{
*          처리 내용 => 서버 연결 => axios,fetch
*                                ======= 동기 , 비동기
*                                async axios
*      },[page]) => page가 변경시마다 수행
*
*      최적화
*        useMemo / useCallback
*       공통모듈
*        useContext
*        URL을 이용한 값을 받는 경우
*          useParams
*        => useReducer ==> MVC (redux)
*        input의 데이터를 참조 : useRef
*        
*        1. 변수 설정
*        2. 데이터 초기화
*        3. return에 있는 html => index.html로 전송
*        4. 데이터가 변경 시에 return을 수행
*        ==========================================
*         압축 => webpack
* */
function FoodList(){
    const [foodList,setFoodList] =useState([])
    const [curpage,setCurpage] = useState(1)
    const [totalpage,setTotalpage] = useState(0)
    const [endPage,setEndPage] = useState(0)
    const [startPage,setStartPage] = useState(0)
    const {fd} = useState('마포')
    const[open,setOpen]=useState(false)
    const[foodDetail,setFoodDetail] = useState({})

    useEffect(() => {
        axios.get('http://localhost/food/list_react',{
            params:{
                page:curpage
            }
        }).then(response=>{
            console.log(response.data)
            setFoodList(response.data.list)
            setStartPage(response.data.startPage)
            setTotalpage(response.data.totalpage)
            setEndPage(response.data.endPage)
            setCurpage(response.data.curpage)
        })
    }, [curpage]);
    useEffect(() => {
        const script = document.createElement("script")
        // <script src=""></script>
        script.async = true
        script.src = "//dapi.kakao.com/v2/maps/sdk.js?appkey=3448a448b4c48a4437bc393b4e0206b5&libraries=services&autoload=false"
        document.head.appendChild(script)
        /*
        *  <head>
              <script src=""></script>
           </head>
        * */
        script.onload=()=>{
            kakao.maps.load(()=>{
                var mapContainer = document.getElementById('map'), // 지도를 표시할 div
                    mapOption = {
                        center: new kakao.maps.LatLng(33.450701, 126.570667), // 지도의 중심좌표
                        level: 3 // 지도의 확대 레벨
                    };
                // 지도를 생성합니다
                var map = new kakao.maps.Map(mapContainer, mapOption);

                // 주소-좌표 변환 객체를 생성합니다
                var geocoder = new kakao.maps.services.Geocoder();

                // 주소로 좌표를 검색합니다
                geocoder.addressSearch(foodDetail.address, function(result, status) {

                    // 정상적으로 검색이 완료됐으면
                    if (status === kakao.maps.services.Status.OK) {

                        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

                        // 결과값으로 받은 위치를 마커로 표시합니다
                        var marker = new kakao.maps.Marker({
                            map: map,
                            position: coords
                        });

                        // 인포윈도우로 장소에 대한 설명을 표시합니다
                        var infowindow = new kakao.maps.InfoWindow({
                            content: '<div style={{"width:150px;text-align:center;padding:6px 0;"}}>'+foodDetail.name+'</div>'
                        });
                        infowindow.open(map, marker);

                        // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
                        map.setCenter(coords);
                    }
                });
            })
        }
    }, [foodDetail]);
    let fl = foodList.map((fl)=>
        <div className="col-md-4">
            <div className="thumbnail">
                <Link to={"/food/detail/"+fl.fno}>
                    <img src={'http://www.menupan.com'+fl.poster} alt="Lights" style={{"width":"100%"}}/>
                        <div className="caption">
                            <p>{fl.name}</p>
                        </div>
                </Link>
            </div>
        </div>
    );
    const pageChange=(page)=>{
        setCurpage(page)
    }
    const prevHandler=()=>{
        setCurpage(startPage-1)
    }
    const nextHandler=()=>{
        setCurpage(endPage+1)
    }
    let row =[]
    if(startPage>1){
        row.push(<li><a href={"#"} onClick={prevHandler}>&laquo;</a></li>)
    }
    for(let i=startPage;i<=endPage;i++){
        if(curpage===i){
            row.push(<li className={"active"}><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
        else{
            row.push(<li><a href={"#"} onClick={()=>pageChange(i)}>{i}</a></li> )
        }
    }
    if(endPage<totalpage) {
        row.push(<li><a href={"#"} onClick={nextHandler}>&raquo;</a></li>)
    }
    const onFoodDetail=(vo)=>{
        setOpen(true)
        setFoodDetail(vo)
    }
    let html=foodList.map((vo) =>
        <div className="col-md-4">
            <div className="thumbnail">
                    <img src={'http://www.menupan.com' + vo.poster} alt="Lights" style={{"width": "100%"}} onClick={()=>onFoodDetail(vo)}/>
                    <div className="caption">
                        <p>{vo.name}</p>
                    </div>
            </div>
        </div>
    );

    return (
        /* <Fragment>
             <div className={"row"}>
                 <h1 className={"text-center"}>맛집 목록</h1>
             </div>
             <div className={"text-right row"}>
                 <form method={"get"} action={"http://localhost/food/searchData"}>
                     <input type={"text"} name={"fd"}/>&nbsp;
                     <input type={"button"} className={"btn btn-sm btn-primary"} value={"검색"}/>
                 </form>
             </div>
             <div className={"row"}>
                 {fl}
             </div>
             <div className={"row"}>
                 <div className={"text-center"}>
                     <input type={"button"} value={"이전"} className={"btn-sm btn-danger"} onClick={prevHandler}/>
                     {curpage} page / {totalpage} pages
                     <input type={"button"} value={"다음"} className={"btn-sm btn-primary"} onClick={nextHandler}/>
                 </div>
             </div>
         </Fragment>*/

        <div className={"row"}>
            <div className={"col-sm-8"}>
                {html}
                <div style={{"height":"20px"}}></div>
                <div className={"text-center"}>
                    <ul className={"pagination"}>
                        {row}
                    </ul>
                </div>
            </div>
            <div className={"col-sm-4"}>
                {open ? <Detail vo={foodDetail}/> : null}
                <div style={{"height": "10px"}}></div>

                <div id="map" style={{"width": "100%", "height": "350px"}}></div>

            </div>
        </div>
    )
}

function Detail(props) {
    return(
        <table className={"table"}>
            <tbody>
                <tr>
                    <td colSpan={"2"} className={"text-center"}>
                        <img src={"http://www.menupan.com" + props.vo.poster} style={{"width": "100%"}}/>
                    </td>
                </tr>
                <tr>
                    <td colSpan={"2"}>
                        <h3>{props.vo.name}&nbsp;<span style={{"color": "orange"}}>{props.vo.score}</span></h3>
                    </td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>주소</td>
                    <td width={"75%"}>{props.vo.address}</td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>전화</td>
                    <td width={"75%"}>{props.vo.phone}</td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>음식종류</td>
                    <td width={"75%"}>{props.vo.type}</td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>가격대</td>
                    <td width={"75%"}>{props.vo.price}</td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>영업시간</td>
                    <td width={"75%"}>{props.vo.time}</td>
                </tr>
                <tr>
                    <td width={"25%"} className={"text-center"}>좌석</td>
                    <td width={"75%"}>{props.vo.seat}</td>
                </tr>
            </tbody>
        </table>
    )
}

export default FoodList
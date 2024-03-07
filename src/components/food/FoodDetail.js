import {useState,useEffect,Fragment} from "react";
import {useParams} from "react-router-dom";
import axios from "axios";

function FoodDetail(){
    let {fno}=useParams();
    let [detailData,setDetailData] = useState({})

    useEffect(() => {
        axios.get('http://localhost/food/detail_react',{
            params:{
                fno:fno
            }
        }).then(response=>{
            console.log(response.data)
            setDetailData(response.data)
        })
    }, []);

    return(
        <Fragment>
            <div>
                <h1 className={"text-center"}>선택된 맛집 번호:{fno}</h1>
            </div>
            <div className={"container"}>
                <div className={"row"}>
                    <table className="table">
                        <tr>
                            <td width={"30%"} rowSpan={"9"} align="center">
                                <img src={'http://www.menupan.com' + detailData.poster}
                                     style={{"width": "300px", "height": "200px"}}/>
                            </td>
                            <td colSpan="2"><h3>{detailData.name}</h3></td>
                        </tr>
                        <tr>
                            <td width={"15%"}>주소</td>
                            <td width={"35%"}>{detailData.address}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>전화번호</td>
                            <td width={"35%"}>{detailData.phone}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>음식 종류</td>
                            <td width={"35%"}>{detailData.type}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>테마</td>
                            <td width={"35%"}>{detailData.theme}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>영업시간</td>
                            <td width={"35%"}>{detailData.time}</td>
                        </tr>
                        <tr>
                            <td width={"15%"}>좌석</td>
                            <td width={"35%"}>{detailData.seat}</td>
                        </tr>
                    </table>
                </div>
            </div>

        </Fragment>
    )
}

export default FoodDetail
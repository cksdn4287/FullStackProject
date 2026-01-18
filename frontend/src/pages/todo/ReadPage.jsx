import { useParams , useNavigate , createSearchParams, useSearchParams } from "react-router-dom";
import { useCallback } from "react";
import ReadComponent from "../../components/todo/ReadComponent";

const ReadPage = () => {

    const {tno} = useParams()

    const navigate = useNavigate()

    const [queryParams] = useSearchParams()

    const page = queryParams.get("page") ? parseInt(queryParams.get("page"))  : 1
    const size = queryParams.get("size") ? parseInt(queryParams.get("size")) : 10

    const queryStr =  createSearchParams({page, size}).toString() 

    const moveToModify = useCallback(  (tno) => {
        navigate({
            pathname: `/todo/modify/${tno}`,
            search:queryStr
        })
        
    } , [tno , page, size])

    const moveToList = useCallback(  () => {

        navigate({
            pathname:`/todo/list` ,
            search:queryStr
        })
    } , [page, size])

    return(
        <div className="font-extrabold w-full bg-white mt-6">
            Todo Read Page Component {tno}

        <ReadComponent tno = {tno}></ReadComponent>
        </div>
    )
}

export default ReadPage;
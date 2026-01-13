import { useParams , useNavigate } from "react-router-dom";
import { useCallback } from "react";

const ReadPage = () => {

    const {tno} = useParams()

    const navigate = useNavigate()

    const moveToModify = useCallback(  (tno) => {
        navigate({pathname: `/todo/modify/${tno}`})
    } , [tno])

    return(
        <div className="text-3xl font-extrabold">
            Todo Read Page Component {tno}

            <div>
                <button onClick={() => moveToModify(33)}>Test Modify</button>
            </div>
        </div>
    )
}

export default ReadPage;
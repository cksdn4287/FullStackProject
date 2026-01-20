import { useEffect , useState } from "react";
import { getOne , deleteOne, putOne} from "../../api/todoApi";
import useCustomMove from "../../hooks/useCustomMove";
import ResultModal from "../common/ResultModal";

const initState = {
  tno:0,
  title:'',
  writer:'',
  dueDate:'',
  complete:false
}

const modifyComponent = ( {tno }) => {

  const [todo, setTodo] = useState({...initState})

  const [result, setResult] = useState(null)

  const {moveToList, moveToRead} = useCustomMove()

  useEffect(  () => {
    getOne(tno).then(data => setTodo(data))
  }, [tno])


  const handleClickModify = () => {
    putOne(todo).then(  data => {
      setResult('수정완료')
    })
  }

  const handleClickDelete = () => {
    deleteOne(tno).then(data => {
      setResult('삭제완료')
    })
  }

  const closeModal = () => {
    if(result === "삭제완료"){
      moveToList()
    }else{
      moveToRead(tno)
    }
  }
  const handleChangeTodo = (e) => {
    todo[e.target.name] = e.target.value
    setTodo({...todo})
  }

  const handleChangeTodoComplete = (e) => {
    const value = e.target.value

    todo.complete = (value === 'Y')

    setTodo({...todo})
  }

  return(
    <div className="border-2 border-sky-200 mt-10 m-2 p-4">
      
      {result ? <ResultModal title={'처리결과'} content={result}
      callbackFn={closeModal}></ResultModal> : <></>}

      <div className="flex justify-center mt-10">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div  className="w-1/5 p-6 text-right font-bold">TNO</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">{todo.tno}</div>
      </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div  className="w-1/5 p-6 text-right font-bold">WRITER</div>
        <div className="w-4/5 p-6 rounded-r border border-solid shadow-md bg-gray-100">{todo.writer}</div>
      </div>
      </div>

    <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div  className="w-1/5 p-6 text-right font-bold">TITLE</div>
        <input className="w-4/5 p-6 rounded-r border border-solid border-neutral-300 shadow-md"
        name="title"
        type={'text'}
        value={todo.title}
        onChange={handleChangeTodo}></input>
      </div>
      </div>

      <div className="flex justify-center">
        <div className="relative mb-4 flex w-full flex-wrap items-stretch">
        <div  className="w-1/5 p-6 text-right font-bold">COMPLETE</div>
        <select className="border-2 border-solid rounded m-1 p-2"
        name="statue"
        value={todo.complete? 'Y': 'N'}
        onChange={handleChangeTodoComplete}>
          <option value='Y'>Completed</option>
          <option value='N'>Not Yet</option>
        </select>
      </div>
      </div>

      <div className="flex justify-end p-4">
        <button type="button"
        className="inline-block  rounded p-4 m-2 text-xl w-32 text-white bg-red-500"
        onClick={handleClickDelete}>
          DELETE
        </button>
        <button type="button"
        className="rounded p-4 m-2 text-xl w-32 text-white bg-blue-500"
        onClick={handleClickModify}>
          MODIFY
        </button>
      </div>
    </div>
  )
}

export default modifyComponent;
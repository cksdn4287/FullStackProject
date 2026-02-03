import ModifyComponent from "../../components/member/ModifyComponent";
import BasciLayout from "../../layout/BasicLayout"

const ModifyPage = () => {

  return(
    <BasciLayout>
      <div className="text-3xl">Member Modify Page</div>
      
      <div className="bg-white w-full mt-4 p-2">
        <ModifyComponent></ModifyComponent>
      </div>
    </BasciLayout>
  )
}

export default ModifyPage;
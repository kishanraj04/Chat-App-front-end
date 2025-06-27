import GroupMembers from "../Components/group/GroupMembers";
import ManageGroup from "../Components/group/ManageGroup";


function Group() {
  
  return (
    <div className="flex w-[100%]">
      
      <div className="w-[20%]">
            <GroupMembers/>
      </div>

      <div className="w-[80%] flex justify-center items-center">
        <ManageGroup/>
      </div>
    </div>
  );
}

export default Group;

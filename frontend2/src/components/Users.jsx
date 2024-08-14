import axios from "axios";
import { useState, useEffect } from "react";
import { Button } from "./Button";
import { useNavigate } from "react-router-dom";

export const Users = () => {
  // Replace with backend call
  const [users, setUsers] = useState([]);
  const [filter, setFilter] = useState("");
  const [me,setMe] = useState(null);

  useEffect(() => {
    axios
      .get("https://paytm-qdku.onrender.com/api/v1/user/bulk?filter=" + filter)
      .then((response) => {
        setUsers(response.data.user);
      });
  }, [filter]);

  useEffect(()=>{
      const fetchMe = async()=>{
        const response = await axios.get("https://paytm-qdku.onrender.com/api/v1/user/profile",{
          headers: {
            Authorization: "Bearer "+localStorage.getItem("token"),
          }
        })
        // console.log(response.data.user.firstName);
        setMe(response.data.user._id);
      };
      fetchMe();
    },[])

  const handleSearchInput = (e)=>{
    setFilter(e.target.value);
  }
  return (
    <>
      <div className="font-bold mt-6 text-lg">Users</div>
      <div className="my-2">
        <input
          type="text"
          placeholder="Search users..."
          className="w-full px-2 py-1 border rounded border-slate-200"
          value={filter}
          onChange={handleSearchInput}
        ></input>
      </div>
      <div>
        {users.filter((user)=>user._id !==me).map((user) => (
          <User user={user} />
        ))}
      </div>
    </>
  );
};

function User({ user }) {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between">
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {user.firstName[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-ful">
          <div>
            {user.firstName} {user.lastName}
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center h-ful">
        <Button onClick={(e)=>{
          // console.log(e);
          navigate("/send?id="+user._id + "&name="+user.firstName);
        }} label={"Send Money"} />
      </div>
    </div>
  );
}

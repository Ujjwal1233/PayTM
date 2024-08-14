import { useNavigate } from "react-router-dom";

export const Appbar = ({ name }) => {
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  return (
    <div className="shadow h-14 flex justify-between">
      <div className="flex flex-col justify-center h-full ml-4">PayMoney App</div>
      <div className="flex">
        <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
          <div className="flex flex-col justify-center h-full text-xl">
            {name[0].toUpperCase()}
          </div>
        </div>
        <div className="flex flex-col justify-center h-full mr-4">{name}</div>
        <div className="flex flex-col justify-center h-full mr-4">
          <button onClick={handleLogout} className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

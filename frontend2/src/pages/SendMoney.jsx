import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

export const SendMoney = () => {
  const [searchParams] = useSearchParams();
  const [amount, setAmount] = useState(0);
  const [transferStatus,setTransferStatus] = useState(null);
  const id = searchParams.get("id");
  const name = searchParams.get("name");
  const navigate = useNavigate();

  const initiateTransfer = async (e) => {
    try {
      const response = await axios.post(
        "https://paytm-qdku.onrender.com/api/v1/account/transfer",
        {
          to: id,
          amount,
        },
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
    //   console.log(response);
    if(response.status===200){
        setTransferStatus("success");
        setAmount(' ')
    }
    else{
        setTransferStatus("failure");
    }
    } catch (error) {
        setTransferStatus("failure");
    }
  };
  const handleDashboardNavigation = ()=>{
    navigate("/dashboard")
  }

  return (
    <div className="flex justify-center h-screen bg-gray-100">
      <div className="h-full flex flex-col justify-center">
        <div className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-3xl font-bold text-center">Send Money</h2>
          </div>
          <div className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-2xl text-white">
                  {name[0].toUpperCase()}
                </span>
              </div>
              <h3 className="text-2xl font-semibold">{name}</h3>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label
                  className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="amount"
                >
                  Amount (in Rs)
                </label>
                <input
                  type="number"
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                  id="amount"
                  placeholder="Enter amount"
                  onChange={(e) => {
                    setAmount(e.target.value);
                  }}
                />
              </div>
              <button
                onClick={initiateTransfer}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Initiate Transfer
              </button>
              {transferStatus==="success" && (<p className="flex justify-center text-green-500 text-sm mt-2">Payment Successful</p>)}
              {transferStatus==="success" && <button
                onClick={handleDashboardNavigation}
                className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              >
                Go To Dashboard
              </button>}
              {transferStatus==="failure" && (<p className="flex justify-center text-red-500 text-sm mt-2">Something went wrong</p>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

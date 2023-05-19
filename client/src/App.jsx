import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Request from "./components/Request";
import Transactions from "./components/Transactions";
import axios from "axios";
import { useEffect, useState } from "react";

const SERVER_URL = "http://localhost:8001";

const App = () => {
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchUserData = async (id = 1) => {
      try {
        const res = await axios.get(`${SERVER_URL}/user/${id}`);
        return res;
      } catch (err) {
        console.error(err);
      }
    };

    const getUserData = async () => {
      try {
        const { data } = await fetchUserData(1);
        const toSend = data[0];
        setUserData(toSend);
      } catch (err) {
        console.error("no user found", err);
      }
    };

    getUserData();
  }, []);

  return (
    <>
      <div className=''>
        <Navbar />
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/request' element={<Request userData={userData} />} />
          <Route
            path='/transactions'
            element={<Transactions userData={userData} />}
          />
        </Routes>
      </div>
    </>
  );
};

export default App;

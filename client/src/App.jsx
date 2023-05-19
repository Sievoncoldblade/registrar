import Menu from "./components/Menu";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import Request from "./components/Request";

const App = () => {
  return (
    <>
      <div className='h-screen'>
        <Navbar />
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/request' element={<Request />} />
        </Routes>
      </div>
    </>
  );
};

export default App;

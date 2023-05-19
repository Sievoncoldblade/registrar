import main from "../assets/main.jpg";
import { Link } from "react-router-dom";
const Menu = () => {
  return (
    <>
      <div className='h-[90%] flex flex-col overscroll-y-none'>
        <div className='h-3/4 '>
          <img className='h-full w-full object-cover' src={main} alt='Hands typing on keyboard' />
        </div>
        <div className='flex flex-row items-center text-center p-4 gap-4'>
          <Link className='bg-red-800 text-white w-full py-8' to='/request'>
            <p className='font-semibold text-3xl'>Document Request</p>
            <p className='font-light'>Choose what document would you like to request a copy of</p>
          </Link>
          <Link className='bg-red-800 text-white w-full py-8' to='/transactions'>
            <p className='font-semibold text-3xl'>My Transactions</p>
            <p className='font-light'>View all transactions and requests</p>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Menu;

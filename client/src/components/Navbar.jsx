import { useState } from "react";
import logo from "../assets/logo.png";
import { BiDownArrow, BiUpArrow, BiUser } from "react-icons/bi";
import Search from "./Search";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [isServiceDropDownOpen, setIsServiceDropDownOpen] = useState(false);
  const [isProfileDropDownOpen, setIsProfileDropDownOpen] = useState(false);
  const services = [
    "Registrar Services",
    "Administrative Services",
    "Accounting Services",
    "Academic Office Services",
  ];
  const [serviceSelected, setServiceSelected] = useState(() => services[0]);
  return (
    <>
      <nav className='flex justify-between flex-row items-center space-x-5 bg-red-800 px-5 py-2'>
        <div className='flex flex-row items-center space-x-5'>
          <img width={50} src={logo} alt='PUP Logo' />
          <Link className='font-bold text-lg text-white' to='/'>
            PUPSRC-OTMS
          </Link>
        </div>
        <div className='relative px-10'>
          <button
            className='flex px-4 justify-start gap-2 text-white'
            onClick={() => setIsServiceDropDownOpen(!isServiceDropDownOpen)}
          >
            {serviceSelected}
            <span>
              {isServiceDropDownOpen ? (
                <BiUpArrow size={"15"} className='inline' />
              ) : (
                <BiDownArrow size={"15"} className='inline' />
              )}
            </span>
          </button>
          {isServiceDropDownOpen && (
            <ul className='absolute top-8 bg-white border border-red-700 rounded-lg overflow-hidden'>
              {services.map((e, i) => (
                <li
                  className='px-4 py-2 last:border-none border-b border-b-red-700 text-red-700 font-medium'
                  key={i}
                  onClick={() => {
                    setIsServiceDropDownOpen(false);
                    setServiceSelected(services[i]);
                  }}
                >
                  {e}
                </li>
              ))}
            </ul>
          )}
        </div>
        {/* <Search /> */}
        {/* Only display if user is logged in */}
        <div
          className='relative flex flex-row gap-2 items-center space-x-1 text-md font-medium text-white'
          onClick={() => setIsProfileDropDownOpen(!isProfileDropDownOpen)}
        >
          <BiUser className='inline' size='30' />
          <span>Juan dela Cruz</span>
          {isProfileDropDownOpen && (
            <ul className='absolute flex flex-col w-full top-8 bg-white border border-red-700 rounded-lg overflow-hidden'>
              <Link
                className='px-4 py-2 last:border-none border-b border-b-red-700 text-red-700 font-medium'
                onClick={() => {
                  setIsProfileDropDownOpen(false);
                }}
              >
                Account Settings
              </Link>
              <Link
                className='px-4 py-2 last:border-none border-b border-b-red-700 text-red-700 font-medium'
                onClick={() => {
                  setIsProfileDropDownOpen(false);
                }}
              >
                Logout
              </Link>
            </ul>
          )}
        </div>
      </nav>
    </>
  );
};

export default Navbar;

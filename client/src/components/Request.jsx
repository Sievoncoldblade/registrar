import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const SERVER_URL = "http://localhost:8001";

const Request = () => {
  const [transactionCategories, setTransactionCategories] = useState([]);
  // const [formData, updateFormData] = useState({});
  const [selectedTransaction, setSelectedTransaction] = useState(() => 1);
  const [schedule, setSchedule] = useState("");
  const [userData, setUserData] = useState();

  useEffect(() => {
    const fetchAllTransactionCategories = async () => {
      try {
        const res = await axios.get(`${SERVER_URL}/transaction/categories`);
        return res;
      } catch (err) {
        console.error(err);
      }
    };

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

    const getAllTransactionCategories = async () => {
      try {
        const { data } = await fetchAllTransactionCategories();
        setTransactionCategories(data);
      } catch (err) {
        console.error("no categories found", err);
      }
    };
    getUserData();

    getAllTransactionCategories();
  }, []);

  const handleTransactionOnChange = (e) => {
    console.log(e.target.value);
    setSelectedTransaction(e.target.value);
  };
  const handleCalendarOnChange = (e) => {
    setSchedule(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log("submitted");
    const data = { user_id: userData.id, schedule: schedule, category_id: selectedTransaction };
    const res = await axios.post(`${SERVER_URL}/transactions`, data);
    console.log(res);
  };

  const { last_name, first_name, middle_name, extension_name, contact_number, email_address } = userData || {};
  return (
    <>
      <div className='h-[85%] w-full'>
        <div className='text-slate-900 flex justify-center'>
          <h1 className='font-semibold text-2xl p-4'>Create Request</h1>
        </div>
        <div className='flex justify-around mx-4 h-full gap-2'>
          <div className='flex flex-col w-1/4 justify-between border border-gray-300'>
            <div>
              <div>
                <p className='bg-gray-200 px-4 py-2 font-semibold border-b border-gray-300'>PUP Data Privacy Notice</p>
              </div>
              <div className='px-4 py-2'>
                <p className='text-xs'>
                  PUP respects and values your rights as a data subject under the Data Privacy Act (DPA). PUP is committed to protecting the personal data you provide in a accordance with the
                  requirements under the DPA and its IRR. In this regard, PUP implements reasonable and appropriate security measures to maintain the confidentiality, integrity and availabilty of your
                  personal data. For more detailed Privacy Statement, you may visit <a href='https://www.pup.edu.ph/privacy'>https://www.pup.edu.ph/privacy</a>
                </p>
              </div>
            </div>
            <div className='flex flex-col gap-2 px-4 py-2 text-center'>
              <Link to='/transactions' className='text-red-800 py-1 border-2 border-red-800 rounded-md hover:bg-red-100 focus:bg-red-300 '>
                My transactions
              </Link>
              <button className='text-red-800 py-1 border-2 border-red-800 rounded-md hover:bg-red-100 focus:bg-red-300'>Reset Form</button>
              <Link to='/help' className='text-red-800 py-1 border-2 border-red-800 rounded-md hover:bg-red-100 focus:bg-red-300'>
                Help
              </Link>
            </div>
          </div>
          <div className='flex flex-col w-3/4 border border-gray-300'>
            <p className='bg-gray-200 py-2 px-4 font-semibold border-b border-gray-300'>Request Form</p>
            <div className='flex flex-col gap-4 px-4 py-2'>
              <form onSubmit={handleFormSubmit}>
                <p className='text-sm'>
                  Fields highlighted in <span className='text-red-600'>*</span> are required
                </p>
                <p className='font-semibold mt-4'>Student Information</p>
                <div className='flex flex-col gap-2'>
                  {/* <label className='text-sm' htmlFor='student_number'>
                    Student Number <span className='text-red-600'>*</span>
                  </label>
                  <input className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400' type='text' name='student_number' id='student_number' /> */}
                  <label className='text-sm' htmlFor='last_name'>
                    Last Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                    required
                    type='text'
                    name='last_name'
                    id='last_name'
                    placeholder={last_name !== undefined ? last_name : ""}
                    disabled={last_name !== undefined}
                  />
                  <label className='text-sm' htmlFor='first_name'>
                    First Name <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                    required
                    type='text'
                    name='first_name'
                    id='first_name'
                    placeholder={first_name !== undefined ? first_name : ""}
                    disabled={first_name !== undefined}
                  />
                  <div className='flex gap-8'>
                    <div className='flex flex-col gap-2'>
                      <label className='text-sm' htmlFor='middle_name'>
                        Middle Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                        required
                        type='text'
                        name='middle_name'
                        id='middle_name'
                        placeholder={middle_name !== undefined ? middle_name : ""}
                        disabled={middle_name !== undefined}
                      />
                    </div>
                    <div className='flex flex-col gap-2'>
                      <label className='text-sm' htmlFor='extension_name'>
                        Extension Name <span className='text-red-600'>*</span>
                      </label>
                      <input
                        className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                        required
                        type='text'
                        name='extension_name'
                        id='extension_name'
                        placeholder={extension_name !== undefined ? extension_name : ""}
                        disabled={extension_name !== undefined}
                      />
                    </div>
                  </div>
                  <label className='text-sm' htmlFor='contact_number'>
                    Contact Number <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                    required
                    type='text'
                    name='contact_number'
                    id='contact_number'
                    placeholder={contact_number !== undefined ? contact_number : ""}
                    disabled={contact_number !== undefined}
                  />
                  <label className='text-sm' htmlFor='email_address'>
                    Email Address <span className='text-red-600'>*</span>
                  </label>
                  <input
                    className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400'
                    required
                    type='email'
                    name='email_address'
                    id='email_address'
                    placeholder={email_address !== undefined ? email_address : ""}
                    disabled={email_address !== undefined}
                  />
                </div>
                <p className='font-semibold'>Request Information</p>
                <div className='flex flex-row gap-8'>
                  <div className='flex flex-col gap-2'>
                    <label className='text-sm' htmlFor='service_type'>
                      Types of Services<span className='text-red-600'>*</span>
                    </label>
                    <select onChange={handleTransactionOnChange} className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400 ' name='service_type' id='service_type'>
                      {transactionCategories.map((c) => {
                        return (
                          <option key={c.id} value={c.id}>
                            {c.name}
                          </option>
                        );
                      })}
                    </select>
                    <label className='text-sm' htmlFor='service_type'>
                      Date<span className='text-red-600'>*</span>
                    </label>
                    <input
                      onChange={handleCalendarOnChange}
                      required
                      min={new Date().toISOString().split("T")[0]}
                      className='w-80 px-4 py-2 border border-gray-300 rounded-md disabled:text-gray-400 '
                      type='date'
                      name='schedule'
                      id='schedule'
                    />
                  </div>
                  <div className='bg-green-200 p-4 text-green-700 flex flex-col gap-2'>
                    <p className='text-lg font-semibold'>Reminder</p>
                    <p className='text-sm'>Your appointment request will be forwared to the concerned office after you click the &quot;Submit&quot; button</p>
                    <p className='text-sm'>Confirmation (approved/disapproved) of the request will be sent to your registered email.</p>
                    <p className='text-sm'>
                      You may also constantly monitor the status of the request by going to{" "}
                      <Link className='font-semibold' to='/transactions'>
                        My Transactions
                      </Link>
                    </p>
                  </div>
                </div>
                <div className='flex my-2 gap-4'>
                  <Link to='../'>
                    <button className='bg-red-800 text-white rounded-md px-4 py-2'>Back</button>
                  </Link>
                  <button type='submit' className='w-32 bg-red-800 text-white rounded-md px-4 py-2'>
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Request;

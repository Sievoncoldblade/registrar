import axios from "axios";
import { useEffect, useState } from "react";
import DataTable from "react-data-table-component";

const SERVER_URL = "http://localhost:8001";

const Transactions = ({ userData }) => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(() => "Name");
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    const fetchAllTransactions = async () => {
      try {
        const { id } = userData;
        const res = await axios.get(`${SERVER_URL}/transactions/${id}`);
        setTransactions(res.data);
        setFilteredData(res.data);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchAllTransactions();
  }, []);

  const handleOnChange = (e) => {
    setFilter(e.target.value);
  };

  const handleFilter = (e, filter) => {
    const newData = transactions.filter((row) => {
      let a = row[filter.toLowerCase()].toLowerCase().includes(e.target.value.toLowerCase());
      console.log(a);
      return a;
    });

    setFilteredData(newData);
  };

  const formatDate = (datetimeString) => {
    const dateObj = new Date(datetimeString);
    const formattedDate = `${dateObj.getFullYear()}-${dateObj.getMonth() + 1}-${dateObj.getDate()}`;
    return formattedDate;
  };

  const columns = [
    { name: "Request Code", selector: (row) => row.id, sortable: true },
    { name: "Request", selector: (row) => row.name, sortable: true },
    { name: "Schedule", selector: (row) => row.schedule, sortable: true, format: (row) => formatDate(row.schedule) },
    { name: "Status", selector: (row) => row.type, sortable: true },
  ];

  return (
    <>
      <div>
        <div className='text-center my-4'>
          <h1 className='text-3xl font-semibold'>Transaction History</h1>
        </div>
        <div>
          <div>
            <div className='flex flex-row justify-end gap-4 mr-4'>
              <select onChange={handleOnChange}>
                <option value='Name'>Name</option>
                <option value='Schedule'>Schedule</option>
                <option value='Type'>Status</option>
              </select>
              <input className='px-4 py-2' type='text' name='search' id='search' placeholder={`Search by ${filter}`} onChange={(e) => handleFilter(e, filter)} />
            </div>
          </div>
          <div>{loading ? <p>Loading...</p> : <DataTable columns={columns} data={filteredData} pagination fixedHeader></DataTable>}</div>
        </div>
      </div>
    </>
  );
};

export default Transactions;

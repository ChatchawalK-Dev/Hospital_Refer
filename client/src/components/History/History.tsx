import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Paginator } from 'primereact/paginator';
import Navbar from '../shared/Navbar';
import Sidebar from '../shared/sidebar';
import axios from 'axios';
import Frompesonal from './Frompesonal';

// Define History component
const History = () => {
  // Define states
  const [first, setFirst] = useState<number>(0);
  const [rows] = useState<number>(10);
  const [originalData, setOriginalData] = useState<any[]>([]);
  const [filteredData, setFilteredData] = useState<any[]>([]);
  const [totalCases, setTotalCases] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [searchPatientCID, setSearchPatientCID] = useState<string>('');
  const [searchHN, setSearchHN] = useState<string>('');
  const [searchPatientNameTH, setSearchPatientNameTH] = useState<string>('');
  const [searchPatientLastNameTH, setSearchPatientLastNameTH] = useState<string>('');

  console.log(originalData)

  // Fetch data on component mount
  useEffect(() => {
    const getHospcode = async () => {
      try {
        const storedHospcode = await localStorage.getItem('hospcode');
        if (storedHospcode) {
          const parsedHospcode = JSON.parse(storedHospcode);
          fetchMedicalRecords(parsedHospcode);
        }
      } catch (error) {
        console.error("Error retrieving hospcode from local storage:", error);
      }
    };

    getHospcode();
  }, []);

  // Fetch medical records data
  const fetchMedicalRecords = async (parsedHospcode: string) => {
    try {
      setLoading(true);
      const response = await fetch(`http://localhost:3001/medicalRecords/?hospcode=${parsedHospcode}`);
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setOriginalData(data);
      setFilteredData(data);
      setTotalCases(data.length);
      setLoading(false);
    } catch (error) {
      setError('Error fetching data. Please try again later.');
      setLoading(false);
      console.error('Error fetching data:', error);
    }
  };

// Handle search
const handleSearch = () => {
  let newData = [...originalData];
  if (searchPatientCID.trim() !== '') {
    newData = newData.filter(item => 
      item.CID && item.CID.toLowerCase().includes(searchPatientCID.toLowerCase())
    );
  }
  if (searchHN.trim() !== '') {
    newData = newData.filter(item => item.HN.toLowerCase().includes(searchHN.toLowerCase()));
  }
  if (searchPatientNameTH.trim() !== '') {
    newData = newData.filter(item => 
      item.name && item.name.toLowerCase().includes(searchPatientNameTH.toLowerCase())
    );
  }
  if (searchPatientLastNameTH.trim() !== '') {
    newData = newData.filter(item =>
      item.lastname && item.lastname.toLowerCase().includes(searchPatientLastNameTH.toLowerCase())
    );
  }
  setFilteredData(newData);
  setTotalCases(newData.length);
  setFirst(0);
};

console.log(searchPatientCID)
console.log(searchHN)
console.log(searchPatientNameTH)
console.log(searchPatientLastNameTH)

  // Handle reset
  const handleReset = () => {
    setSearchPatientCID('');
    setSearchHN('');
    setSearchPatientNameTH('');
    setSearchPatientLastNameTH('');
    setFilteredData(originalData);
    setTotalCases(originalData.length);
    setFirst(0);
  };

  const handleSendData = async (HN: string) => {
    try {
      await axios.post('http://localhost:3001/medicalRecords/update', { hn: HN });
      console.log('Data sent successfully for HN:', HN);
    } catch (error) {
      console.error('Error sending data:', error);
    }
  };


  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <main className="px-6 py-4">
          <div className="flex items-end mb-4 space-x-4">
            <div className="flex flex-col mr-4">
              <p className="text-lg mb-1">เลขบัตรประชาชน</p>
              <input
                type="text"
                placeholder="เลขบัตรประชาชน"
                value={searchPatientCID}
                onChange={(e) => setSearchPatientCID(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col mr-4">
              <p className="text-lg mb-1">ชื่อผู้ป่วย</p>
              <input
                type="text"
                placeholder="ชื่อผู้ป่วย"
                value={searchPatientNameTH}
                onChange={(e) => setSearchPatientNameTH(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col mr-4">
              <p className="text-lg mb-1">นามสกุลผู้ป่วย</p>
              <input
                type="text"
                placeholder="นามสกุลผู้ป่วย"
                value={searchPatientLastNameTH}
                onChange={(e) => setSearchPatientLastNameTH(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex flex-col mr-4">
              <p className="text-lg mb-1">เลข HN</p>
              <input
                type="text"
                placeholder="เลข HN"
                value={searchHN}
                onChange={(e) => setSearchHN(e.target.value)}
                className="border rounded-lg px-3 py-2"
              />
            </div>
            <div className="flex items-end space-x-2">
              <button
                onClick={handleSearch}
                className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded"
              >
                ค้นหา
              </button>
              <button
                onClick={handleReset}
                className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-2 rounded"
              >
                รีเซ็ต
              </button>
            </div>
          </div>
          {loading && <div>Loading...</div>}
          {error && <div>Error: {error}</div>}
          {!loading && !error && (
            <div>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <p>Total Case:</p>
                  <p className="text-blue-500 font-bold ml-2">{totalCases}</p>
                  <p className="ml-1">Case</p>
                </div>
                <Link to="/FromPesonal" className="bg-blue-500 text-white px-4 py-2 rounded-md">Create Case</Link>
              </div>
              <div className="bg-gray-200 rounded-lg overflow-hidden">
                <table className="min-w-full">
                  <thead>
                    <tr className="bg-gray-300">
                      <th className="px-4 py-2">Ref. Number</th>
                      <th className="px-4 py-2">HN</th>
                      <th className="px-4 py-2">CID</th>
                      <th className="px-4 py-2">Name</th>
                      <th className="px-4 py-2">Surname</th>
                      <th className="px-4 py-2">Age</th>
                      <th className="px-4 py-2">Chronic Diseases</th>
                      <th className="px-4 py-2">Edit</th>
                      <th className="px-4 py-2">Refer Out</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredData.slice(first, first + rows).map((row, index) => (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-100"}>
                        <td className="px-4 py-2 text-center">
                          <Link to={`/Info`} state={{ HN: row.HN }} className="text-blue-500 hover:underline">
                            {row.Refnumber}
                          </Link></td>
                        <td className="px-4 py-2 text-center">{row.HN}</td>
                        <td className="px-4 py-2 text-center">{row.CID}</td>
                        <td className="px-4 py-2 text-center">{row.name}</td>
                        <td className="px-4 py-2 text-center">{row.lastname}</td>
                        <td className="px-4 py-2 text-center">{row.Old}</td>
                        <td className="px-4 py-2 text-center">{row.Disease}</td>
                        <td className="px-4 py-2 text-center">
                          <Link to={`/edit/${row.idpersonal_patient}`} 
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" 
                            state={{ HN: row.CID }}>
                            Edit
                          </Link>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <Link
                            onClick={() => handleSendData(row.HN)}
                            to={`/PersonInfoOut`}
                            state={{ HN: row.HN }}
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded"
                          >
                            Send
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <Paginator first={first} rows={rows} totalRecords={totalCases} onPageChange={(e) => setFirst(e.first)} className="p-4" />
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default History;

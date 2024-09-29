import { ChangeEvent, useEffect, useState } from 'react';
import Sidebar from '../shared/sidebar';
import Navbar from '../shared/Navbar';
import LineChart from './linechart';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { FaVanShuttle } from "react-icons/fa6";
import { FaWheelchair } from "react-icons/fa6";
import axios from 'axios';

interface ReferInItem {
  year: string;
  refer_in: string;
  status: string;
  date_referin: string;
  count: number;
}

interface ReferOutItem {
  year: string;
  refer_out: string;
  status: string;
  date_refer: string;
  count: number;
}

function Dashboard() {
  const [selectedYear, setSelectedYear] = useState('');
  const years = [2021, 2022, 2023, 2024, 2025];

  const [hospcode, setHospcode] = useState('');

  const [referInDataStatus1, setReferInDataStatus1] = useState<ReferInItem[]>([]);
  const [referInDataStatus2, setReferInDataStatus2] = useState<ReferInItem[]>([]);
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  
  const [referInDataStatus3, setReferInDataStatus3] = useState<ReferOutItem[]>([]);
  const [referInDataStatus4, setReferInDataStatus4] = useState<ReferOutItem[]>([]);
  const [startDate1, setStartDate1] = useState<Date | null>(null);
  const [endDate1, setEndDate1] = useState<Date | null>(null);

  useEffect(() => {
    const getHospcode = async () => {
      try {
        const storedHospcode = await localStorage.getItem('hospcode');
        if (storedHospcode) {
          const parsedHospcode = JSON.parse(storedHospcode);
          setHospcode(parsedHospcode);
        }
      } catch (error) {
        console.error("Error retrieving hospcode from local storage:", error);
      }
    };
  
    getHospcode();
  }, []);

  const handleYearChange = (event: ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(event.target.value);
  };

  const applyFilterReferin = async () => {
    if (!startDate || !endDate ) {
      alert('Please select both start and end dates for filtering.');
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:3001/dashboard/referin1/card/?hospcode=${hospcode}&from=${startDate.toISOString()}&to=${endDate.toISOString()}`
      );
  
      // Separate filtering logic based on status
      const filteredDataStatus1 = response.data.filter(
        (item: ReferInItem) => item.refer_in === '0' && item.status === '2' && isWithinDateRange1(item.date_referin, startDate, endDate)
      );
      const filteredDataStatus2 = response.data.filter(
        (item: ReferInItem) => item.refer_in === '1' && item.status === '1' && isWithinDateRange1(item.date_referin, startDate, endDate)
      );
  
      setReferInDataStatus1(filteredDataStatus1);
      setReferInDataStatus2(filteredDataStatus2);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  
  const applyFilterReferout = async () => {
    if (!startDate1 || !endDate1) {
      alert('Please select both start and end dates for filtering.');
      return;
    }
  
    try {
      const response = await axios.get(
        `http://localhost:3001/dashboard/referout1/card/?hospcode=${hospcode}&from=${startDate1.toISOString()}&to=${endDate1.toISOString()}`
      );
  
      // Separate filtering logic based on status
      const filteredDataStatus3 = response.data.filter(
        (item: ReferOutItem) => item.refer_out === '0' && item.status === '2' && isWithinDateRange2(item.date_refer, startDate1, endDate1)
      );
      const filteredDataStatus4 = response.data.filter(
        (item: ReferOutItem) => item.refer_out === '1' && item.status === '1' && isWithinDateRange2(item.date_refer, startDate1, endDate1)
      );
  
      setReferInDataStatus3(filteredDataStatus3);
      setReferInDataStatus4(filteredDataStatus4);
    } catch (error) {
      console.error('Error fetching filtered data:', error);
    }
  };
  
  const isWithinDateRange1 = (date: string | Date, startDate: Date | null, endDate: Date | null) => {
    if (!date || !startDate || !endDate) {
      return false;
    }
    const convertedDate = new Date(date);
    return convertedDate >= startDate && convertedDate <= endDate;
  };

  const isWithinDateRange2 = (date: string | Date, startDate1: Date | null, endDate1: Date | null) => {
    if (!date || !startDate1 || !endDate1) {
      return false;
    }
    const convertedDate = new Date(date);
    return convertedDate >= startDate1 && convertedDate <= endDate1;
  };

  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <Sidebar />

      {/* Main content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Navbar */}
        <Navbar />

        {/* Page content */}
        <main className="flex-1 p-8">
          <div className="flex flex-wrap mb-5 justify-between">
          <div className="w-full md:w-1/3 px-2">
          <select
            value={selectedYear}
            onChange={handleYearChange}
            aria-label="Select Year"
            className="mt-1 p-2 w-full bg-blue-100 rounded-md placeholder-black focus:outline-none focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select Year</option>
            {years.map((year) => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
            </div>

          </div>
          <LineChart selectedYear={Number(selectedYear)} hospcode={hospcode}/>
          <div className="flex flex-wrap gap-5 justify-between m-4">
          <div className="bg-red-200 bg-opacity-90 rounded-lg block p-2.5 drop-shadow-lg">
            <span className="flex items-center justify-center text-blue-700 font-bold text-4xl">Refer In</span>
            <div className="flex flex-col sm:flex-row items-center justify-center p-2.5">
            <div className="mr-4">
              <DatePicker
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="ตั้งแต่วันที่"
                className="bg-white text-black font-normal py-2 rounded mt-4"
                filterDate={(date) => {
                  if (!selectedYear) return true;
                  const year = new Date(date).getFullYear().toString();
                  return year === selectedYear;
                }}
              />
            </div>
            <div className="mr-4">
              <DatePicker
                selected={endDate}
                onChange={(date) => setEndDate(date)} // Set end date
                dateFormat="dd/MM/yyyy"
                isClearable
                placeholderText="ถึงวันที่"
                className="bg-white text-black font-normal py-2 rounded mt-4"
                filterDate={(date) => {
                  if (!selectedYear) return true;
                  const year = new Date(date).getFullYear().toString();
                  return year === selectedYear;
                }}
              />
            </div>
            <button onClick={applyFilterReferin} className="bg-white text-black font-normal py-2 px-4 rounded mt-4">
                ดูรายงาน
              </button>
            </div>
            <div className="flex flex-col gap-20 sm:flex-row items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center">
              <FaVanShuttle className="w-24 h-24 text-blue-700" />
              <p>ข้อมูลนำเข้าผู้ป่วยทั้งหมด {' '} 
                <span className="text-blue-700">
                {referInDataStatus1.reduce((acc: number, curr: ReferInItem) => acc + curr.count, 0)}
                </span>{' '} ราย</p>
              </div>
              <div className="flex flex-col items-center justify-center">
              <FaWheelchair className="w-24 h-16 text-blue-700" />
             <p className="pt-8">
                ข้อมูลรับเข้ามาแล้ว{' '}
                <span className="text-blue-700">
                {referInDataStatus2.reduce((acc: number, curr: ReferInItem) => acc + curr.count, 0)}
                </span>{' '}
                ราย
              </p>
              </div>
              </div>
          </div>
            <div className="bg-yellow-100 bg-opacity-90 rounded-lg block p-2.5 drop-shadow-lg">
              <span className="flex items-center justify-center text-blue-700 font-bold text-4xl">Refer Out</span>
              <div className="flex flex-col sm:flex-row items-center justify-center p-2.5">
              <div className="mr-4">
                <DatePicker
                  selected={startDate1}
                  onChange={(date) => setStartDate1(date)}
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText="ตั้งแต่วันที่"
                  className="bg-white text-black font-normal py-2 rounded mt-4"
                  filterDate={(date) => {
                    if (!selectedYear) return true;
                    const year = new Date(date).getFullYear().toString();
                    return year === selectedYear;
                  }}
                />
              </div>
              <div className="mr-4">
                <DatePicker
                  selected={endDate1}
                  onChange={(date) => setEndDate1(date)} // Set end date
                  dateFormat="dd/MM/yyyy"
                  isClearable
                  placeholderText="ถึงวันที่"
                  className="bg-white text-black font-normal py-2 rounded mt-4"
                  filterDate={(date) => {
                    if (!selectedYear) return true;
                    const year = new Date(date).getFullYear().toString();
                    return year === selectedYear;
                  }} 
                />
              </div>
              <button onClick={applyFilterReferout} className="bg-white text-black font-normal py-2 px-4 rounded mt-4">
                ดูรายงาน
              </button>
              </div>
              <div className="flex flex-col gap-20 sm:flex-row items-center justify-center p-4">
            <div className="flex flex-col items-center justify-center">
              <FaVanShuttle className="w-24 h-24 text-blue-700" />
              <p>ข้อมูลส่งต่อทั้งหมด {' '}
                <span className="text-blue-700">
                {referInDataStatus3.reduce((acc: number, curr: ReferOutItem) => acc + curr.count, 0)}
                </span> {' '}
                ราย</p>
              </div>
              <div className="flex flex-col items-center justify-center">
              <FaWheelchair className="w-24 h-16 text-blue-700" />
              <p className="pt-8">ข้อมูลรับตัวไปแล้ว {' '}
              <span className="text-blue-700">
                {referInDataStatus4.reduce((acc: number, curr: ReferOutItem) => acc + curr.count, 0)}
                </span> {' '}
                ราย</p>
              </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { CiSearch } from "react-icons/ci";
import { CiFilter } from "react-icons/ci";
import { Paginator } from "primereact/paginator";
import { Link } from "react-router-dom";

function ReferOut() {
  const [first, setFirst] = useState<number>(0);
  const [rows] = useState<number>(10);
  const [searchName, setSearchName] = useState("");
  const [searchHN, setSearchHN] = useState("");
  const [urgencyOption, setUrgencyOption] = useState("");
  const [referOutCases, setReferOutCases] = useState<number>(0);
  const [referOutData, setReferOutData] = useState<any[]>([]);
  const [referOutFilter, setReferOutFilter] = useState<any[]>([]);

  const [hospcode, setHospcode] = useState('');

  useEffect(() => {
    const getHospcode = async () => {
      try {
        const storedHospcode = await localStorage.getItem('hospcode');
        if (storedHospcode) {
          const parsedHospcode = JSON.parse(storedHospcode);
          setHospcode(parsedHospcode);
  
          // Fetch data using the updated hospcode
          fetch(`http://localhost:3001/searchReferOut/?hospcode=${parsedHospcode}`)
            .then((response) => response.json())
            .then((data) => {
              setReferOutData(data);
              setReferOutFilter(data);
              setReferOutCases(data.length);
            })
            .catch((error) => {
              console.error("Error fetching data:", error);
            });
        }
      } catch (error) {
        console.error("Error retrieving hospcode from local storage:", error);
      }
    };
  
    getHospcode();
  }, []);

  const handleSearch = () => {
    let newData: any = [...referOutData];

    if (searchName.trim() !== "") {
      newData = newData.filter(
        (item: { fullNameTH?: string }) =>
          item.fullNameTH &&
          item.fullNameTH.toLowerCase().includes(searchName.toLowerCase())
      );
    }

    if (searchHN.trim() !== "") {
      newData = newData.filter(
        (item: { HN?: string }) =>
          item.HN && item.HN.toLowerCase().includes(searchHN.toLowerCase())
      );
    }

    if (urgencyOption !== "0") {
      newData = newData.filter(
        (item: { Triage?: string }) => item.Triage === urgencyOption
      );
    }

    setReferOutFilter(newData);
    setReferOutCases(newData.length);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setUrgencyOption(event.target.value);
  };

  const handleReset = () => {
    setSearchName("");
    setSearchHN("");
    setUrgencyOption("0");
    fetch(`http://localhost:3001/searchReferOut/?hospcode=${hospcode}`)
      .then((response) => response.json())
      .then((data) => {
        setReferOutData(data);
        setReferOutFilter(data);
        setReferOutCases(data.length);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };
  console.log(referOutData)

  const setTriage = (Triage: any) => {
    switch (Triage) {
      case "1":
        return (
          <div className="mx-auto min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-red-500 border border-black" />
        );
      case "2":
        return (
          <div className="mx-auto min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-pink-400 border border-black" />
        );
      case "3":
        return (
          <div className="mx-auto min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-amber-500 border border-black" />
        );
      case "4":
        return (
          <div className="mx-auto min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-green-500 border border-black" />
        );
      case "5":
        return (
          <div className="mx-auto min-w-5 min-h-5 max-w-5 max-h-5 rounded-full bg-white border border-black" />
        );
      default:
        return "-";
    }
  };

  const setStatus = (status: any) => {
    switch (status) {
      case "1":
        return "อนุมัติ";
      case "2":
        return "รอดำเนินการอนุมัติ";
      case "3":
        return "ปฎิเสธ";
      default:
        return "ไม่ทราบสถานะ";
    }
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <div className="grid grid-cols-12 gap-x-20 mt-8 mx-4">
          <div className="xs:col-span-12 lg:col-span-2">
            <p className="text-lg mb-1 ml-1 ">ชื่อ-นามสกุล</p>
            <input
              type="text"
              placeholder="ชื่อ-นามสกุล"
              value={searchName}
              onChange={(e) => setSearchName(e.target.value)}
              className="border rounded-lg px-3 py-2 mr-4 "
            />
          </div>
          <div className="xs:col-span-12 lg:col-span-2">
            <p className="text-lg mb-1 ml-1">เลข HN</p>
            <input
              type="text"
              placeholder="เลข HN"
              value={searchHN}
              onChange={(e) => setSearchHN(e.target.value)}
              className="border rounded-lg px-3 py-2 mr-4 "
            />
          </div>
          <div className="xs:col-span-12 lg:col-span-6 ">
            <p className="text-lg mb-1 ml-1 ">ระดับความเร่งด่วน</p>
            <select
              value={urgencyOption}
              onChange={handleSelectChange}
              className="border rounded-lg px-4 py-2 mr-4"
            >
              <option value="0">ทั้งหมด</option>
              <option value="1">Resuscitation</option>
              <option value="2">Emergency</option>
              <option value="3">Ungency</option>
              <option value="4">Semi urgency</option>
              <option value="5">Non Urgency</option>
            </select>
            <button
              onClick={handleSearch}
              className="bg-sky-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2 inline-flex items-center "
            >
              <CiSearch className="mr-2" />
              ค้นหา
            </button>
            <button
              onClick={handleReset}
              className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded inline-flex items-center "
            >
              <CiFilter className="mr-2" />
              รีเซ็ต
            </button>
          </div>
        </div>
        <div className="mt-4 mx-4 flex inline-flex items-center text-lg">
          <p className="">Total Case : </p>
          <p className="text-blue-500 font-bold ml-4">{referOutCases}</p>
          <p className="ml-1"> Case</p>
        </div>
        {/* <div className="mt-4 mx-4 flex inline-flex items-center text-lg justify-start">
          <div className="block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full bg-red-500 border border-black" />
            <p className="ml-1">= Resuscitation</p>
          </div>
          <div className="block flex inline-flex items-center">
            <div className="w-5 h-5 ml-2 rounded-full bg-pink-400 border border-black" />
            <p className="ml-1">= Emergency</p>
          </div>
          <div className="block flex inline-flex items-center">
            <div className="w-5 h-5 ml-2 rounded-full bg-amber-500 border border-black" />
            <p className="ml-1">= Urgency</p>
          </div>
          <div className="block flex inline-flex items-center">
            <div className="w-5 h-5 ml-2 rounded-full bg-green-500 border border-black" />
            <p className="ml-1">= Semi urgency</p>
          </div>
          <div className="block flex inline-flex items-center">
            <div className="w-5 h-5 ml-2 rounded-full border border-black" />
            <p className="ml-1">= Non urgency</p>
          </div>
        </div> */}
        <div className="grid grid-cols-7 mt-4 mx-4 flex inline-flex items-center text-lg justify-start">
          <div className="xs:col-span-12 lg:col-span-1 block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full bg-red-500 border border-black" />
            <p className="ml-1">= Resuscitation</p>
          </div>
          <div className="xs:col-span-12 lg:col-span-1 block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full bg-pink-400 border border-black" />
            <p className="ml-1">= Emergency</p>
          </div>
          <div className="xs:col-span-12 lg:col-span-1 lg:col-span-1 block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full bg-amber-500 border border-black" />
            <p className="ml-1">= Urgency</p>
          </div>
          <div className="xs:col-span-12 lg:col-span-1 block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full bg-green-500 border border-black" />
            <p className="ml-1">= Semi urgency</p>
          </div>
          <div className="xs:col-span-12 lg:col-span-1 block flex inline-flex items-center">
            <div className="w-5 h-5 rounded-full border border-black" />
            <p className="ml-1">= Non urgency</p>
          </div>
        </div>
        <div className="mt-4 mx-4">
          <div className="bg-gray-200 rounded-lg overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gray-300 border border-white">
                  <th className="px-4 py-2 border border-white" colSpan={2}>
                    Refer in
                  </th>
                  <th className="px-4 py-2 border border-white" colSpan={2}>
                    ผู้ป่วย
                  </th>
                  <th className="px-4 py-2 border border-white" colSpan={3}>
                    ใบส่งตัว
                  </th>
                  <th className="px-4 py-2 border border-white" colSpan={4}>
                    สถานีบริการปลายทาง
                  </th>
                </tr>
                <tr className="bg-gray-300">
                  <th className="px-4 py-2 border border-white">No.</th>
                  <th className="px-4 py-2 border border-white">
                    ระดับความเร่งด่วน
                  </th>
                  <th className="px-4 py-2 border border-white">HN</th>
                  <th className="px-4 py-2 border border-white">
                    ชื่อ-นามสกุล
                  </th>
                  <th className="px-4 py-2 border border-white">เลขที่ส่ง</th>
                  <th className="px-4 py-2 border border-white">
                    วันที่ส่งตัว
                  </th>
                  <th className="px-4 py-2 border border-white">เวลาส่งตัว</th>
                  <th className="px-4 py-2 border border-white">ปลายทาง</th>
                  <th className="px-4 py-2 border border-white">
                    วันที่รับตัว
                  </th>
                  <th className="px-4 py-2 border border-white">เวลารับตัว</th>
                  <th className="px-4 py-2 border border-white">สถานะ</th>
                </tr>
              </thead>
              {referOutFilter.length > 0 &&
                referOutFilter
                  .slice(first, first + rows)
                  .map((item: any, index: number) => (
                    <tr
                      key={index}
                      className="bg-gray-100 border border-gray-200"
                    >
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {index + 1}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {setTriage(item.Triage) || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.HN || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.fullNameTH || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.RefID || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                        {item.Date_ReferOut ? new Date(item.Date_ReferOut).toLocaleDateString('en-GB') : "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.Time_ReferOut || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.Hosp_Destination || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                        {item.Date_ReferIn ? new Date(item.Date_ReferIn).toLocaleDateString('en-GB') : "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {item.Time_ReferIn || "-"}
                        </Link>
                      </td>
                      <td className="px-4 py-2 text-center border border-white">
                        <Link to="/PersonInfoOut" state={{ HN: item.HN }}>
                          {setStatus(item.Status) || "-"}
                        </Link>
                      </td>
                    </tr>
                  ))}
            </table>
            <Paginator
              first={first}
              rows={rows}
              totalRecords={referOutCases}
              onPageChange={(e) => setFirst(e.first)}
              className="p-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default ReferOut;

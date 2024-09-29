import { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { IoMdPhotos } from "react-icons/io";
import { TbFirstAidKit } from "react-icons/tb";
import { FaRegHeart } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";
import { HiPencilSquare } from "react-icons/hi2";
import { IoMdEye } from "react-icons/io";
import { RiErrorWarningLine } from "react-icons/ri";
import { HiOutlineUsers } from "react-icons/hi2";
import { HiOutlineUser } from "react-icons/hi";
import { IoMdMap } from "react-icons/io";
import { MdSupervisedUserCircle } from "react-icons/md";
import { FaClipboardList } from "react-icons/fa";
import { MdLocalHospital } from "react-icons/md";
import { BsFileEarmarkBarGraphFill } from "react-icons/bs";
import { BiSolidPieChartAlt2 } from "react-icons/bi";
import { GoDownload } from "react-icons/go";
import { useLocation } from "react-router-dom";

function PersonInfo() {
  const [personInfoData, setPersonInfoData] = useState<any[]>([]);
  const [Accept, setAccept] = useState(false);
  const [NoAccept, setNoAccept] = useState(false);
  const location = useLocation();
  const HN = location.state.HN;
  const [reason, setReason] = useState("");
  const [warddisch, setWarddisch] = useState("");

  const closeAccept = () => {
    setAccept(false);
  };

  const closeNoAccept = () => {
    setNoAccept(false);
  };

  useEffect(() => {
    fetch(`http://localhost:3001/referInn?HN=${HN}`)
      .then((response) => response.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setPersonInfoData(data);
        } else {
          console.error("Error: Data is not an array");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const setSex = (Sex: any) => {
    switch (Sex) {
      case "1":
        return "ชาย";
      case "2":
        return "หญิง";
      default:
        return "-";
    }
  };

  const saveCase = () => {
    fetch("http://localhost:3001/referInn/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: 1,
        hn: HN,
        warddisch: warddisch,
        reason: reason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setAccept(true);
  };

  const cancelCase = () => {
    fetch("http://localhost:3001/referInn/update", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status: 3,
        hn: HN,
        warddisch: warddisch,
        reason: reason,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
    setNoAccept(true);
  };

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="data-container">
          {personInfoData.length > 0 &&
            personInfoData.map((item: any) => (
              <div className="container mx-auto ">
                <div className="flex justify-end space-x-5 mt-4 ">
                  <div className="">
                    <p className="block text-lg font-medium leading-6 text-gray-900">
                      ผลการรับผู้ป่วย
                    </p>
                    <input
                      type="text"
                      value={reason}
                      onChange={(e) => setReason(e.target.value)}
                      name="reason"
                      placeholder=""
                      className="block w-full rounded-md border-2 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-2 mt-3"
                    />
                  </div>
                  <div className="">
                    <p className="block text-lg font-medium leading-6 text-gray-900">
                      แผนกที่รับผู้ป่วย
                    </p>
                    <input
                      type="text"
                      value={warddisch}
                      onChange={(e) => setWarddisch(e.target.value)}
                      name="warddisch"
                      placeholder=""
                      className="block w-full rounded-md border-2 py-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-200 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-2 mt-3"
                    />
                  </div>
                  <div className="flex-col space-y-2 my-1">
                    <div>
                      <button
                        onClick={saveCase}
                        className="bg-blue-600 hover:bg-blue-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold block w-full cursor-pointer shadow-md shadow-blue-500/50"
                      >
                        บันทึกการรับเคส
                      </button>
                    </div>
                    <div>
                      <button
                        onClick={cancelCase}
                        className="bg-red-600 hover:bg-red-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold block w-full cursor-pointer shadow-md shadow-red-500/50"
                      >
                        ปฏิเสธการรับเคส
                      </button>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-12 gap-4 mt-4 mx-4">
                  <div className="block xs:col-span-12 lg:col-span-4 w-fit block rounded-md border-0 ring-2 ring-inset ring-gray-200 px-4 py-4 ">
                    <div className="block flex space-x-2 ">
                      <div className="block w-1/3 mx-auto">
                        <img
                          className="block mx-auto rounded-full border-4 border-blue-600 min-w-28 min-h-28 max-w-28 max-h-28"
                          src="https://cdn.pixabay.com/photo/2021/07/02/04/48/user-6380868_1280.png"
                          alt=""
                        />
                      </div>
                      <div className="block w-2/3 ">
                        <div className="block px-2 bg-blue-200 rounded-lg inline-block text-center">
                          HN{item.HN || "-"}
                        </div>
                        <div className="block mt-2">
                          <div className="block flex">
                            <div className="">บัตรประชาชน</div>
                            <div className="ml-1">{item.CID || "-"}</div>
                          </div>
                          <div className="block flex">
                            {item.fullNameTH || "-"}
                          </div>
                          <div className="block flex">
                            {item.fullNameEN || "-"}
                          </div>
                        </div>
                        <div className="block flex mt-2 space-x-4">
                          <a
                            className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center"
                            href="#"
                          >
                            <HiPencilSquare className="mr-2" />
                            แก้ไขข้อมูล
                          </a>
                          <a
                            className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center"
                            href="#"
                          >
                            ดูข้อมูล
                            <IoMdEye className="mr-2 ml-2" />
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="block mt-4">
                      <a
                        className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center"
                        href="#"
                      >
                        ไม่มีสิทธิการรักษา
                        <HiPencilSquare className="mr-2" />
                      </a>
                      <div className="block w-full flex flex-row">
                        <div className="basis-2/5 text-gray-500 text-sm">
                          <p>เพศ</p>
                          <p>อายุ</p>
                          <p>วันเกิด</p>
                          <p>หมู่เลือด</p>
                          <p>ที่อยู่บัตรประชาชน</p>
                        </div>
                        <div className="basis-3/5 text-gray-500 text-sm">
                          <p>{setSex(item.Sex) || "-"}</p>
                          <p>{item.Old || "-"}</p>
                          <p>
                            {item.BirthDay
                              ? new Date(item.BirthDay).toLocaleDateString(
                                  "en-GB"
                                )
                              : "-"}
                          </p>
                          <p>{item.BloodGroup || "-"}</p>
                          <p>{item.CIDAddress || "-"}</p>
                        </div>
                      </div>
                      <div className="block w-full flex flex-row">
                        <div className="basis-2/5 text-gray-500 text-sm">
                          <p>ศาสนา</p>
                          {/* <p>น้ำหนักล่าสุด</p>
                          <p>ส่วนสูงล่าสุด</p>
                          <p>ผลตรวจ eGFR ล่าสุด</p> */}
                          <p>วันที่ลงทะเบียน</p>
                        </div>
                        <div className="basis-3/5 text-gray-500 text-sm">
                          <p>{item.Religion || "-"}</p>
                          {/* <p>{item.w}</p>
                          <p>{item.h}</p>
                          <p>{item.eGFR}</p> */}
                          <p>
                            {item.RegistrationDate
                              ? new Date(
                                  item.RegistrationDate
                                ).toLocaleDateString("en-GB")
                              : "-"}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="block mx-4 mt-10 space-y-4">
                      <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold inline-flex items-center cursor-pointer drop-shadow-md w-full"
                      >
                        <IoMdPhotos className="mr-2" />
                        รูปภาพและเอกสารเพิ่มเติม
                      </a>
                      <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold inline-flex items-center cursor-pointer drop-shadow-md w-full"
                      >
                        <TbFirstAidKit className="mr-2" />
                        ประวัติการแพ้
                      </a>
                      <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold inline-flex items-center cursor-pointer drop-shadow-md w-full"
                      >
                        <FaRegHeart className="mr-2" />
                        โรคประจำตัว/ภาวะเสี่ยง
                      </a>
                      <a
                        href="#"
                        className="bg-blue-600 hover:bg-blue-900 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold inline-flex items-center cursor-pointer drop-shadow-md w-full"
                      >
                        <FaRegCreditCard className="mr-2" />
                        สิทธิการรักษา
                      </a>
                    </div>
                    <div className="mx-4 mt-10 text-center">
                      <div className="col-span-2 bg-blue-400 text-white sm:text-md sm:p-2 py-1.5 px-4 rounded-lg font-bold drop-shadow-md w-full">
                        REFER IN
                      </div>
                    </div>
                  </div>
                  <div className="block xs:col-span-12 lg:col-span-8 w-full rounded-md border-0 ring-2 ring-inset ring-gray-200 inline-flex space-x-5 py-10 px-10 ">
                    <div className="block xs:col-span-12 lg:col-span-7 w-7/12 ">
                      <div className="">
                        <div className="text-lg mb-4">
                          <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center ">
                            <RiErrorWarningLine className="mr-2" />
                            ข้อมูลส่วนตัว
                          </p>
                        </div>
                        <div className="block w-full flex flex-row">
                          <div className="basis-2/5 text-gray-500 text-sm space-y-1">
                            <p>สัญชาติ</p>
                            <p>เชื้อชาติ</p>
                            <p>อาชีพ</p>
                            <p>แพทย์ประจำตัว</p>
                            <p>เบอร์ติดต่อ</p>
                            <p>สถานะสมรส</p>
                          </div>
                          <div className="basis-3/5 text-gray-500 text-sm space-y-1">
                            <p>{item.Nationality || "-"}</p>
                            <p>{item.Ethnicity || "-"}</p>
                            <p>{item.Occupation || "-"}</p>
                            <p>{item.PersonalDoctor || "-"}</p>
                            <p>{item.ContactNumber || "-"}</p>
                            <p>{item.MaritalStatus || "-"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="text-lg mb-4">
                          <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center ">
                            <HiOutlineUsers className="mr-2" />
                            ครอบครัว
                          </p>
                        </div>
                        <div className="block w-full flex flex-row">
                          <div className="basis-2/5 text-gray-500 text-sm space-y-1">
                            {/* <p>ชื่อ-นามสกุล คู่สมรส</p>
                            <p>เลขบัตรประชาชน คู่สมรส</p> */}
                            <p>ชื่อ-นามสกุล บิดา</p>
                            <p>เลขบัตรประชาชน บิดา</p>
                            <p>ชื่อ-นามสกุล มารดา</p>
                            <p>เลขบัตรประชาชน มารดา</p>
                          </div>
                          <div className="basis-3/5 text-gray-500 text-sm space-y-1">
                            {/* <p>-</p>
                            <p>-</p> */}
                            <p>{item.FatherName || "-"}</p>
                            <p>{item.FatherCID || "-"}</p>
                            <p>{item.MotherName || "-"}</p>
                            <p>{item.MotherCID || "-"}</p>
                          </div>
                        </div>
                      </div>
                      <div className="mt-10">
                        <div className="text-lg mb-4">
                          <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center ">
                            <HiOutlineUser className="mr-2" />
                            บุคคลที่ติดต่อได้
                          </p>
                        </div>
                        <div className="block w-full flex flex-row">
                          <div className="basis-2/5 text-gray-500 text-sm space-y-1">
                            <p>ชื่อ-นามสกุล</p>
                            <p>ความสัมพันธ์</p>
                            <p>เบอร์ติดต่อ</p>
                          </div>
                          <div className="basis-3/5 text-gray-500 text-sm space-y-1">
                            <p>{item.EmergencyContactName || "-"}</p>
                            <p>{item.EmergencyContactRelationship || "-"}</p>
                            <p>{item.EmergencyContactMobile || "-"}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="block xs:col-span-12 lg:col-span-5 w-5/12">
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <IoMdMap className="mr-2" />
                          ที่อยู่ติดต่อได้
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.CurrentAddress || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <MdSupervisedUserCircle className="mr-2" />
                          ผู้แจ้งเรื่องผู้รับบริการ
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.InformantName || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <FaRegHeart className="mr-2" />
                          โรคเรื้อรัง
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.CongenitalDisease || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <FaClipboardList className="mr-2" />
                          แผนกการรักษา
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          ไม่พบข้อมูล
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <BiSolidPieChartAlt2 className="mr-2" />
                          อาการปัจจุบัน
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.CurrentSymptoms || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <MdLocalHospital className="mr-2" />
                          การรักษาในปัจจุบัน
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.CurrentTreatment || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                      <div className="block">
                        <p className="font-bold text-blue-600 hover:text-blue-700 inline-flex items-center text-lg mb-2">
                          <BsFileEarmarkBarGraphFill className="mr-2" />
                          ผลการวินิจฉัย
                        </p>
                        <p className="text-gray-500 text-sm mb-6">
                          {item.DiagnosisResult || "ไม่พบข้อมูล"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  {Accept && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white w-1/5 h-1/4 rounded-lg shadow-lg p-6 flex flex-col">
                        <div className="my-5 text-2xl text-center font-semibold text-blue-500">บันทึกการรับเคสสำเร็จ</div>
                        <button
                          onClick={closeAccept}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-md py-2 px-4 rounded-lg font-bold inline-block cursor-pointer shadow-md shadow-blue-500/50" 
                        >
                          ปิด
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                <div>
                  {NoAccept && (
                    <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
                      <div className="bg-white w-1/5 h-1/4 rounded-lg shadow-lg p-6 flex flex-col">
                        <div className="my-5 text-2xl text-center font-semibold text-blue-500">ปฏิเสธการรับเคสสำเร็จ</div>
                        <button
                          onClick={closeNoAccept}
                          className="bg-blue-600 hover:bg-blue-700 text-white text-md py-2 px-4 rounded-lg font-bold inline-block cursor-pointer shadow-md shadow-blue-500/50"
                        >
                          ปิด
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}

export default PersonInfo;

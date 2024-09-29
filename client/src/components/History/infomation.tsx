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
import { useLocation } from "react-router-dom";
import axios from 'axios';
import Modal from "react-modal";


function PersonInfo() {
  const [personInfo, setPersonInfo] = useState<any[]>([]);
  const [personIofofilterData, setPersonIofofilterData] = useState<any[]>([]);
  const location = useLocation();
  const HN = location.state.HN;

  const [isOpen1, setIsOpen1] = useState(false);
  const [isOpen2, setIsOpen2] = useState(false);
  const openModal1 = () => setIsOpen1(true);
  const closeModal1 = () => setIsOpen1(false);
  const openModal2 = () => setIsOpen2(true);
  const closeModal2 = () => setIsOpen2(false);
  const closebothModal = () => {
    closeModal1();
    closeModal2();
  };
  const [NoAccept, setNoAccept] = useState(false);
  const closeNoAccept = () => setNoAccept(false);


  useEffect(() => {
    fetch("http://localhost:3001/getdetailInformation/")
      .then((response) => response.json())
      .then((data) => {
        const personIofofilterData = data.filter((item: any) => {
          return item.HN === HN;
        });
        setPersonIofofilterData(personIofofilterData);
        setPersonInfo(data);
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

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex flex-col flex-1 overflow-y-auto">
        <Navbar />
        <main className="data-container">
          {personIofofilterData.length > 0 &&
            personIofofilterData.map((item: any) => (
              <div className="container mx-auto">
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
                    <div className="mx-4 mt-10 space-y-4 grid grid-cols-2 gap-x-2 text-center">
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
              </div>
            ))}
        </main>
      </div>
    </div>
  );
}

export default PersonInfo;

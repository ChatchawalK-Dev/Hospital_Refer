import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";
import axios from 'axios';

const Refer1: React.FC = () => {
  const location = useLocation();
  const HN = location.state.HN;
  const [hospOrigin, setHospOrigin] = useState('');
  const [formData, setFormData] = useState({
    date_refer: '',
    time_refer: '',
    hosp_origin: '',
    Wardno: '',
    warddisch: '',
    referDepartment: '',
    physicalexam: '',
    diagfirst: '',
    diaglast: '',
    causeout: '',
    hosp_destination: '',
    pstatus: '',
    ptype: '',
    emergency: '',
    ptyedis: '',
    request: '',
    doc_name: '',
    delivery: '',
    hn: HN,
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/referOutPopup', formData);
      console.log('Form submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting form', error);
    }
  };
console.log(HN)
  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div className="flex gap-4">
        <label>ข้อมูลการส่งต่อผู้รับบริการ</label>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>เลขที่การส่งต่อผู้รับบริการ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-64"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>เลขที่การส่งต่อผู้รับบริการกลางฯ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-56"
            type="text"
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>วันที่ส่งต่อผู้รับบริการ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-40"
            type="date"
            name="date_refer"
            value={formData.date_refer}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>เวลาที่ส่งต่อผู้รับบริการ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-40"
            type="time"
            name="time_refer"
            value={formData.time_refer}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>หน่วยบริการที่ส่งผู้รับบริการมา</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-64"
            name="hosp_origin"
            value={formData.hosp_origin}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="50121">50121</option>
            <option value="50122">50122</option>
            <option value="50211">50211</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>เลขที่ส่งต่อหน่วย</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-56"
            type="text"
            name="Wardno"
            value={formData.Wardno}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>แผนกที่ส่งต่อผู้รับบริการ</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-40"
            name="warddisch"
            value={formData.warddisch}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="ER">ER</option>
            <option value="OR">OR</option>
            <option value="LR">LR</option>
            <option value="OPD">OPD</option>
            <option value="MED">MED</option>
            <option value="PED">PED</option>
            <option value="SUR">SUR</option>
            <option value="ORTHOORTHO">ORTHOORTHO</option>
            <option value="OB-GYN">OB-GYN</option>
            <option value="ANC">ANC</option>
            <option value="IPD">IPD</option>
            <option value="PT">PT</option>
            <option value="LAB">LAB</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>ผลตรวจร่างกายสำคัญ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-64"
            type="text"
            name="physicalexam"
            value={formData.physicalexam}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>วินิจฉัยโรคแรกรับ (ชื่อโรค)</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-56"
            type="text"
            name="diagfirst"
            value={formData.diagfirst}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>วินิจฉัยโรคแรกสุดท้าย (ชื่อโรค)</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-40"
            type="text"
            name="diaglast"
            value={formData.diaglast}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>สาเหตุที่ส่งต่อ Refer</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-64"
            name="causeout"
            value={formData.causeout}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="1">เพื่อการวินิจฉัยและรักษา</option>
            <option value="2">เพื่อการวินิจฉัย</option>
            <option value="3">เพื่อการรักษาต่อเนื่อง</option>
            <option value="4">เพื่อการดูแลต่อใกล้บ้าน</option>
            <option value="5">ตามความต้องการผู้ป่วย</option>
            <option value="6">เพื่อส่งผู้ป่วยกลับไปยังหน่วยบริการที่ส่งผู้ป่วยมา</option>
            <option value="7">ไม่ได้ส่งต่อ</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>ไปที่หน่วยบริการ</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-56"
            name="hosp_destination"
            value={formData.hosp_destination}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="50121">50121</option>
            <option value="50122">50122</option>
            <option value="50211">50211</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>สภาพผู้รับบริการก่อนส่งต่อ</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-40"
            type="text"
            name="pstatus"
            value={formData.pstatus}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>ประเภทผู้รับบริการ</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-64"
            name="ptype"
            value={formData.ptype}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="1">ผู้ป่วยทั่วไป</option>
            <option value="2">ผู้ป่วยอุบัติเหตุ</option>
            <option value="3">ผู้ป่วยฉุกเฉิน</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>ระดับความเร่งด่วน</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-56"
            name="emergency"
            value={formData.emergency}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="1">Life threatening</option>
            <option value="2">emergency</option>
            <option value="3">urgent</option>
            <option value="4">acute</option>
            <option value="5">non acute</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label>กลุ่มโรคเฉพาะเพื่อส่งต่อ</label>
          <select
            className="border-2 border-gray-200 rounded h-8 w-40"
            name="ptyedis"
            value={formData.ptyedis}
            onChange={handleInputChange}
          >
            <option value="">เลือก</option>
            <option value="1">STEMI</option>
            <option value="2">Stroke</option>
            <option value="3">trauma</option>
            <option value="4">cancer</option>
            <option value="5">sepsis</option>
            <option value="6">pregnancy,labor,postpartum</option>
            <option value="7">new born</option>
            <option value="99">other</option>
          </select>
        </div>
      </div>
      <div className="flex gap-4">
        <div className="flex flex-col">
          <label>สิ่งที่ขอให้ดำเนินการ (รายละเอียดอื่นๆ)</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-64"
            type="text"
            name="request"
            value={formData.request}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>แพทย์ผู้รักษา</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-56"
            type="text"
            name="doc_name"
            value={formData.doc_name}
            onChange={handleInputChange}
          />
        </div>
        <div className="flex flex-col">
          <label>การนำส่ง</label>
          <input
            className="border-2 border-gray-200 rounded h-8 w-40"
            type="text"
            name="delivery"
            value={formData.delivery}
            onChange={handleInputChange}
          />
        </div>
      </div>
      <button type="submit" className="bg-blue-500 text-white rounded py-2 mt-4 max-w-24">บันทึกข้อมูล</button>
    </form>
  );
};

export default Refer1;

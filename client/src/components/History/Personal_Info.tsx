import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';

const Personal_Information = () => {
  const textbox = {
    nationality: "",
    ethnicity: "",
    bloodgroup: "",
    education: "",
    job: "",
    email: "",
    tel: "",
    personaldoctor: "",
    status: "",
    fathername: "",
    fathercid: "",
    mothername: "",
    mothercid: "",
    personalcontact: "",
    relationship: "",
    contact: "",
  };

  const trapping = Yup.object({
    nationality: Yup.string().required("nationality is required"),
    ethnicity: Yup.string().required("ethnicity is required"),
    bloodgroup: Yup.string().required("bloodgroup is required"),
    education: Yup.string().required("education is required"),
    job: Yup.string().required("job is required"),
    email: Yup.string().required("email is required"),
    tel: Yup.string().required("tel is required"),
    personaldoctor: Yup.string().required("personaldoctor is required"),
    status: Yup.string().required("status is required"),
    fathername: Yup.string().required("fathername is required"),
    fathercid: Yup.string().required("fathercid is required"),
    mothername: Yup.string().required("mothername is required"),
    mothercid: Yup.string().required("mothercid is required"),
    personalcontact: Yup.string().required("personalcontact is required"),
    relationship: Yup.string().required("relationship is required"),
    contact: Yup.string().required("contact is required"),
  });

  const handleSubmit = (values, { resetForm }) => {
    // You can perform any actions with the form data here, like submitting to a server or logging to console
    console.log("Submitted Data:", values);
    // Reset form after submission
    resetForm();
  };

  const handleDelete = () => {
    console.log("Data deleted");
    // Implement your delete logic here
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen">
      <Sidebar />
      <div className="flex-1 overflow-y-auto">
        <Navbar />
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <div className="py-20"/>
            <div style={{ marginBottom: "20px" }}>
              <Link
                to="/Frompesonal"
                className="text-black hover:text-gray-600 py-2 px-4 rounded"
                style={{ marginRight: "100px" }}
              >
                ข้อมูลสำคัญ
              </Link>
              <Link
                to="/Personal_Info"
                className="text-black hover:text-gray-600 py-2 px-4 rounded"
                style={{ marginRight: "100px" }}
              >
                ข้อมูลส่วนตัว
              </Link>
              <Link
                to="/Address_info"
                className="text-black hover:text-gray-600 py-2 px-4 rounded"
                style={{ marginRight: "100px" }}
              >
                ที่อยู่
              </Link>
              <Link
                to="/Disease"
                className="text-black hover:text-gray-600 py-2 px-4 rounded"
                style={{ marginRight: "100px" }}
              >
                โรค
              </Link>
              <Link
                to="/Treatment"
                className="text-black hover:text-gray-600 py-2 px-4 rounded"
                style={{ marginRight: "100px" }}
              >
                รายละเอียดการรักษา
              </Link>
            </div>
            <Card
              style={{
                width: "1280px",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
              }}
            >
              <h2
                style={{
                  textAlign: "center",
                  marginBottom: "20px",
                  fontSize: "24px",
                  color: "#333333",
                  font: "bold",
                }}
              >
                Personal Information
              </h2>

              <Formik
                textbox={textbox}
                trapping={trapping}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* บรรทัดที่ 1 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="nationality">สัญชาติ</label>
                        <Field id="nationality" name="nationality" as={InputText} className={`form-input ${errors.nationality && touched.nationality ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="nationality" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                      <label htmlFor="ethnicity">เชื้อชาติ</label>
                        <Field id="ethnicity" name="ethnicity" as={InputText} className={`form-input ${errors.ethnicity && touched.ethnicity ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="ethnicity" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="bloodgroup">กรุ๊ปเลือด</label>
                        <Field id="bloodgroup" name="bloodgroup" as={InputText} className={`form-input ${errors.bloodgroup && touched.bloodgroup ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="bloodgroup" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div className="px-5"/>
                      <div className="font-semibold">RH</div>
                      <div style={{ flex: '1', marginLeft: '30px', display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                        <div style={{ marginRight: '10px' }}>
                          <Field id="rhpositive" name="rhpositive" type="checkbox" style={{ marginRight: '10px' }} />
                          <label htmlFor="rhpositive">Positive (+)</label>
                        </div>
                        <div className="px-5"/>
                        <div>
                          <Field id="rhnegative" name="rhnegative" type="checkbox" style={{ marginRight: '10px' }} />
                          <label htmlFor="rhnegative">Negative (-)</label>
                        </div>
                      </div>
                    </div>

                    {/* บรรทัดที่ 2 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="education">การศึกษา</label>
                        <Field id="education" name="education" as={InputText} className={`form-input ${errors.education && touched.education ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="education" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="job">อาชีพ</label>
                        <Field id="job" name="job" as={InputText} className={`form-input ${errors.job && touched.job ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="job" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>


                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="email">อีเมล:</label>
                        <Field id="email" name="email" as={InputText} className={`form-input ${errors.email && touched.email ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="email" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="tel">เบอร์โทรติดต่อ</label>
                        <Field id="tel" name="tel" as={InputText} className={`form-input ${errors.tel && touched.tel ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="tel" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="personaldoctor">แพทย์ประจำตัว</label>
                        <Field id="personaldoctor" name="personaldoctor" as={InputText} className={`form-input ${errors.personaldoctor && touched.personaldoctor ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="personaldoctor" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="status">สถานภาพสมรส</label>
                        <Field id="status" name="status" as={InputText} className={`form-input ${errors.status && touched.status ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="status" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                  <div className="py-5"/> 
                  <div className="py-2 font-bold">ครอบครัว</div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="fathername">ชื่อ-นามสกุลบิดา</label>
                        <Field id="fathername" name="fathername" as={InputText} className={`form-input ${errors.fathername && touched.fathername ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="fathername" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="fathercid">เลขบัตรประชาชนบิดา</label>
                        <Field id="fathercid" name="fathercid" as={InputText} className={`form-input ${errors.fathercid && touched.fathercid ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="fathercid" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="mothername">ชื่อ-นามสกุลมารดา</label>
                        <Field id="mothername" name="mothername" as={InputText} className={`form-input ${errors.mothername && touched.mothername ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="mothername" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="mothercid">เลขบัตรประชาชนมารดา</label>
                        <Field id="mothercid" name="mothercid" as={InputText} className={`form-input ${errors.mothercid && touched.mothercid ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="mothercid" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="personalcontact">บุคคลที่ติดต่อได้</label>
                        <Field id="personalcontact" name="personalcontact" as={InputText} className={`form-input ${errors.personalcontact && touched.personalcontact ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="personalcontact" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="relationship">ความสัมพันธ์</label>
                        <Field id="relationship" name="relationship" as={InputText} className={`form-input ${errors.relationship && touched.relationship ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="relationship" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="contact">เบอร์ติดต่อ</label>
                        <Field id="contact" name="contact" as={InputText} className={`form-input ${errors.contact && touched.contact ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="contact" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    {/* <div style={{ textAlign: 'center' }}>
                      <Button type="submit" label="Submit" className="p-button-raised p-button-primary" style={{ width: '200px', padding: '10px', fontSize: '16px', backgroundColor: '#3b82f6', color: 'white', border: 'none', borderRadius: '5px', transition: 'background-color 0.3s ease', }} />
                    </div> */}
                    <div className="py-3" />
                    <div style={{ textAlign: 'left' }}>
                      <Button
                        type="submit"
                        label="บันทึก"
                        className="p-button-raised p-button-primary bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-full cursor-pointer mr-2"
                      />
                      <Button
                        type="button"
                        label="ล้างข้อมูล"
                        className="p-button-raised p-button-danger bg-gray-300 hover:bg-gray-200 text-blue-700 py-2 px-4 rounded-full cursor-pointer"
                        onClick={handleDelete}
                      />
                    </div>
                  </Form>
                )}
              </Formik>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Personal_Information;

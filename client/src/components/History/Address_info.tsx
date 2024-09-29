import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import * as Yup from "yup";
import { Link } from "react-router-dom";
import axios from 'axios';

const address = () => {
  const form_address = {
    cr_houseno: "",
    cr_village: "",
    cr_soi: "",
    cr_road: "",
    cr_changwat: "",
    cr_ampur: "",
    cr_tambon: "",
    cr_zip_code: "",
    cid_houseno: "",
    cid_village: "",
    cid_soi: "",
    cid_road: "",
    cid_changwat: "",
    cid_ampur: "",
    cid_tambon: "",
    cid_zip_code: "",
  };

  const requirefield = Yup.object({
    cr_houseno: Yup.string().required("House No. is required"),
    cr_village: Yup.string().required("Mhoo is required"),
    cr_changwat: Yup.string().required("Province is required"),
    cr_ampur: Yup.string().required("District is required"),
    cr_tambon: Yup.string().required("Sub_District is required"),
    cr_zip_code: Yup.string().required("Zip Code is required"),
    cid_houseno: Yup.string().required("House No. is required"),
    cid_village: Yup.string().required("Mhoo is required"),
    cid_changwat: Yup.string().required("Province is required"),
    cid_ampur: Yup.string().required("District is required"),
    cid_tambon: Yup.string().required("Sub_District is required"),
    cid_zip_code: Yup.string().required("Zip Code is required"),
  });

  const handleSubmit = async (values, { resetForm }) => {
    try {
      await axios.post('http://localhost:3001/referIn', values);
      resetForm();
      console.log('Address updated successfully!');
    } catch (error) {
      console.error('Error updating address:', error);
    }
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
                <div style={{ marginBottom: "20px" }}>
                <Link to="/Frompesonal" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลสำคัญ</Link>
                <Link to="/Personal_Info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลส่วนตัว</Link>
                <Link to="/Address_info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ที่อยู่</Link>
                <Link to="/Disease" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>โรค</Link>
                <Link to="/Treatment" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>รายละเอียดการรักษา</Link>
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
                    Address
                  </h2>
    
              <Formik
                form_address={form_address}
                requirefield={requirefield}
                onSubmit={handleSubmit}
              >
                {({ errors, touched }) => (
                  <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* บรรทัดที่ 1 */}
                    <div className="font-bold">ที่อยู่ตามบัตรประชาชน</div>
                    <div className="py-1"/>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cr_houseno">บ้านเลขที่</label>
                        <Field id="cr_houseno" name="cr_houseno" as={InputText} className={`form-input ${errors.cr_houseno && touched.cr_houseno ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_houseno" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                      <label htmlFor="cr_village">หมู่</label>
                        <Field id="cr_village" name="cr_village" as={InputText} className={`form-input ${errors.cr_village && touched.cr_village ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_village" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cr_soi">ซอย</label>
                        <Field id="cr_soi" name="cr_soi" as={InputText} className={`form-input ${errors.cr_soi && touched.cr_soi ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_soi" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cr_road">ถนน</label>
                        <Field id="cr_road" name="cr_road" as={InputText} className={`form-input ${errors.cr_road && touched.cr_road ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_road" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    {/* บรรทัดที่ 2 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cr_changwat">จังหวัด</label>
                        <Field id="cr_changwat" name="cr_changwat" as={InputText} className={`form-input ${errors.cr_changwat && touched.cr_changwat ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_changwat" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cr_ampur">อำเภอ/เขต</label>
                        <Field id="cr_ampur" name="cr_ampur" as={InputText} className={`form-input ${errors.cr_ampur && touched.cr_ampur ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_ampur" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cr_tambon">ตำบล/แขวง</label>
                        <Field id="cr_tambon" name="cr_tambon" as={InputText} className={`form-input ${errors.cr_tambon && touched.cr_tambon ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_tambon" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>


                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cr_zip_code">รหัสไปรษณีย์</label>
                        <Field id="cr_zip_code" name="cr_zip_code" as={InputText} className={`form-input ${errors.cr_zip_code && touched.cr_zip_code ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_zip_code" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    
                    <div className="py-5"/> 
                    <div className="py-1 font-bold">ที่อยู่ปัจจุบัน</div>                
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cid_houseno">บ้านเลขที่</label>
                        <Field id="cid_houseno" name="cid_houseno" as={InputText} className={`form-input ${errors.cid_houseno && touched.cid_houseno ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_houseno" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                      <label htmlFor="cid_village">หมู่</label>
                        <Field id="cid_village" name="cid_village" as={InputText} className={`form-input ${errors.cid_village && touched.cid_village ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_village" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cid_soi">ซอย</label>
                        <Field id="cid_soi" name="cid_soi" as={InputText} className={`form-input ${errors.cid_soi && touched.cid_soi ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_soi" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cid_road">ถนน</label>
                        <Field id="cid_road" name="cid_road" as={InputText} className={`form-input ${errors.cid_road && touched.cid_road ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_road" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    {/* บรรทัดที่ 2 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cid_changwat">จังหวัด</label>
                        <Field id="cr_changwat" name="cr_changwat" as={InputText} className={`form-input ${errors.cr_changwat && touched.cr_changwat ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cr_changwat" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cid_ampur">อำเภอ/เขต</label>
                        <Field id="cid_ampur" name="cid_ampur" as={InputText} className={`form-input ${errors.cid_ampur && touched.cid_ampur ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_ampur" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="cid_tambon">ตำบล/แขวง</label>
                        <Field id="cid_tambon" name="cid_tambon" as={InputText} className={`form-input ${errors.cid_tambon && touched.cid_tambon ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_tambon" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="cid_zip_code">รหัสไปรษณีย์</label>
                        <Field id="cid_zip_code" name="cid_zip_code" as={InputText} className={`form-input ${errors.cid_zip_code && touched.cid_zip_code ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="cid_zip_code" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
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
    
    export default address;
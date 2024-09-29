import React, { useState, useEffect } from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Dropdown } from "primereact/dropdown";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

const disease = () => {

    const form_diesese = {
        congenital_disease: "",
        diagnostic_results: "",
        symptom: "",
        health_results: "",
      };
    
      const diseasetrapping = Yup.object({
        congenital_disease: Yup.string().required("Congenital Disease is required"),
        diagnostic_results: Yup.string().required("Diagnostic Results is required"),
        symptom: Yup.string().required("Symptom is required"),
        health_results: Yup.string().required("ผลการตรวจ is required"),  

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
                <div style={{ marginBottom: "20px" }}>
                <Link to="/Frompesonal" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลสำคัญ</Link>
                <Link to="/Personal_Info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลส่วนตัว</Link>
                <Link to="/Address_info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ที่อยู่</Link>
                <Link to="/Disease" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>โรค</Link>
                <Link to="/Treatment" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>รายละเอียดการรักษา</Link>
                </div>
                <Card
                  style={{
                    width: "880px",
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
                    }}
                  >
                    Disease
                  </h2>
    
                <Formik
                form_diesese={form_diesese}
                diseasetrapping={diseasetrapping}
                onSubmit={handleSubmit}>

                {({ errors, touched }) => (
                  <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* บรรทัดที่ 1 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="congenital_disease">โรคประจำตัว</label>
                        <Field id="congenital_disease" name="congenital_disease" as={InputText} className={`form-input ${errors.congenital_disease && touched.congenital_disease ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="congenital_disease" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                      <label htmlFor="diagnostic_results">ผลวินิจฉัย</label>
                        <Field id="diagnostic_results" name="diagnostic_results" as={InputText} className={`form-input ${errors.diagnostic_results && touched.diagnostic_results ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="diagnostic_results" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="symptom">อาการ</label>
                        <Field id="symptom" name="symptom" as="textarea" className={`form-input ${errors.symptom && touched.symptom ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease', minHeight: '100px' }} />
                        <ErrorMessage name="symptom" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="health_results">ผลการตรวจ</label>
                        <Field id="health_results" name="health_results" as="textarea" className={`form-input ${errors.health_results && touched.health_results ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease', minHeight: '100px' }} />
                        <ErrorMessage name="health_results" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div className="py-3" />
                    <div style={{ textAlign: 'left' }}>
                      <Button
                        type="submit"
                        label="บันทึก"
                        className="p-button-raised p-button-primary bg-blue-500 hover:bg-blue-700 text-white py-2 px-5 rounded-full cursor-pointer mr-2"/>
                      <Button
                        type="button"
                        label="ล้างข้อมูล"
                        className="p-button-raised p-button-danger bg-gray-300 hover:bg-gray-200 text-blue-700 py-2 px-4 rounded-full cursor-pointer"
                        onClick={handleDelete}/>
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
    
    export default disease;
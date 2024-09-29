import React from "react";
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';

const treatment = () => {
  const initialValues = {
    labResult: "",
    currentTreatment: "",
    currentSymptoms: "",
    initialDiagnosis: "",
    currentMedication: "",
    treatmentHistory: "",
    labAttachment: null,
    xrayAttachment: null,
  };

  const validationSchema = Yup.object({
    labResult: Yup.string().required("กรุณากรอกผลแลป"),
    currentTreatment: Yup.string().required("กรุณากรอกการรักษาปัจจุบัน"),
    currentSymptoms: Yup.string().required("กรุณากรอกอาการปัจจุบัน"),
    initialDiagnosis: Yup.string().required("กรุณากรอกผลวินิจฉัยขั้นต้น"),
    currentMedication: Yup.string().required("กรุณากรอกยาที่ให้ปัจจุบัน"),
    treatmentHistory: Yup.string().required("กรุณากรอกประวัติการรักษา"),
    labAttachment: Yup.mixed().required("กรุณาแนบผลการตรวจ"),
    xrayAttachment: Yup.mixed().required("กรุณาแนบผล x-ray"),
  });

  const handleSubmit = (values, { resetForm }) => {
    console.log("Submitted Data:", values);
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
                }}
              >
                Treatment Details
              </h2>

              <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ errors, touched, setFieldValue }) => (
                  <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    
                    {/* บรรทัดที่ 1 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="labResult">ผลแลป</label>
                        <Field
                          id="labResult"
                          name="labResult"
                          as={InputText}
                          className={`form-input ${errors.labResult && touched.labResult ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="labResult" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="currentTreatment">การรักษาปัจจุบัน</label>
                        <Field
                          id="currentTreatment"
                          name="currentTreatment"
                          as={InputText}
                          className={`form-input ${errors.currentTreatment && touched.currentTreatment ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="currentTreatment" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="currentSymptoms">อาการปัจจุบัน</label>
                        <Field
                          id="currentSymptoms"
                          name="currentSymptoms"
                          as={InputText}
                          className={`form-input ${errors.currentSymptoms && touched.currentSymptoms ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="currentSymptoms" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    
                    {/* บรรทัดที่ 2 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="initialDiagnosis">ผลวินิจฉัยขั้นต้น</label>
                        <Field
                          id="initialDiagnosis"
                          name="initialDiagnosis"
                          as={InputText}
                          className={`form-input ${errors.initialDiagnosis && touched.initialDiagnosis ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="initialDiagnosis" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="currentMedication">ยาที่ให้ปัจจุบัน</label>
                        <Field
                          id="currentMedication"
                          name="currentMedication"
                          as={InputText}
                          className={`form-input ${errors.currentMedication && touched.currentMedication ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="currentMedication" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="treatmentHistory">ประวัติการรักษา</label>
                        <Field
                          id="treatmentHistory"
                          name="treatmentHistory"
                          as={InputText}
                          className={`form-input ${errors.treatmentHistory && touched.treatmentHistory ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="treatmentHistory" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    {/* บรรทัดที่ 4 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="labAttachment">แนบผลการตรวจ</label>
                        <input
                          id="labAttachment"
                          name="labAttachment"
                          type="file"
                          onChange={(event) => {
                            setFieldValue("labAttachment", event.currentTarget.files[0]);
                          }}
                          className={`form-input ${errors.labAttachment && touched.labAttachment ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="labAttachment" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    {/* บรรทัดที่ 5 */}
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="xrayAttachment">แนบผล x-ray</label>
                        <input
                          id="xrayAttachment"
                          name="xrayAttachment"
                          type="file"
                          onChange={(event) => {
                            setFieldValue("xrayAttachment", event.currentTarget.files[0]);
                          }}
                          className={`form-input ${errors.xrayAttachment && touched.xrayAttachment ? 'input-error' : ''}`}
                          style={{
                            width: '100%',
                            padding: '10px',
                            border: '1px solid #cccccc',
                            borderRadius: '5px',
                            transition: 'border-color 0.3s ease',
                          }}
                        />
                        <ErrorMessage name="xrayAttachment" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
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

export default treatment;

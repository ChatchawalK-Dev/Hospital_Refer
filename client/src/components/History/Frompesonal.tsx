import React, { useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Navbar from "../shared/Navbar";
import Sidebar from "../shared/sidebar"; // Note the capitalization change for consistency

const InformationForm: React.FC = () => {
  const [errorMessage, setErrorMessage] = useState('');

  const validationSchema = Yup.object({
    patient_cid: Yup.string().required('CID is required'),
    date_of_issue: Yup.string().required('Issue Date is required'),
    expiration_date: Yup.string().required('Expiration Date is required'),
    patient_nameth: Yup.string().required('Name (Thai) is required'),
    patient_last_nameth: Yup.string().required('Surname (Thai) is required'),
    patient_nameen: Yup.string().required('Name (Eng) is required'),
    patient_last_nameen: Yup.string().required('Surname (Eng) is required'),
    patient_sex: Yup.string().required('Gender is required'),
    patient_religion: Yup.string().required('Religion is required'),
    patient_old: Yup.number().required('Age is required'),
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    try {

      const hospcode = localStorage.getItem('hospcode');
      if (hospcode && hospcode.trim() !== '') {
        const processedHospcode = hospcode.trim().replace(/"/g, '');
        values.hospcode = processedHospcode;
      }

      await axios.post('http://localhost:3001/referIn', values);
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('Failed to submit the form');
    } finally {
      setSubmitting(false);
    }
  };

  const genderOptions = [
    { label: 'ชาย', value: 'male' },
    { label: 'หญิง', value: 'female' },
    { label: 'ไม่ระบุ', value: 'other' }
  ];

  const relationsOptions = [
    { label: 'บิดา', value: 'father' },
    { label: 'มารดา', value: 'mother' },
    { label: 'ผู้ปกครอง', value: 'parents' },
    { label: 'ตนเอง', value: 'myself' }
  ];

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
            <div className="py-10" />
            <div style={{ marginBottom: "20px" }}>
              <Link to="/Frompesonal" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลสำคัญ</Link>
              <Link to="/Personal_Info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ข้อมูลส่วนตัว</Link>
              <Link to="/Address_info" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>ที่อยู่</Link>
              <Link to="/Disease" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>โรค</Link>
              <Link to="/Treatment" className="text-black hover:text-gray-600 py-2 px-4 rounded" style={{ marginRight: '100px' }}>รายละเอียดการรักษา</Link>
            </div>
            <Card style={{ width: '880px', padding: '20px', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)' }}>
              <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', color: '#333333' }}>Important Information</h2>
              <Formik
                initialValues={{
                  patient_cid: '',
                  date_of_issue: '',
                  expiration_date: '',
                  patient_nameth: '',
                  patient_last_nameth: '',
                  patient_nameen: '',
                  patient_last_nameen: '',
                  patient_sex: '',
                  patient_religion: '',

                  patient_old: '',
                }}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
              >
                {({ isSubmitting, errors, touched, values }) => (
                  <Form style={{ display: 'flex', flexDirection: 'column' }}>
                    <div className="font-bold">ข้อมูลสำคัญ</div>
                    <div className="py-1" />
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="patient_cid">CID 13 หลัก</label>
                        <Field 
                          id="patient_cid" 
                          name="patient_cid" 
                          as={InputText} 
                          value={values.patient_cid} 
                          className={`form-input ${errors.patient_cid && touched.patient_cid ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_cid" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="date_of_issue">Issue Date:</label>
                        <Field 
                          id="date_of_issue" 
                          name="date_of_issue" 
                          type="date" as={InputText} 
                          value={values.date_of_issue} 
                          className={`form-input ${errors.date_of_issue && touched.date_of_issue ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="date_of_issue" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="expiration_date">Expiration Date:</label>
                        <Field 
                          id="expiration_date" 
                          name="expiration_date" 
                          type="date" as={InputText} 
                          value={values.expiration_date} 
                          className={`form-input ${errors.expiration_date && touched.expiration_date ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="expireDate" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="patient_nameth">ชื่อ</label>
                        <Field 
                          id="patient_nameth" 
                          name="patient_nameth" 
                          as={InputText} 
                          value={values.patient_nameth} 
                          className={`form-input ${errors.patient_nameth && touched.patient_nameth ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_nameth" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="patient_last_nameth">นามสกุล:</label>
                        <Field 
                          id="patient_last_nameth" 
                          name="patient_last_nameth" 
                          as={InputText} 
                          value={values.patient_last_nameth} 
                          className={`form-input ${errors.patient_last_nameth && touched.patient_last_nameth ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_last_nameth" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="patient_nameen">Name:</label>
                        <Field 
                          id="patient_nameen" 
                          name="patient_nameen" 
                          as={InputText} 
                          value={values.patient_nameen} 
                          className={`form-input ${errors.patient_nameen && touched.patient_nameen ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_nameen" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="patient_last_nameen">Surname:</label>
                        <Field 
                          id="patient_last_nameen" 
                          name="patient_last_nameen" 
                          as={InputText} 
                          value={values.patient_last_nameen} 
                          className={`form-input ${errors.patient_last_nameen && touched.patient_last_nameen ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_last_nameen" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>

                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="patient_sex">Gender:</label>
                        <Field 
                        as={Dropdown} 
                        name="patient_sex" 
                        value={values.patient_sex} 
                        options={genderOptions} 
                        placeholder="Select a Gender" 
                        className={`form-input ${errors.patient_sex && touched.patient_sex ? 'input-error' : ''}`} 
                        style={{ width: '100%' }} />
                        <ErrorMessage name="patient_sex" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="patient_religion">Religion:</label>
                        <Field 
                          id="patient_religion" 
                          name="patient_religion" 
                          as={InputText} 
                          value={values.patient_religion} 
                          className={`form-input ${errors.patient_religion && touched.patient_religion ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_religion" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="patient_old">Age:</label>
                        <Field 
                          id="patient_old" 
                          name="patient_old" 
                          as={InputText} 
                          value={values.patient_old} 
                          className={`form-input ${errors.patient_old && touched.patient_old ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="patient_old" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div className="py-6" />
                    <div className="font-bold">ผู้แจ้งเรื่องรับบริการ</div>
                    <div className="py-1" />
                    <div style={{ display: 'flex', justifyContent: 'start', marginBottom: '20px' }}>
                      <div style={{ display: 'flex', alignItems: 'start', marginRight: '20px' }}>
                        <Field type="checkbox" id="self_report" name="self_report" />
                        <label htmlFor="self_report" style={{ marginLeft: '8px' }}>ผู้รับบริการแจ้งเรื่องเอง</label>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'start' }}>
                        <Field type="checkbox" id="other_report" name="other_report" />
                        <label htmlFor="other_report" style={{ marginLeft: '8px' }}>ผู้อื่นแจ้ง</label>
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="parentname">ชื่อ-นามสกุล</label>
                        <Field 
                          id="parentname" 
                          name="parentname" 
                          as={InputText} 
                          className={`form-input ${errors.parentname && touched.parentname ? 'input-error' : ''}`} 
                          style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="parentname" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="parentaddress">ที่อยู่</label>
                        <Field id="parentaddress" name="parentaddress" as={InputText} className={`form-input ${errors.parentaddress && touched.parentaddress ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="parentaddress" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div style={{ display: 'flex', marginBottom: '20px' }}>
                      <div style={{ flex: '1', marginRight: '10px' }}>
                        <label htmlFor="relationship">ความสัมพันธ์</label>
                        <Field id="relationship" name="relationship" as={Dropdown} options={relationsOptions} className={`form-input ${errors.relationship && touched.relationship ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="relationship" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                      <div style={{ flex: '1', marginLeft: '10px' }}>
                        <label htmlFor="tel">เบอร์ติดต่อ</label>
                        <Field id="tel" name="tel" as={InputText} className={`form-input ${errors.tel && touched.tel ? 'input-error' : ''}`} style={{ width: '100%', padding: '10px', border: '1px solid #cccccc', borderRadius: '5px', transition: 'border-color 0.3s ease' }} />
                        <ErrorMessage name="tel" component="div" style={{ color: '#dc3545', fontSize: '14px' }} />
                      </div>
                    </div>
                    <div className="py-3" />                 
                    <Button type="submit"
                      label={isSubmitting ? 'Submitting...' : 'Submit'}
                      className="p-button-primary"
                      disabled={isSubmitting}
                    />
                    {errorMessage && <div className="error-message">{errorMessage}</div>}
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

export default InformationForm;

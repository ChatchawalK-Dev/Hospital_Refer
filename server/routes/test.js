const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post('/', async (req, res) => {
    const {
        hn, patient_cid, date_of_issue, expiration_date, patient_title_nameth, patient_nameth,
        patient_last_nameth, patient_title_nameen, patient_nameen, patient_last_nameen, patient_sex,
        patient_birth, patient_old, patient_religion, patient_nation, patient_race, patient_abogroup, patient_rhgroup,
        patient_education, patient_jobs, patient_email, patient_mobile, patient_marital_status, patient_personal_doc,
        cr_houseno, cr_village, cr_soi, cr_road, cr_tambon, cr_ampur, cr_changwat, cr_zip_code, cid_houseno, cid_village,
        cid_sol, cid_road, cid_tambon, cid_ampur, cid_changwat, cid_zip_code, father_cid, father_name, father_mobile,
        mother_cid, mother_name, mother_mobile, emergency_contact_name, emergency_contact_mobile, emergency_contact_related,
        informant_name, informant_address, informant_relation, informant_mobile, warddisch, status, reason,
        congenital_desease, Diagosis_result, symptom, current_treatment, current_symptoms, PDR, current_drug, medical_history
    } = req.body;
    console.log('req.body :', req.body);

    let arrayIdTableRef = {};

    // check id if have already
    try {
        await Promise.all([
            checkIdAddressPatient(),
            checkIdHealthHistory(),
            checkIdContractPatient()
        ]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }

    // if id didn't have already
    try {
        await Promise.all([
            insertAddressPatient(),
            insertHealthHistory(),
            insertContractPatient()
        ]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
    
    // main insertPersonalPatient
    insertPersonalPatient()

    
    function checkIdAddressPatient() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT idaddress_patient FROM address_patient
                WHERE 	cid_houseno = ? AND
                        cid_road  = ? AND 
                        cid_tambon  = ? AND 
                        cid_ampur  = ? AND 
                        cid_changwat  = ? AND 
                        cid_zip_code = ?
            `, [cid_houseno, cid_road, cid_tambon,
                cid_ampur, cid_changwat, cid_zip_code], (err, results) => {
                if (err) {
                    console.log('err checkIdAddressPatient');
                    return reject(err);
                } else {
                    arrayIdTableRef.idaddress_patient = results.length > 0 ? results[0].idaddress_patient : null;
                    resolve();
                }
            });
        });
    }

    function checkIdHealthHistory() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT idhealth_history FROM health_history 
                WHERE   congenital_desease = ? AND 
                        Diagosis_result = ? AND 
                        symptom = ? AND 
                        current_treatment = ? AND 
                        current_symptoms = ? AND
                        PDR = ? AND 
                        current_drug = ? AND 
                        medical_history = ?
            `, [congenital_desease, Diagosis_result, symptom, current_treatment,
                current_symptoms, PDR, current_drug, medical_history], (err, results) => {
                if (err) {
                    console.log('err checkIdHealthHistory');
                    return reject(err);
                } else {
                    arrayIdTableRef.idhealth_history = results.length > 0 ? results[0].idhealth_history : null;
                    resolve();
                }
            });
        });
    }

    function checkIdContractPatient() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT idcontact_patient FROM contact_patient 
                WHERE father_cid = ? AND mother_cid = ?
            `, [father_cid, mother_cid], (err, results) => {
                if (err) {
                    console.log('err checkIdContractPatient');
                    return reject(err);
                } else {
                    arrayIdTableRef.idcontact_patient = results.length > 0 ? results[0].idcontact_patient : null;
                    resolve();
                }
            });
        });
    }

    function insertAddressPatient(){
        return new Promise((resolve, reject) => {
            if (arrayIdTableRef.idaddress_patient === null) {
                pool.query(`
                    INSERT INTO address_patient 
                    SET
                    cr_houseno = ?,
                    cr_village = ?,
                    cr_soi = ?,
                    cr_road = ?,
                    cr_tambon = ?,
                    cr_ampur = ?,
                    cr_changwat = ?,
                    cr_zip_code = ?,
                    cid_houseno = ?,
                    cid_village = ?,
                    cid_sol = ?,
                    cid_road = ?,
                    cid_tambon = ?,
                    cid_ampur = ?,
                    cid_changwat = ?,
                    cid_zip_code = ?
                `, [cr_houseno, cr_village, cr_soi, cr_road, cr_tambon, cr_ampur, cr_changwat, cr_zip_code,
                    cid_houseno, cid_village, cid_sol, cid_road, cid_tambon, cid_ampur, cid_changwat, cid_zip_code], (err, results) => {
                    if (err) {
                        console.log('err insertAddressPatient');
                        return reject(err);
                    } else {
                        arrayIdTableRef.idaddress_patient = results.insertId
                        resolve();
                    }
                });
            }
        })
    }

    function insertHealthHistory(){
        return new Promise((resolve, reject) => {
            if (arrayIdTableRef.idhealth_history === null) {
                pool.query(`
                    INSERT INTO health_history 
                    SET
                    congenital_desease = ?,
                    Diagosis_result = ?,       
                    symptom = ?,
                    current_treatment = ?,         
                    current_symptoms = ?,          
                    PDR = ?,        
                    current_drug = ?,              
                    medical_history = ? 
                `, [congenital_desease, Diagosis_result, symptom, current_treatment, current_symptoms, PDR, current_drug, medical_history], (err, results) => {
                    if (err) {
                        console.log('err insertHealthHistory');
                        return reject(err);
                    } else {
                        arrayIdTableRef.idhealth_history = results.insertId
                        resolve();
                    }
                });
            }
        })
    }

    function insertContractPatient(){
        return new Promise((resolve, reject) => {
            if (arrayIdTableRef.idcontact_patient === null) {
                pool.query(`
                    INSERT INTO contact_patient 
                    SET
                    father_cid = ?,               
                    father_name  = ?,             
                    father_mobile = ?,            
                    mother_cid   = ?,             
                    mother_name   = ?,            
                    mother_mobile    = ?,         
                    emergency_contact_name   = ?, 
                    emergency_contact_mobile  = ?,
                    emergency_contact_related = ?,
                    informant_name      = ?,      
                    informant_address   = ?,      
                    informant_relation = ?,       
                    informant_mobile = ?
                `, [father_cid, father_name, father_mobile,mother_cid, mother_name, mother_mobile, emergency_contact_name, emergency_contact_mobile, 
                    emergency_contact_related,informant_name, informant_address, informant_relation, informant_mobile], (err, results) => {
                    if (err) {
                        console.log('err insertContractPatient');
                        return reject(err);
                    } else {
                        arrayIdTableRef.idcontact_patient = results.insertId
                        resolve();
                    }
                });
            }
        })
    }

    function insertPersonalPatient(){
        return new Promise((resolve, reject) => {
            const idaddress_patient = arrayIdTableRef.idaddress_patient;
            const idhealth_history = arrayIdTableRef.idhealth_history;
            const idcontact_patient = arrayIdTableRef.idcontact_patient;
            if (arrayIdTableRef.idcontact_patient === null) {
                pool.query(`
                INSERT INTO personal_patient 
                SET 
                    hn = ?,
                    patient_cid = ?,
                    date_of_issue = ?,
                    expiration_date = ?,
                    patient_title_nameth = ?,
                    patient_nameth = ?,
                    patient_last_nameth = ?,
                    patient_title_nameen = ?,
                    patient_nameen = ?,
                    patient_last_nameen = ?,
                    patient_sex = ?,
                    patient_birth = ?,
                    patient_old = ?,
                    patient_religion = ?,
                    patient_nation = ?,
                    patient_race = ?,
                    patient_abogroup = ?,
                    patient_rhgroup = ?,
                    patient_education = ?,
                    patient_jobs = ?,
                    patient_email = ?,
                    patient_mobile = ?,
                    patient_marital_status = ?,
                    patient_personal_doc = ?,
                    warddisch = ?,
                    status = ?,
                    reason = ?,
                    idreferout_popup = 1,
                    idaddress_patient = ?,
                    idhealth_history = ?,
                    idcontact_patient = ?
                `, [hn, patient_cid, date_of_issue, expiration_date, patient_title_nameth, patient_nameth,patient_last_nameth, patient_title_nameen, 
                    patient_nameen, patient_last_nameen, patient_sex,patient_birth, patient_old, patient_religion, patient_nation, patient_race, 
                    patient_abogroup, patient_rhgroup,patient_education, patient_jobs, patient_email, patient_mobile, patient_marital_status, 
                    patient_personal_doc,warddisch, status, reason, idaddress_patient, idhealth_history, idcontact_patient], (err, results) => {
                    if (err) {
                        console.log('err insertContractPatient');
                        return reject(err);
                    } else {
                        res.json(results);
                        resolve();
                    }
                });
            }
        })
    }






});

module.exports = router;

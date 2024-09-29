const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post('/', async (req, res) => {
    const {
        patient_cid, date_of_issue, expiration_date, patient_title_nameth, patient_nameth,
        patient_last_nameth, patient_title_nameen, patient_nameen, patient_last_nameen, patient_sex,
        patient_birth, patient_old, patient_religion, patient_nation, patient_race, patient_abogroup, patient_rhgroup,
        patient_education, patient_jobs, patient_email, patient_mobile, patient_marital_status, patient_personal_doc,
        cr_houseno, cr_village, cr_soi, cr_road, cr_tambon, cr_ampur, cr_changwat, cr_zip_code,father_cid, father_name, 
        father_mobile,mother_cid, mother_name, mother_mobile, emergency_contact_name, emergency_contact_mobile, emergency_contact_related,
        informant_name, informant_address, informant_relation, informant_mobile, warddisch, status, reason,
    } = req.body;
    console.log('req.body :', req.body);

    let arrayIdTableRef = {};

    // check id if have already
    try {
        await Promise.all([
            checkIdToUpdate()
        ]);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }
    
    function checkIdToUpdate() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT idaddress_patient, idaddress_patient, idcontact_patient
                FROM personal_patient
                WHERE 	patient_cid  = ?
            `, [patient_cid], (err, results) => {
                if (err) {
                    console.log('err checkIdAddressPatient');
                    return reject(err);
                } else {
                    arrayIdTableRef.idaddress_patient = results[0].idaddress_patient
                    arrayIdTableRef.idcontact_patient = results[0].idcontact_patient
                    updateAddressPatient()
                    resolve();
                }
            });
        });
    }

    function updateAddressPatient(){
        return new Promise((resolve, reject) => {
            if (arrayIdTableRef.idaddress_patient !== null) {
                pool.query(`
                UPDATE address_patient 
                    SET
                        cr_houseno = ?,
                        cr_village = ?,
                        cr_soi = ?,
                        cr_road = ?,
                        cr_tambon = ?,
                        cr_ampur = ?,
                        cr_changwat = ?,
                        cr_zip_code = ?
                    WHERE idaddress_patient = ?
                `, [cr_houseno, cr_village, cr_soi, cr_road, cr_tambon, cr_ampur, cr_changwat, cr_zip_code,arrayIdTableRef.idaddress_patient], (err, results) => {
                    if (err) {
                        console.log('err updateAddressPatient');
                        return reject(err);
                    } else {
                        updateContractPatient()
                        resolve();
                    }
                });
            }
        })
    }

    function updateContractPatient(){
        return new Promise((resolve, reject) => {
            if (arrayIdTableRef.idcontact_patient !== null) {
                pool.query(`
                    UPDATE contact_patient 
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
                    WHERE idcontact_patient = ?
                `, [father_cid, father_name, father_mobile,mother_cid, mother_name, mother_mobile, emergency_contact_name, emergency_contact_mobile, 
                    emergency_contact_related,informant_name, informant_address, informant_relation, informant_mobile, arrayIdTableRef.idcontact_patient], (err, results) => {
                    if (err) {
                        console.log('err updateContractPatient');
                        return reject(err);
                    } else {
                        updatePersonalPatient()
                        resolve();
                    }
                });
            }
        })
    }

    function generateRandomNumber() {
        let randomHN = Math.floor(10000 + Math.random() * 90000);
        return randomHN
    }

    function updatePersonalPatient(){
        const hn = generateRandomNumber();
        return new Promise((resolve, reject) => {
                pool.query(`
                UPDATE personal_patient 
                SET 
                    hn = ?,
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
                    patient_personal_doc = ?
                WHERE patient_cid  = ?
                `, [hn, date_of_issue, expiration_date, patient_title_nameth, patient_nameth,patient_last_nameth, patient_title_nameen, 
                    patient_nameen, patient_last_nameen, patient_sex,patient_birth, patient_old, patient_religion, patient_nation, patient_race, 
                    patient_abogroup, patient_rhgroup,patient_education, patient_jobs, patient_email, patient_mobile, patient_marital_status, 
                    patient_personal_doc, patient_cid], (err, results) => {
                    if (err) {
                        console.log('err updatePersonalPatient');
                        return reject(err);
                    } else {
                        res.json(results);
                        resolve();
                    }
                });
        })
    }
});

module.exports = router;

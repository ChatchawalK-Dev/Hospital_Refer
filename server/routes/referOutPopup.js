const express = require('express');
const router = express.Router();
const pool = require('./db');


router.post('/', async (req, res) => {
    const { hn, patient_cid, date_refer, time_refer, hosp_origin, warddisch, physicalexam,         
    diagfirst, diaglast, causeout, hosp_destination, pstatus, ptype, emergency,          
    ptyedis, request, doc_name, delivery, evaluation_Detail } = req.body;

    let arrayRef = {};

    // Check id to query drugName
    try {
        await checkDrugName();
        await searchDrugName();
        await insertPopupReferOut();
        await updatePersonalPatient();

        res.json(arrayRef);
    } catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: 'An error occurred while processing the request.' });
    }

    function checkDrugName() {
        return new Promise((resolve, reject) => {
            pool.query(`
                SELECT iddrug_allergy FROM personal_patient
                WHERE patient_cid = ?
            `, [patient_cid], (err, results) => {
                if (err) {
                    console.log('err checkDrugName');
                    return reject(err);
                } else {
                    arrayRef.iddrug_allergy = results.length > 0 ? results[0].iddrug_allergy : null;
                    resolve();
                }
            });
        });
    }

    function searchDrugName() {
        return new Promise((resolve, reject) => {
            if (arrayRef.iddrug_allergy !== null) {
                pool.query(`
                SELECT drug FROM drug_allergy
                WHERE iddrug_allergy = ?
                `, [arrayRef.iddrug_allergy], (err, results) => {
                    if (err) {
                        console.log('err searchDrugName');
                        return reject(err);
                    } else {
                        arrayRef.drug_name = results.length > 0 ? results[0].drug : null;
                        resolve();
                    }
                });
            } else {
                resolve();
            }
        });
    }

    function insertPopupReferOut() {
        return new Promise((resolve, reject) => {
            let referIdProvinceGenerate = Math.floor(Math.random() * 10000000000);
            const referid_province = referIdProvinceGenerate.toString();
            console.log(referid_province);
            console.log(arrayRef);
            pool.query(`
                INSERT INTO referout_popup 
                    SET
                    referid_province = ?,
                    date_refer = ?,
                    time_refer = ?,
                    hosp_origin = ?,
                    warddisch = ?,
                    physicalexam = ?,
                    diagfirst = ?,
                    diaglast = ?,
                    causeout = ?,
                    hosp_destination = ?,
                    pstatus = ?,
                    ptype = ?,
                    emergency = ?,
                    ptyedis = ?,
                    request = ?,
                    doc_name = ?,
                    delivery = ?,
                    evaluation_Detail = ?,
                    drug_name = ?
            `, [referid_province, date_refer, time_refer, hosp_origin, warddisch, physicalexam,         
                diagfirst, diaglast, causeout, hosp_destination, pstatus, ptype, emergency,          
                ptyedis, request, doc_name, delivery, evaluation_Detail, arrayRef.drug_name], 
            (err, results) => {
                if (err) {
                    console.log('err INSERT INTO referout_popup');
                    return reject(err);
                } else {
                    arrayRef.idreferout_popup = results.insertId; // Save the auto-incremented ID
                    resolve();
                }
            });
        });
    }

    function updatePersonalPatient() {
        return new Promise((resolve, reject) => {
            pool.query(`
                UPDATE personal_patient 
                SET idreferout_popup = ?
                WHERE hn = ? AND refer_in = 0 AND refer_out = 1;
            `, [arrayRef.idreferout_popup, hn], (err, results) => {
                if (err) {
                    console.log('err UPDATE personal_patient');
                    return reject(err);
                } else {
                    resolve();
                }
            });
        });
    }
});



module.exports = router;

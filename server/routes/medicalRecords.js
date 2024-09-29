const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    const { hospcode } = req.query;
    
    let sql =
    `
    SELECT 
        p.idpersonal_patient AS Refnumber,
        p.hn AS HN,
        p.patient_cid AS CID,
        p.patient_nameth AS name,
        p.patient_last_nameth AS lastname,
        p.patient_old AS Old,
        h.congenital_disease AS Disease,
        p.hospcode AS hospcode,
        p.refer_out,
        p.refer_in
    FROM
        personal_patient p
    JOIN
        health_history h ON p.idhealth_history = h.idhealth_history
    WHERE
        p.refer_out = 0 AND p.refer_in = 0`;

    const values = [];

    if (hospcode !== '50000') {
        sql += ' AND p.hospcode = ?'; // เพิ่มเงื่อนไข WHERE โดยใช้ AND
        values.push(hospcode); // เพิ่มค่า hospcode เข้าไปใน values array
    }
    
    pool.query(sql, values, (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});


function insertAddress(hn, res, callback) {
    pool.query(
      `INSERT INTO 
        address_patient 
       (cr_houseno ,
        cr_ampur,
        cr_village ,
        cr_soi ,
        cr_road ,
        cr_tambon ,
        cr_changwat ,
        cr_zip_code ,
        cid_houseno ,
        cid_village ,
        cid_sol ,
        cid_road ,
        cid_tambon ,
        cid_ampur,
        cid_changwat ,
        cid_zip_code,
        time_update 
       )
       SELECT 
         cr_houseno ,
         cr_ampur,
         cr_village ,
         cr_soi ,
         cr_road ,
         cr_tambon ,
         cr_changwat ,
         cr_zip_code ,
         cid_houseno ,
         cid_village ,
         cid_sol ,
         cid_road ,
         cid_tambon ,
         cid_ampur,
         cid_changwat ,
         cid_zip_code,
         time_update
       FROM personal_patient AS p
       JOIN address_patient AS a ON p.idaddress_patient = a.idaddress_patient
       WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out = 0;`,
      [hn],
      (error, results) => {
        if (error) {
          console.error('Error inserting address data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        console.log('Inserted address data successfully:', results);
        callback(results.insertId); // Pass the address ID to the callback
      }
    );
  }

function insertContact(hn, res, callback) {
    pool.query(
      `INSERT INTO 
        contact_patient
       (father_cid, 
        father_name,
        father_mobile, 
        mother_cid, 
        mother_name, 
        mother_mobile,
        emergency_contact_name, 
        emergency_contact_mobile,
        emergency_contact_related,
        informant_name,
        informant_address, 
        informant_relation,
        informant_mobile
       )
       SELECT 
         father_cid,
         father_name,
         father_mobile,
         mother_cid,
         mother_name,
         mother_mobile,
         emergency_contact_name, 
         emergency_contact_mobile,
         emergency_contact_related,
         informant_name,
         informant_address,
         informant_relation,
         informant_mobile
       FROM personal_patient AS p
       JOIN contact_patient AS c ON p.idcontact_patient = c.idcontact_patient
       WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out = 0;`,
      [hn],
      (error, results) => {
        if (error) {
          console.error('Error inserting contact data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        console.log('Inserted contact data successfully:', results);
        callback(results.insertId); // Pass the contact ID to the callback
      }
    );
  }

function insertDrug(hn, res, callback) {
    pool.query(
        `INSERT INTO 
            drug_allergy
            (drug,
                drugallergy,       
                typedx, 
                alevel,         
                symptom,          
                informant,        
                informhosp,              
                provider
            )
        SELECT 
                drug,
                drugallergy,       
                typedx, 
                alevel,         
                symptom,          
                informant,        
                informhosp,              
                provider
        FROM personal_patient AS p
        JOIN drug_allergy AS d ON p.iddrug_allergy = d.iddrug_allergy
        WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out  = 0;`, [hn], (error, results) => {
            if (error) {
                console.error('Error inserting drugallergy data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Inserted drugallergy data successfully:', results);
            callback(results.insertId); // Pass the contact ID to the callback

        });
}

function insertHealthHistory(hn, res, callback) {
    pool.query(
        `INSERT INTO 
            health_history
            (congenital_disease,
                Diagosis_result,       
                symptom, 
                current_treatment,         
                current_symptoms,          
                PDR,        
                current_drug,              
                medical_history
            )
        SELECT 
                congenital_disease,
                Diagosis_result,       
                symptom, 
                current_treatment,         
                current_symptoms,          
                PDR,        
                current_drug,              
                medical_history
        FROM personal_patient AS p
        JOIN health_history AS h ON p.idhealth_history = h.idhealth_history
        WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out  = 0;`, [hn], (error, results) => {
            if (error) {
                console.error('Error inserting healthistory data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Inserted healthistor data successfully:', results);
            res.json({ message: 'Data inserted successfully' });
            callback(results.insertId); // Pass the contact ID to the callback
        });
}

function insertReferInData(hn, res) {
    let addressId;
    let contactId;
    let healthHistoryId;
    let drugAllergyId;

    insertAddress(hn, res, (insertedAddressId) => {
        addressId = insertedAddressId;
        insertContact(hn, res, (insertedContactId) => {
            contactId = insertedContactId;
            insertHealthHistory(hn, res, (insertedHealthHistoryId) => {
                healthHistoryId = insertedHealthHistoryId;
                insertDrug(hn, res, (insertedDrugId) => {
                    drugAllergyId = insertedDrugId;
                    pool.query(
                        `INSERT INTO 
                        personal_patient 
                    (   
                        hn,
                        hospcode,
                        patient_cid,
                        date_of_issue,
                        expiration_date,
                        patient_title_nameth,
                        patient_nameth,
                        patient_last_nameth,
                        patient_title_nameen,
                        patient_nameen,
                        patient_last_nameen,
                        patient_sex,
                        patient_birth,
                        patient_old,
                        patient_religion,
                        patient_nation,
                        patient_race,
                        patient_abogroup,
                        patient_rhgroup,
                        patient_education,
                        patient_jobs,
                        patient_email,
                        patient_mobile,
                        patient_marital_status,
                        patient_personal_doc,
                        create_time,
                        idaddress_patient,
                        idcontact_patient,
                        idhealth_history,
                        iddrug_allergy,
                        date_referin,
                        time_referin,
                        status,
                        warddisch,
                        reason,
                        idreferout_popup,
                        TimeUpdate,
                        refer_in,
                        refer_out
                    )
                    SELECT
                        hn,
                        hospcode,
                        patient_cid, 
                        date_of_issue,
                        expiration_date,
                        patient_title_nameth,
                        patient_nameth,
                        patient_last_nameth,
                        patient_title_nameen,
                        patient_nameen,
                        patient_last_nameen,
                        patient_sex,
                        patient_birth,
                        patient_old,
                        patient_religion,
                        patient_nation,
                        patient_race,
                        patient_abogroup,
                        patient_rhgroup,
                        patient_education,
                        patient_jobs,
                        patient_email,
                        patient_mobile,
                        patient_marital_status,
                        patient_personal_doc,
                        create_time,
                        ?,
                        ?,
                        ?,
                        ?,
                        date_referin,
                        time_referin,
                        2 AS status,
                        warddisch,
                        reason,
                        idreferout_popup,
                        TimeUpdate,
                        0 AS refer_in,
                        1 AS refer_out
                    FROM 
                        personal_patient
                    WHERE 
                        hn = ? AND refer_in = 0 AND refer_out = 0;`,  
                        [addressId, contactId, healthHistoryId, drugAllergyId, hn],
                        (error, results) => {
                            if (error) {
                                console.error('Error inserting data:', error);
                                res.status(500).json({ error: 'Internal Server Error' });
                                return;
                            }
                            console.log('Inserted data successfully:', results);
                        }
                    );
                });
            });
        });
    });
}

router.post('/update', (req, res) => {
    const { hn } = req.body;

    insertReferInData(hn, res);
});
    
module.exports = router;

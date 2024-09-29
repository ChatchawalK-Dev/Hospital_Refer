const express = require('express');
const router = express.Router();
const pool = require('./db');

router.get('/', (req, res) => {
    pool.query(
    `
    SELECT 
        p.hn AS HN,
        p.patient_cid AS CID,
        CONCAT(p.patient_title_nameth, '.', p.patient_nameth, ' ', p.patient_last_nameth) AS fullNameTH,
        CONCAT(p.patient_title_nameen,'.',p.patient_nameen,' ',p.patient_last_nameen) AS fullNameEN,
        p.patient_sex AS Sex,
        p.patient_old AS Old,
        p.patient_birth AS BirthDay,
        p.patient_abogroup AS BloodGroup,
        p.patient_rhgroup AS BloodGroupRh,
        CASE 
            WHEN ap.idaddress_patient IS NOT NULL THEN CONCAT_WS(' ',
                ap.cid_houseno, ap.cid_village, ap.cid_sol, ap.cid_road, ap.cid_tambon, ap.cid_ampur, ap.cid_changwat, ap.cid_zip_code)
            ELSE NULL
        END AS CIDAddress,
        CASE 
            WHEN ap.idaddress_patient IS NOT NULL THEN CONCAT_WS(' ', 
                ap.cr_houseno, ap.cr_village, ap.cr_soi, ap.cr_road, ap.cr_tambon, ap.cr_ampur, ap.cr_changwat, ap.cr_zip_code)
            ELSE NULL
        END AS CurrentAddress,
        p.patient_religion  AS Religion,
        p.create_time AS RegistrationDate,
        p.patient_nation AS Nationality,
        p.patient_race AS Ethnicity,
        p.patient_jobs AS Occupation,
        p.patient_personal_doc AS PersonalDoctor,
        p.patient_mobile AS ContactNumber,
        p.patient_marital_status AS MaritalStatus,
        cp.father_name AS FatherName,
        cp.father_cid AS FatherCID,
        cp.mother_name AS MotherName,
        cp.mother_cid AS MotherCID,
        cp.emergency_contact_name AS EmergencyContactName,
        cp.emergency_contact_related AS EmergencyContactRelationship,
        cp.emergency_contact_mobile AS EmergencyContactMobile,
        cp.informant_name AS InformantName,
        h.congenital_disease AS CongenitalDisease,
        h.medical_history AS MedicalHistory,
        h.current_symptoms AS CurrentSymptoms,
        h.current_treatment AS CurrentTreatment,
        h.Diagosis_result AS DiagnosisResult,
        ap.cr_houseno, 
        ap.cr_village, 
        ap.cr_soi, 
        ap.cr_road, 
        ap.cr_tambon, 
        ap.cr_ampur, 
        ap.cr_changwat, 
        ap.cr_zip_code
    FROM
        personal_patient p
    JOIN
        referout_popup rp ON p.idreferout_popup = rp.idreferout_popup
    JOIN
        health_history h ON p.idhealth_history = h.idhealth_history
    JOIN
        contact_patient cp ON p.idcontact_patient = cp.idcontact_patient
    LEFT JOIN
        address_patient ap ON p.idaddress_patient = ap.idaddress_patient
    WHERE 
        refer_in = 0 AND refer_out = 1 ;
    `
    , (error, results) => {
        if (error) {
            console.error(error);
            res.status(500).json({ error: 'Internal Server Error' });
            return;
        }
        res.json(results);
    });
});

router.get('/addressCID/:addressCID', (req, res) => {
    const addressCID = req.params.addressCID;

    pool.query(
        `
        SELECT x.* FROM hospital_project.address_patient x
        WHERE idaddress_patient = ?
        `,
        [addressCID],
        (error, results) => {
            if (error) {
                console.error(error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            res.json(results);
        }
    );
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
       WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out = 1;`,
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
       WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out = 1;`,
      [hn],
      (error, results) => {
        if (error) {
          console.error('Error inserting contact data:', error);
          res.status(500).json({ error: 'Internal Server Error' });
          return;
        }
        console.log('Inserted contact data successfully:', results);
        callback(results.insertId);
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
        WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out  = 1;`, [hn], (error, results) => {
            if (error) {
                console.error('Error inserting drugallergy data:', error);
                res.status(500).json({ error: 'Internal Server Error' });
                return;
            }
            console.log('Inserted drugallergy data successfully:', results);
            callback(results.insertId);

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
        WHERE p.hn = ? AND p.refer_in = 0 AND p.refer_out  = 1;`, [hn], (error, results) => {
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
                            p.hn,
                            rp.hosp_destination,
                            p.patient_cid,
                            p.date_of_issue,
                            p.expiration_date,
                            p.patient_title_nameth,
                            p.patient_nameth,
                            p.patient_last_nameth,
                            p.patient_title_nameen,
                            p.patient_nameen,
                            p.patient_last_nameen,
                            p.patient_sex,
                            p.patient_birth,
                            p.patient_old,
                            p.patient_religion,
                            p.patient_nation,
                            p.patient_race,
                            p.patient_abogroup,
                            p.patient_rhgroup,
                            p.patient_education,
                            p.patient_jobs,
                            p.patient_email,
                            p.patient_mobile,
                            p.patient_marital_status,
                            p.patient_personal_doc,
                            p.create_time,
                            ?,
                            ?,
                            ?,
                            ?,
                            p.date_referin,
                            p.time_referin,
                            2 AS status,
                            p.warddisch,
                            p.reason,
                            p.idreferout_popup,
                            p.TimeUpdate,
                            1 AS refer_in,
                            0 AS refer_out
                        FROM 
                            personal_patient AS p
                        JOIN 
                            referout_popup AS rp ON p.idreferout_popup = rp.idreferout_popup
                        WHERE 
                            p.hn = ? AND p.refer_in = 0 AND p.refer_out = 1;`,  
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
    const { status, hn } = req.body;

    if (![1, 3].includes(status)) {
        return res.status(400).json({ error: 'Invalid status value' });
    }

    if (status === 1) {

        pool.query(
            'UPDATE personal_patient SET status = 1 WHERE status = 2 AND hn = ? AND refer_in = 0 AND refer_out = 1',
            [hn],
            (error, results) => {
                if (error) {
                    console.error('Error updating status:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log('Updated status successfully:', results);

                insertReferInData(hn, res);
            }
        );
    } else if (status === 3) {
  
        pool.query(
            'UPDATE personal_patient SET status = 3 WHERE status = 2 AND hn = ? AND refer_in = 0 AND refer_out = 1',
            [hn],
            (error, results) => {
                if (error) {
                    console.error('Error updating status:', error);
                    res.status(500).json({ error: 'Internal Server Error' });
                    return;
                }
                console.log('Updated status successfully:', results);
                res.json({ message: 'Status updated successfully' });
            }
        );
    }
});


module.exports = router;

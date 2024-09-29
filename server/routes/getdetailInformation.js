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
        refer_in = 0 AND refer_out = 0;
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

module.exports = router;
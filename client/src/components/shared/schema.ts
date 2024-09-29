import * as Yup from "yup";

export const userSchema = Yup.object({
  cid: Yup.string().required("CID is required"),
  issueDate: Yup.string().required("Issue Date is required"),
  expireDate: Yup.string().required("Expiration Date is required"),
  nameThai: Yup.string().required("Name (Thai) is required"),
  surnameThai: Yup.string().required("Surname (Thai) is required"),
  nameEng: Yup.string().required("Name (Eng) is required"),
  surnameEng: Yup.string().required("Surname (Eng) is required"),
  gender: Yup.string().required("Gender is required"),
  religion: Yup.string().required("Religion is required"),
  born: Yup.string().required("Date of Birth is required"),
});

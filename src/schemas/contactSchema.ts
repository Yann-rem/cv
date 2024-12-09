import * as Yup from "yup";

import { emailRegex, phoneRegex } from "@/utils/regexes";

export const contactSchema = () => {
  return Yup.object().shape({
    firstName: Yup.string()
      .required("validation.first_name.required")
      .min(2, "validation.first_name.min")
      .max(50, "validation.first_name.max"),
    lastName: Yup.string()
      .required("validation.last_name.required")
      .min(2, "validation.last_name.min")
      .max(50, "validation.last_name.max"),
    email: Yup.string().required("validation.email.required").matches(emailRegex, "validation.email.invalid"),
    phone: Yup.string().required("validation.phone.required").matches(phoneRegex, "validation.phone.invalid"),
    subject: Yup.string()
      .required("validation.subject.required")
      .min(5, "validation.subject.min")
      .max(100, "validation.subject.max"),
    message: Yup.string()
      .required("validation.message.required")
      .min(20, "validation.message.min")
      .max(2000, "validation.message.max"),
  });
};

export default contactSchema;

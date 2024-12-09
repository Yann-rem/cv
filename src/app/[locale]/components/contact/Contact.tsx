import { FC, memo } from "react";

import ContactForm from "./ContactForm";

const Contact: FC = () => {
  console.debug("[Render] 'Contact' Component");

  return <ContactForm />;
};

export default memo(Contact);

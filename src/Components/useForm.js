import { useState } from "react";
import validator from "validator";

export function useForm(initialValues) {
  const [values, setValues] = useState(initialValues);

  const handleInput = (e) => {
    const { name, value } = e.target;
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleUrl = (e) => {
    let { name, value } = e.target;
    value = value.replace(/\s+/g, "-").toLowerCase();
    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleDate = (date, name) => {
    setValues({
      ...values,
      [name]: date,
    });
  };

  const handleArr = (e, index) => {
    let { name, value } = e.target;
    let updateArr = values;
    updateArr[index][name] = value;
    setValues([...updateArr]);
  };

  const validateURL = (str) => {
    return validator.isURL(str);
  };

  const validateEmail = (email) => {
    const re =
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePhone = (number) => {
    const format = /^[+]?[(]?\d{3}[)]?[-\s.]?\d{3}[-\s.]?\d{4,6}$/im;
    return number.match(format);
  };
  const validateCard = (str) => {
    const regexp =
      /^(?:(4\d{12}(?:\d{3})?)|(5[1-5]\d{14})|(6(?:011|5\d{2})\d{12})|(3[47]\d{13})|(3(?:0[0-5]|[68]\d)\d{11})|((?:2131|1800|35\d{3})\d{11}))$/;
    return regexp.test(str);
  };
  const cardType = (cc) => {
    const amex = /^3[47]\d{13}$/;
    const visa = /^4\d{12}(?:\d{3})?$/;
    const cup1 = /^62\d{14}\d*$/;
    const cup2 = /^81\d{14}\d*$/;
    const mastercard = /^5[1-5]\d{14}$/;
    const mastercard2 = /^2[2-7]\d{14}$/;
    const disco1 = /^6011\d{12}\d*$/;
    const disco2 = /^62[24568]\d{13}\d*$/;
    const disco3 = /^6[45]\d{14}\d*$/;
    const diners = /^3[0689]\d{12}\d*$/;
    const jcb = /^35\d{14}\d*$/;
    if (visa.test(cc)) {
      return "Visa ending in " + cc.substr(cc.length - 4);
    }
    if (amex.test(cc)) {
      return "Amex ending in " + cc.substr(cc.length - 4);
    }
    if (mastercard.test(cc) || mastercard2.test(cc)) {
      return "Mastercard ending in " + cc.substr(cc.length - 4);
    }
    if (disco1.test(cc) || disco2.test(cc) || disco3.test(cc)) {
      return "Discover ending in " + cc.substr(cc.length - 4);
    }
    if (diners.test(cc)) {
      return "Diners ending in " + cc.substr(cc.length - 4);
    }
    if (jcb.test(cc)) {
      return "Jcb ending in " + cc.substr(cc.length - 4);
    }
    if (cup1.test(cc) || cup2.test(cc)) {
      return "China union pay ending in " + cc.substr(cc.length - 4);
    }
    return undefined;
  };
  return {
    values,
    setValues,
    handleInput,
    handleUrl,
    handleDate,
    handleArr,
    validateURL,
    validateEmail,
    validatePhone,
    validateCard,
    cardType,
  };
}

import React from "react";
import ReCAPTCHA from "./recaptcha";
import makeAsyncScriptLoader from "react-async-script";

function getOptions() {
  return (typeof window !== "undefined" && window.recaptchaOptions) || {};
}
function getURL(useRecaptchaNet) {
  const dynamicOptions = getOptions();
  const lang = dynamicOptions.lang ? `&hl=${dynamicOptions.lang}` : "";
  const hostname =
    dynamicOptions.useRecaptchaNet || useRecaptchaNet ? "recaptcha.net" : "www.google.com";
  return `https://${hostname}/recaptcha/api.js?onload=${callbackName}&render=explicit${lang}`;
}

const callbackName = "onloadcallback";
const globalName = "grecaptcha";
const initialOptions = getOptions();

export default class ReCAPTCHAWrapper extends React.Component {
  render() {
    const { useRecaptchaNet, ...props } = this.props;
    const AsyncRecaptcha = makeAsyncScriptLoader(() => getURL(useRecaptchaNet), {
      callbackName,
      globalName,
      removeOnUnmount: initialOptions.removeOnUnmount || false,
    })(ReCAPTCHA);

    return <AsyncRecaptcha {...props} />;
  }
}

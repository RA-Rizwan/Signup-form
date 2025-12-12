import {
  EnvelopeIcon,
  LockClosedIcon,
  UserIcon,
} from "@heroicons/react/16/solid";
import Input from "./InputField";
import Checkbox from "./Checkbox";
import { useState } from "react";
import SuccessAlert from "./SuccessAlert";
import logo from "./assets/devConnect.jpg";

const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    terms: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    const finalValue = type === "checkbox" ? checked : value;

    setFormData((prev) => ({
      ...prev,
      [name]: finalValue,
    }));
  };

  const isFormValid =
    formData.name.trim() !== "" &&
    formData.email.trim() !== "" &&
    formData.password.trim() !== "" &&
    formData.terms === true;

  const handleSubmit = (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    setTimeout(() => {
      console.log("Submitting:", formData);

      setIsSubmitting(false);

      setShowSuccess(true);

      setFormData({ name: "", email: "", password: "", terms: false });

      setTimeout(() => setShowSuccess(false), 3000);
    }, 1000);
  };
  return (
    <>
      <SuccessAlert show={showSuccess} onClose={() => setShowSuccess(false)} />

      <div className="flex min-h-full flex-col justify-center px-6 py-8 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img src={logo} alt="Dev Connect" className="mx-auto h-20 w-auto" />
          <h2 className="mt-6 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
            Sign up for an account
          </h2>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
          <form onSubmit={handleSubmit} className="space-y-3">
            <Input
              label="Name"
              id="name"
              type="text"
              placeholder="Name"
              Icon={UserIcon}
              value={formData.name}
              onChange={handleChange}
            />

            <Input
              label="Email"
              id="email"
              type="email"
              placeholder="you@example.com"
              Icon={EnvelopeIcon}
              value={formData.email}
              onChange={handleChange}
            />

            <Input
              label="Password"
              id="password"
              type="password"
              placeholder="••••••••"
              Icon={LockClosedIcon}
              value={formData.password}
              onChange={handleChange}
            />

            <Checkbox
              id="terms"
              label="I agree to the Terms and Conditions"
              checked={formData.terms}
              onChange={handleChange}
            />

            <button
              type="submit"
              disabled={!isFormValid || isSubmitting}
              className={`flex w-full justify-center items-center rounded-md px-3 py-1.5 text-sm/6 font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 
                ${
                  !isFormValid || isSubmitting
                    ? "bg-indigo-400 cursor-not-allowed opacity-80"
                    : "bg-indigo-600 hover:bg-indigo-500 focus-visible:outline-indigo-600"
                }
              `}
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                "Sign up"
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Form;

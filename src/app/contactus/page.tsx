"use client";
import React, { useEffect, useState } from "react";
import emailjs from "emailjs-com";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Box } from "../lib";

const Contact = () => {
  const [values, setValues] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const [errors, setErrors] = useState({
    fullName: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (validateForm()) {
      setLoading(true);
      emailjs
        .send(
          "service_9om7xnr",
          "template_j4oxnpx",
          values,
          "0sGY_6AthzL0ACvBx",
        )
        .then(
          (response) => {
            console.log("SUCCESS!", response);
            setValues({
              fullName: "",
              email: "",
              phone: "",
              message: "",
            });
            setStatus("SUCCESS");
            toast.success("Your message submitted successfully");
            setLoading(false);
          },
          (error) => {
            console.log("FAILED...", error);
            toast.error("Please try again. Mail send FAILED...");
            setLoading(false);
          },
        );
    }
  };

  useEffect(() => {
    if (status === "SUCCESS") {
      setTimeout(() => {
        setStatus("");
      }, 3000);
    }
  }, [status]);

  const handleChange = (e: any) => {
    setValues((prevValues) => ({
      ...prevValues,
      [e.target.name]: e.target.value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [e.target.name]: "",
    }));
  };

  const validateForm = () => {
    let isValid = true;
    const newErrors = {
      fullName: "",
      email: "",
      phone: "",
      message: "",
    };

    if (!values.fullName.trim()) {
      newErrors.fullName = "Full Name is required";
      isValid = false;
    }

    if (!values.email.trim()) {
      newErrors.email = "Email is required";
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      newErrors.email = "Email is invalid";
      isValid = false;
    }

    if (!values.phone.trim()) {
      newErrors.phone = "Phone is required";
      isValid = false;
    } else if (!/^\d{11,15}$/.test(values.phone)) {
      newErrors.phone = "Phone is invalid";
      isValid = false;
    }

    if (!values.message.trim()) {
      newErrors.message = "Message is required";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  return (
    <section className="pt-20 flex justify-center items-center bg-gray-100">
      <Box className="relative flex items-top justify-center bg-white dark:bg-gray-900 rounded-lg shadow-lg p-8 max-w-4xl mx-auto mb-6">
        <Box className="w-full">
          <Box className="mb-8 text-center">
            <h1 className="text-4xl sm:text-5xl text-gray-800 dark:text-white font-extrabold tracking-tight">
              Get in touch
            </h1>
            <p className="text-normal text-lg sm:text-2xl font-medium text-gray-600 dark:text-gray-400 mt-2">
              Fill in the form to start a conversation
            </p>
          </Box>

          <Box className="flex items-center mt-8 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            <Box className="ml-4 text-md tracking-wide font-semibold w-40">
              Acme Inc, Street, State, Postal Code
            </Box>
          </Box>

          <Box className="flex items-center mt-4 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
              />
            </svg>
            <Box className="ml-4 text-md tracking-wide font-semibold w-40">
              +44 1234567890
            </Box>
          </Box>

          <Box className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
              viewBox="0 0 24 24"
              className="w-8 h-8 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1.5"
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <Box className="ml-4 text-md tracking-wide font-semibold w-40">
              info@acme.org
            </Box>
          </Box>

          <form onSubmit={handleSubmit} className="mt-8">
            <Box className="relative mb-6">
              <input
                className="peer m-0 block w-full rounded border border-solid border-gray-300 bg-transparent px-3 py-4 text-base font-normal text-gray-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-1 focus:pt-6 focus:text-gray-700 focus:outline-none peer-focus:text-primary dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary"
                id="fullName"
                value={values.fullName}
                onChange={handleChange}
                name="fullName"
                type="text"
                placeholder="Enter your name..."
              />
              <label
                htmlFor="fullName"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-500 transition-all duration-200 ease-linear peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-primary"
              >
                Full Name
              </label>
              {errors.fullName && (
                <Box className="text-red-500 mt-1">{errors.fullName}</Box>
              )}
            </Box>

            <Box className="relative mb-6">
              <input
                className="peer m-0 block w-full rounded border border-solid border-gray-300 bg-transparent px-3 py-4 text-base font-normal text-gray-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-1 focus:pt-6 focus:text-gray-700 focus:outline-none peer-focus:text-primary dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary"
                id="email"
                value={values.email}
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="name@example.com"
              />
              <label
                htmlFor="email"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-500 transition-all duration-200 ease-linear peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-primary"
              >
                Email Address
              </label>
              {errors.email && (
                <Box className="text-red-500 mt-1">{errors.email}</Box>
              )}
            </Box>

            <Box className="relative mb-6">
              <input
                className="peer m-0 block w-full rounded border border-solid border-gray-300 bg-transparent px-3 py-4 text-base font-normal text-gray-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-1 focus:pt-6 focus:text-gray-700 focus:outline-none peer-focus:text-primary dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary"
                id="phone"
                value={values.phone}
                onChange={handleChange}
                name="phone"
                type="tel"
                placeholder="(123) 456-7890"
              />
              <label
                htmlFor="phone"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-500 transition-all duration-200 ease-linear peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-primary"
              >
                Phone Number
              </label>
              {errors.phone && (
                <Box className="text-red-500 mt-1">{errors.phone}</Box>
              )}
            </Box>

            <Box className="relative mb-6">
              <textarea
                className="peer m-0 block w-full rounded border border-solid border-gray-300 bg-transparent px-3 py-4 text-base font-normal text-gray-700 transition duration-200 ease-linear placeholder:text-transparent focus:border-primary focus:pb-1 focus:pt-6 focus:text-gray-700 focus:outline-none peer-focus:text-primary dark:border-gray-600 dark:text-gray-200 dark:focus:border-primary"
                id="message"
                value={values.message}
                onChange={handleChange}
                name="message"
                placeholder="Enter your message here..."
              ></textarea>
              <label
                htmlFor="message"
                className="pointer-events-none absolute left-0 top-0 origin-[0_0] border border-solid border-transparent px-3 py-4 text-gray-500 transition-all duration-200 ease-linear peer-focus:-translate-y-4 peer-focus:scale-75 peer-focus:text-primary peer-placeholder-shown:translate-y-0 peer-placeholder-shown:scale-100 motion-reduce:transition-none dark:text-gray-200 dark:peer-focus:text-primary"
              >
                Message
              </label>
              {errors.message && (
                <Box className="text-red-500 mt-1">{errors.message}</Box>
              )}
            </Box>

            <Box className="flex justify-center">
              <button
                className="btn btn-primary btn-lg px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 ease-in-out"
                id="submitButton"
                type="submit"
                disabled={loading}
              >
                {loading ? (
                  <svg
                    className="animate-spin h-5 w-5 text-white"
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
                ) : (
                  "Submit"
                )}
              </button>
            </Box>

            {status === "SUCCESS" && (
              <Box className="text-green-500 text-center mt-4">
                Your message submitted successfully
              </Box>
            )}
          </form>
        </Box>
      </Box>
      <ToastContainer />
    </section>
  );
};

export default Contact;

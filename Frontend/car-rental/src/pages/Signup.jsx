import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import 'aos/dist/aos.css';
import AOS from "aos"
import { useEffect } from "react";

const Signup = () => {
  const navigate = useNavigate();

  // Yup validation schema
  const SignupSchema = Yup.object({
    name: Yup.string().required("Full Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const handleSubmit = async (values, { setSubmitting, resetForm }) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/register`,
        values
      );

      if (response.data.message === "User registered successfully") {
        console.log("Signup Successful");
        toast.success("Signup Successful");
        resetForm();
        navigate("/login");
      }
    } catch (error) {
      console.error("Signup error:", error);
      toast.error("Signup Failed");
    } finally {
      setSubmitting(false);
    }
  };

  useEffect(() => {
    AOS.init({
      duration:1000,
      easing:"ease",
      once:true
    })
  },[]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <Formik
        initialValues={{
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          userType: "",
        }}
        validationSchema={SignupSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting }) => (
          <Form className="w-full max-w-sm bg-white shadow-md rounded-xl p-6">
            {/* Title */}
            <h2 data-aos="fade-down" className="text-2xl font-bold text-center mb-6">Signup</h2>

            {/* Name field */}
            <div data-aos="fade-up" className="mb-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Full Name
              </label>
              <Field
                type="text"
                name="name"
                id="name"
                placeholder="Enter your name"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Email field */}
            <div data-aos="fade-up" className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Email
              </label>
              <Field
                type="email"
                name="email"
                id="email"
                placeholder="Enter your email"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Password field */}
            <div data-aos="fade-up" className="mb-4">
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Password
              </label>
              <Field
                type="password"
                name="password"
                id="password"
                placeholder="Enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="password"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Confirm Password field */}
            <div data-aos="fade-up" className="mb-4">
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Confirm Password
              </label>
              <Field
                type="password"
                name="confirmPassword"
                id="confirmPassword"
                placeholder="Re-enter your password"
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <ErrorMessage
                name="confirmPassword"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* User Type (Radio Buttons) */}
            <div data-aos="fade-up" className="mb-4">
              <span className="block text-sm font-medium text-gray-700 mb-2">
                User Type
              </span>
              <div className="flex gap-6">
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="userType"
                    value="guest"
                    className="mr-2"
                  />
                  Guest
                </label>
                <label className="flex items-center">
                  <Field
                    type="radio"
                    name="userType"
                    value="owner"
                    className="mr-2"
                  />
                  Owner
                </label>
              </div>
              <ErrorMessage
                name="userType"
                component="div"
                className="text-red-500 text-sm mt-1"
              />
            </div>

            {/* Submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              data-aos="fade-up"
              className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition disabled:opacity-50"
            >
              {isSubmitting ? "Signing up..." : "Signup"}
            </button>

            <p data-aos="fade-up" className="mt-4 text-sm text-center">
              Already have an account?{" "}
              <a href="/Login" className="text-blue-600 hover:underline">
                Login
              </a>
            </p>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signup;

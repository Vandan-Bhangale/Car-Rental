import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "aos/dist/aos.css";
import AOS from "aos";
import { useEffect } from "react";

const AddCar = () => {
  const navigate = useNavigate();
  //Yup validation schema
  const AddCarSchema = Yup.object({
    Brand: Yup.string().required("Brand is required"),
    Model: Yup.string().required("Model is required"),
    Year: Yup.number()
      .required("Year is required")
      .min(1900, "Year must be 1900 or later")
      .max(new Date().getFullYear(), `Year can't be in the future`),
    DailyPrice: Yup.number()
      .required("Daily Price is required")
      .min(0, "Daily Price must be a positive number"),
    Category: Yup.string().required("Category is required"),
    Transmission: Yup.string().required("Transmission is required"),
    FuelType: Yup.string().required("Type is required"),
    SeatingCapacity: Yup.number()
      .required("Seating Capacity is required")
      .min(1, "Seating Capacity must be at least 1")
      .max(7, "Seating Capacity can't exceed 7"),
    Location: Yup.string().required("Location is required"),
    Description: Yup.string().required("Description is required"),
  });

  const handleSubmit = async (values) => {
    try {
      const formData = new FormData();
      formData.append("Brand", values.Brand);
      formData.append("Model", values.Model);
      formData.append("Year", values.Year);
      formData.append("DailyPrice", values.DailyPrice);
      formData.append("Category", values.Category);
      formData.append("Transmission", values.Transmission);
      formData.append("FuelType", values.FuelType);
      formData.append("SeatingCapacity", values.SeatingCapacity);
      formData.append("Location", values.Location);
      formData.append("Description", values.Description);
      formData.append("image", values.image);

      const Response = await axios.post(
        `${import.meta.env.VITE_GENERAL_API}/api/postCar`,
        formData,
        {
          withCredentials: true,
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("Car posted successfully", Response.data);
      navigate("/dashboard/cars");
      toast.success("Car added successfully");
    } catch (error) {
      console.error("Error posting car:", error);
      toast.error("Failed to add car. Please try again.");
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease",
      once: true,
    });
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2
          data-aos="fade-down"
          className="text-2xl font-bold text-gray-800 mb-6 text-center"
        >
          Add Car
        </h2>

        <Formik
          initialValues={{
            Brand: "",
            Model: "",
            Year: "",
            DailyPrice: "",
            Category: "",
            Transmission: "",
            FuelType: "",
            SeatingCapacity: "",
            Location: "",
            Description: "",
            image: null,
          }}
          validationSchema={AddCarSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ setFieldValue }) => (
            <Form
              data-aos="zoom-in"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {/* Brand */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Brand
                </label>
                <Field
                  type="text"
                  name="Brand"
                  placeholder="e.g. BMW, Audi, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Brand"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Model */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Model
                </label>
                <Field
                  type="text"
                  name="Model"
                  placeholder="e.g. 3 Series, A4, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Model"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Year */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Year
                </label>
                <Field
                  type="text"
                  name="Year"
                  placeholder="e.g. 2020"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Year"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Daily Price */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Daily Price
                </label>
                <Field
                  type="text"
                  name="DailyPrice"
                  placeholder="e.g. ₹1000"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="DailyPrice"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Category
                </label>
                <Field
                  type="text"
                  name="Category"
                  placeholder="e.g. SUV, Sedan, etc."
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Category"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Transmission */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Transmission
                </label>
                <Field
                  type="text"
                  name="Transmission"
                  placeholder="e.g. Automatic, Manual"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Transmission"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Fuel Type */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Fuel Type
                </label>
                <Field
                  type="text"
                  name="FuelType"
                  placeholder="e.g. Petrol, Diesel, Electric"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="FuelType"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Seating Capacity */}
              <div>
                <label className="block text-gray-700 font-medium mb-1">
                  Seating Capacity
                </label>
                <Field
                  type="text"
                  name="SeatingCapacity"
                  placeholder="5"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="SeatingCapacity"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Location */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Location
                </label>
                <Field
                  type="text"
                  name="Location"
                  placeholder="e.g. Vadodara, Mumbai"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Location"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className="block text-gray-700 font-medium mb-1">
                  Description
                </label>
                <Field
                  as="textarea"
                  name="Description"
                  placeholder="e.g. A comfortable sedan with great fuel efficiency."
                  rows="3"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
                <ErrorMessage
                  name="Description"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Image input section */}
              <div className="md:col-span-2">
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={(event) => {
                    setFieldValue("image", event.currentTarget.files[0]);
                  }}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-indigo-400 outline-none"
                />
              </div>

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-medium"
                >
                  Add Car
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default AddCar;

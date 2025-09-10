import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { toast } from "react-toastify";
import { useParams,useNavigate } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";

const EditCar = () => {
    const {id} = useParams();
    const navigate = useNavigate();

    const [initialValues, setInitialValues] = useState({
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
    });

    useEffect(() => {
        const fetchCar = async () => {
            try {
                const res = await axios.get(`${import.meta.env.VITE_GENERAL_API}/api/getCarsById/${id}`,{withCredentials:true});
                console.log("Fetched car data:", res.data);
                setInitialValues({
                    Brand: res.data.Brand || "",
                    Model: res.data.Model || "",
                    Year: res.data.Year || "",
                    DailyPrice: res.data.DailyPrice || "",
                    Category: res.data.Category || "",
                    Transmission: res.data.Transmission || "",
                    FuelType: res.data.FuelType || "",
                    SeatingCapacity: res.data.SeatingCapacity || "",
                    Location: res.data.Location || "",
                    Description: res.data.Description || "",
                });
            } catch (error) {
                toast.error("Failed to fetch car details.");
            }
        };
        fetchCar();
    }, [id]);

    const handleSubmit = async (values) => {
        try {
            await axios.put(`${import.meta.env.VITE_GENERAL_API}/api/updateCar/${id}`, values,{withCredentials:true});
            toast.success("Car updated successfully!");
            navigate("/dashboard/manage-car");
        } catch (error) {
            toast.error("Failed to update car.");
        }
    };

  //Yup validation schema
  const EditCarSchema = Yup.object({
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


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="w-full max-w-3xl bg-white shadow-xl rounded-2xl p-8">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Edit Car
        </h2>

        <Formik
          initialValues={initialValues}
          enableReinitialize
          validationSchema={EditCarSchema}
          onSubmit={handleSubmit}
        >
          {() => (
            <Form className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  placeholder="e.g. $50"
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
                  placeholder="e.g. New York, Los Angeles"
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

              {/* Submit */}
              <div className="md:col-span-2 flex justify-center">
                <button
                  type="submit"
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg shadow-md font-medium"
                >
                  Edit Car
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default EditCar;

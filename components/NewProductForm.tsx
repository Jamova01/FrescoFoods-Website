"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";
import { useEffect, useState } from "react";

interface FormValues {
  productName: string;
  productType: string;
  productBrand: string;
  productImage: string;
  productDescription: string;
}

interface ProductType {
  productType: string;
  productBrands: { name: string; logo_url: string }[];
}

const validationSchema = Yup.object().shape({
  productName: Yup.string().required("Product name is required"),
  productType: Yup.string().required("Product type is required"),
  productBrand: Yup.string().required("Product brand is required"),
  productDescription: Yup.string(),
  productImage: Yup.string()
    .url("Please enter a valid URL for the product image")
    .required("Product image URL is required"),
});

const BrandSelect = ({
  productBrands,
  onChange,
}: {
  productBrands: { name: string; logo_url: string }[];
  onChange: (brand: string) => void;
}) => {
  return (
    <Field
      as="select"
      id="productBrand"
      name="productBrand"
      className="mt-1 p-2 w-full border rounded-md"
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
        onChange(e.target.value);
      }}
    >
      <option value="">Select a brand</option>
      {productBrands.map((brand, index) => (
        <option key={index} value={brand.name}>
          {brand.name}
        </option>
      ))}
    </Field>
  );
};

export const NewProductForm = () => {
  const [productTypes, setProductTypes] = useState<ProductType[]>([]);
  const [flavors, setFlavors] = useState<string[]>([]);

  const fetchData = async () => {
    try {
      const productResponse = await fetch("/api/product-types");
      if (!productResponse.ok) {
        throw new Error("No se pudo obtener los datos de la API");
      }
      const { data } = await productResponse.json();
      setProductTypes(data);
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const handleSubmit = async (values: FormValues, { resetForm }) => {
    try {
      const selectedBrand = productTypes
        .find((item) => item.productType === values.productType)
        ?.productBrands.find((brand) => brand.name === values.productBrand);

      if (!selectedBrand) {
        console.error("Marca no encontrada");
        return;
      }

      const docRef = await addDoc(collection(db, "products"), {
        productName: values.productName,
        productType: values.productType,
        productBrand: values.productBrand,
        brandLogo: selectedBrand.logo_url,
        productImage: values.productImage,
        productDescription: values.productDescription,
        flavors: flavors,
      });

      resetForm();
      setFlavors([]);
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
  };

  // Función para agregar un sabor a la lista
  const addFlavor = (flavor: string) => {
    setFlavors((prevFlavors) => [...prevFlavors, flavor]);
  };

  // Función para actualizar un sabor en la lista
  const updateFlavor = (index: number, value: string) => {
    const updatedFlavors = [...flavors];
    updatedFlavors[index] = value;
    setFlavors(updatedFlavors);
  };

  // Función para eliminar un sabor de la lista
  const removeFlavor = (index: number) => {
    const updatedFlavors = [...flavors];
    updatedFlavors.splice(index, 1);
    setFlavors(updatedFlavors);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      // className="max-w-md mx-auto mt-5 p-4 border rounded-lg shadow-lg"
      className="w-4/5 m-auto p-4 border rounded-lg shadow-lg"
    >
      <h1 className="text-2xl font-semibold mb-4">Add Product</h1>
      <Formik
        initialValues={{
          productName: "",
          productType: "",
          productBrand: "",
          productImage: "",
          productDescription: "",
          flavors: [],
        }}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ values, handleChange }) => (
          <Form className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <div className="mb-4">
                <label
                  htmlFor="productName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product name
                </label>
                <Field
                  type="text"
                  id="productName"
                  name="productName"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="productName"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productType"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product type
                </label>
                <Field
                  as="select"
                  id="productType"
                  name="productType"
                  className="mt-1 p-2 w-full border rounded-md"
                >
                  <option value="">Select a product type</option>
                  {productTypes?.map((item: ProductType, index: number) => (
                    <option key={index} value={item.productType}>
                      {item.productType}
                    </option>
                  ))}
                </Field>
                <ErrorMessage
                  name="productType"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productBrand"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product Brand
                </label>
                <BrandSelect
                  productBrands={
                    productTypes.find(
                      (item) => item.productType === values.productType
                    )?.productBrands || []
                  }
                  onChange={(brand: string) => {
                    handleChange({
                      target: { name: "productBrand", value: brand },
                    });
                  }}
                />
                <ErrorMessage
                  name="productBrand"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <button
                  type="button"
                  onClick={() => addFlavor("")}
                  className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
                >
                  Add Flavor
                </button>
              </div>
              {flavors.map((flavor, index) => (
                <div key={index} className="mb-4">
                  <label
                    htmlFor={`flavor_${index}`}
                    className="block text-sm font-medium text-gray-700"
                  >
                    Flavor {index + 1}
                  </label>
                  <div className="flex">
                    <Field
                      type="text"
                      id={`flavor_${index}`}
                      name={`flavors[${index}]`}
                      className="mt-1 p-2 w-full border rounded-md"
                      onChange={(e) => updateFlavor(index, e.target.value)} // Actualiza el sabor en el estado
                    />
                    <button
                      type="button"
                      onClick={() => removeFlavor(index)}
                      className="ml-2 text-red-500 hover:text-red-700"
                    >
                      Remove
                    </button>
                  </div>
                  <ErrorMessage
                    name={`flavors[${index}]`}
                    component="div"
                    className="text-red-600 text-sm"
                  />
                </div>
              ))}
            </div>
            <div>
              <div className="mb-4">
                <label
                  htmlFor="productDescription"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product description
                </label>
                <Field
                  as="textarea"
                  id="productDescription"
                  name="productDescription"
                  rows={4}
                  className="mt-1 p-2 w-full border rounded-md resize-none"
                />
                <ErrorMessage
                  name="productDescription"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="productImage"
                  className="block text-sm font-medium text-gray-700"
                >
                  Product image URL
                </label>
                <Field
                  type="text"
                  id="productImage"
                  name="productImage"
                  className="mt-1 p-2 w-full border rounded-md"
                />
                <ErrorMessage
                  name="productImage"
                  component="div"
                  className="text-red-600 text-sm"
                />
              </div>
            </div>
            <div className="mb-4">
              <button
                type="submit"
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                Submit
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

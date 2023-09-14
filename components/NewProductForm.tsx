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
  product_type: string;
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
        .find((item) => item.product_type === values.productType)
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
      });

      resetForm();
      console.log("Document written with ID: ", docRef.id);
    } catch (error) {
      console.error("Error adding document: ", error);
    }
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
                    <option key={index} value={item.product_type}>
                      {item.product_type}
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
                      (item) => item.product_type === values.productType
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

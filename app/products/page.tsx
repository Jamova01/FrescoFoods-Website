"use client";
import React, { useContext, useEffect, useState } from "react";
import { ProductCard } from "components/ProductCard";
import { FrescoFoodsContext } from "context";

export default function Products() {
  const frescoFoodsContext = useContext(FrescoFoodsContext);
  const { state } = frescoFoodsContext || { state: { products: [] } };

  const [productTypes, setProductTypes] = useState({
    productTypes: [],
    brandsForProductType: [] as { name: string; logo_url: "" }[],
    selectedProductType: "",
    selectedBrand: "",
  });

  const fetchData = async () => {
    try {
      const productResponse = await fetch("/api/product-types");
      if (!productResponse.ok) {
        throw new Error("No se pudo obtener los datos de la API");
      }
      const { data } = await productResponse.json();
      setProductTypes((prevState) => ({
        ...prevState,
        productTypes: data,
      }));
    } catch (error) {
      console.error("Error al obtener los datos:", error);
    }
  };

  const getBrandsForProductType = (productType: string) => {
    const matchingProduct = (
      productTypes.productTypes as {
        productType: string;
        productBrands: [];
      }[]
    ).find((product) => product.productType === productType);

    const brands = matchingProduct ? matchingProduct.productBrands : [];
    return brands;
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="m-5">
      <div className="flex flex-col md:flex-row gap-8 p-8">
        <div className="mb-4 flex flex-col md:flex-row  items-center space-x-2">
          <label
            htmlFor="typeSelect"
            className="text-gray-600"
            onClick={() => console.log(productTypes)}
          >
            Filter by product type:
          </label>
          <select
            id="typeSelect"
            onChange={(event) => {
              const { value } = event.target;
              const brandsForProductType = getBrandsForProductType(value);

              setProductTypes((prevState) => ({
                ...prevState,
                brandsForProductType: brandsForProductType,
                selectedProductType: value,
                selectedBrand: "", // Reset selected brand when changing product type
              }));
            }}
            value={productTypes.selectedProductType}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">All</option>
            {productTypes.productTypes?.map(
              (item: { productType: string }, index) => (
                <option key={index} value={item.productType}>
                  {item.productType}
                </option>
              )
            )}
          </select>
        </div>
        <div className="mb-4 flex flex-col md:flex-row items-center space-x-2">
          <label htmlFor="brandSelect" className="text-gray-600">
            Filter by product brand:
          </label>
          <select
            id="brandSelect"
            onChange={(event) => {
              const { value } = event.target;
              setProductTypes((prevState) => ({
                ...prevState,
                selectedBrand: value,
              }));
            }}
            value={productTypes.selectedBrand}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
          >
            <option value="">All</option>
            {productTypes.brandsForProductType.map((brand, index) => (
              <option key={index} value={brand.name}>
                {brand.name}
              </option>
            ))}
          </select>
        </div>
      </div>
      <section className="flex flex-wrap justify-center gap-5 p-8">
        {state.products
          ?.filter((product) => {
            // Filter products based on selected product type and brand
            return (
              (!productTypes.selectedProductType ||
                product.productType === productTypes.selectedProductType) &&
              (!productTypes.selectedBrand ||
                product.productBrand === productTypes.selectedBrand)
            );
          })
          .map((product, index) => (
            <ProductCard
              key={index}
              logo={product.brandLogo}
              productImage={product.productImage}
              productName={product.productName}
              description={product.productDescription}
            />
          ))}
      </section>
    </div>
  );
}

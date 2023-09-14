"use client";
import { NewProductForm } from "components/NewProductForm";
import { useEffect, useState } from "react";
import { Table } from "components/Table";
import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../../firebase/firebaseConfig";

export default function Admin() {
  const [data, setData] = useState<DocumentData[]>([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const productsData: DocumentData[] = [];

      querySnapshot.forEach((doc) => {
        const product = doc.data() as DocumentData;
        productsData.push(product);
      });

      setData(productsData);
    } catch (error) {
      console.error("Error fetching products: ", error);
    }
  };

  const mapDataFields = data?.map((item) => {
    return {
      "Product name": item.productName,
      Brand: item.productBrand,
      Description: item.productDescription,
      Editar: "",
    };
  });

  const columns =
    mapDataFields && mapDataFields.length > 0
      ? Object.keys(mapDataFields[0])
      : [];
  const rows = mapDataFields || [];

  return (
    <div className="flex flex-col gap-14 p-14">
      <NewProductForm />
      <Table columns={columns} rows={rows} />
    </div>
  );
}

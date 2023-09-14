"use client";
import React, { createContext, useEffect, useReducer } from "react";

import { collection, getDocs, DocumentData } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const FrescoFoodsContext = createContext();

const initialState = {
  products: [],
};

const actionTypes = {
  SET_PRODUCTS: "SET_PRODUCTS",
  // SET_ITEMS: "SET_ITEMS",
  // SET_SELECTED_ITEM: "SET_SELECTED_ITEM",
  // SET_MESSAGE: "SET_MESSAGE",
  // RESET_MESSAGE: "RESET_MESSAGE",
  // SET_RESPONSE: "SET_RESPONSE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return { ...state, products: action.payload };
    // case actionTypes.SET_ITEMS:
    //   return { ...state, items: action.payload };
    // case actionTypes.SET_SELECTED_ITEM:
    //   return { ...state, selectedItem: action.payload };
    // case actionTypes.SET_MESSAGE:
    //   return { ...state, message: action.payload };
    // case actionTypes.RESET_MESSAGE:
    //   return { ...state, message: "" };
    // case actionTypes.SET_RESPONSE:
    //   return { ...state, response: action.payload };
    default:
      return state;
  }
};

export const FrescoFoodProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    fetchData();
  }, []);

  const setData = (data) =>
    dispatch({ type: actionTypes.SET_PRODUCTS, payload: data });

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

  return (
    <FrescoFoodsContext.Provider value={{ state }}>
      {children}
    </FrescoFoodsContext.Provider>
  );
};

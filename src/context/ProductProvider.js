import React, { Children, createContext, useContext, useEffect, useReducer, useState } from 'react';
import { initialState, productReducer } from '../state/ProductState/ProductReducer';
import { actionTypes } from "../state/actionTypes/actionTypes";

const PRODUCT_CONTEXT = createContext()

const ProductProvider = ({ children }) => {
    const [state, dispatch] = useReducer(productReducer, initialState)
    console.log(state)

    useEffect(() => {
        dispatch({ type: actionTypes.FETCHING_START })
        fetch("products.json")
            .then(res => res.json())
            .then(data => dispatch({ type: actionTypes.FETCHING_SUCCESS, payload: data }))
            .catch(() => dispatch({ type: actionTypes.FETCHING_ERROR }))
    }, [])

    const value = {
        state,
        dispatch
    }
    return (
        <PRODUCT_CONTEXT.Provider value={value}>
            {children}
        </PRODUCT_CONTEXT.Provider>
    );
};

export const useProducts = () => {
    const context = useContext(PRODUCT_CONTEXT);
    // console.log(context)
    return context;
}

export default ProductProvider;
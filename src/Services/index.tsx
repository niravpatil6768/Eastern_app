import React from "react";
import axios from "axios";
import axiosInstance from "./axiosInstance";

const BASE_URL = "https://interview.optimavaluepro.com/api/v1/";

export const loginService = async (formData: { email: string; password: string; }) => {
      try {
        const response = await axios.post(`${BASE_URL}login`, formData);
        console.log(response);
        return response;
      }
      catch (error) {
        throw error;
      }
}

export const fetchData = async () => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}users`);
        console.log(response);
        return response;
    } catch (error) {
        throw error;
      }
}

export const fetchDataBySearch = async (value?: string) => {
    try {
        const response = await axiosInstance.get(`${BASE_URL}users?search=${value}`);
        console.log(response);
        return response;
    } catch (error) {
        throw error;
      }
}

export const deleteMultiService = async (value: any) => {
    try {
        const response = await axiosInstance.post(`${BASE_URL}users-delete-multiple`, value)
        console.log(response);
        return response;
    } catch (error) {
        throw error;
      }
}

export const CreateUserService = async (formData : any) => {
    try {
      const response = await axiosInstance.post(`${BASE_URL}users`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log(response);
      return response;
    } catch (error) {
      throw error;
    }
  };

  export const DeleteSingleUser = async (id : any) => {
    try {
        const response = await axiosInstance.delete(`${BASE_URL}users/${id}`)
     console.log(response);
    return response;
  } catch (error) {
    throw error;
  }
  }

export const GetSingleUser = async (id: any) => {
    try{
        const response = await axiosInstance.get(`${BASE_URL}users/${id}`)
        console.log(response);
        return response.data;
      } catch (error) {
        throw error;
      }
}

export const UpdateSingleUser = async (id: any, formData : any) => {
    try{
        const response = await axiosInstance.post(`${BASE_URL}users/${id}`, formData, {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          });
        console.log(response);
        return response;
      } catch (error) {
        throw error;
      }
}




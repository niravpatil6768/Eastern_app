import React from "react";


export const storeToken = (Token: string) => {
    console.log(Token);
    localStorage.setItem("token", Token);
}

export const getToken = () => {
    return localStorage.getItem("token");
}

export const ClearData = () => {
    localStorage.clear();
}

export const storeUser = (data: any) => {
    console.log(data);
    localStorage.setItem("user", JSON.stringify(data));
}

export const getUser = () => {
    const data : any = localStorage.getItem("user");
    return JSON.parse(data);
}


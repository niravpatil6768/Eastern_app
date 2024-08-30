import { STORE_DATA, STORE_USER } from "./constants";

export const storeData = (users: any) => {
    console.log("Data received: ", users);
    return {
        type: STORE_DATA,
        payload: users,
    };
};

export const storeUserData = (user: any) => {
    console.log("Data received: ", user);
    return {
        type: STORE_USER,
        payload: user,
    };
};  
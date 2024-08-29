import { STORE_DATA } from "./constants";

export const storeData= (users: any) => {
    console.log("Data received: ", users); 
    return {
      type: STORE_DATA,
      payload: users,
    };
  };
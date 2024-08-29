import { STORE_DATA } from "./constants";


const initialState = {
    users: [],
}

export const reducer = (state = initialState, action: { type: any; payload: any; }) => {
    switch (action.type) {
      case STORE_DATA:
        console.log("Payload:", action.payload);
        const newState = {
          ...state,
          users: action.payload,
        };
        console.log("New State:", newState);
        return newState;

        default:
            return state;
        }
      };
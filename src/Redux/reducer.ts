import { STORE_DATA, STORE_USER } from "./constants";


const initialState = {
    users: [],
    user: []
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

        case STORE_USER:
            console.log("Payload:", action.payload);
            const userState = {
                ...state,
                user: action.payload,
            };
            return userState;

        default:
            return state;
    }
};
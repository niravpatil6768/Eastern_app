
export interface DataItem {
    id: string;
    name: string;
    email: string;
    dob: string;
    gender_text: string;
    status_text: string;
    role: {
        name: string;
    }
  }

export  interface RootState {
    reducer: {
      users: DataItem[];
    };
  }  
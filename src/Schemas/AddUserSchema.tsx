import * as Yup from 'yup';
const mode = localStorage.getItem('mode');
const AddUserSchema = Yup.object().shape({
  name: Yup.string()
    .required('Name is required'),
  
  email: Yup.string()
    .email('Invalid email format')
    .required('Email is required'),
  
  role_id: Yup.string()
    .required('Role ID is required'),
  
  dob: Yup.date()
    .required('Date of Birth is required'),
  
  gender: Yup.string()
    .required('Gender is required'),
  
  status: Yup.string()
    .required('Status is required'),
  
  profile: Yup.mixed()
    .nullable()
    .required('Profile is required'),
  
  user_galleries: Yup.array()
    .of(Yup.mixed().required('Gallery image is required'))
    .required('At least one gallery image is required'),
  
  user_pictures: Yup.array()
    .of(Yup.mixed().required('Picture is required'))
    .required('At least one picture is required'),
  
    password: Yup.string().
    min(6).required('Password is required')
});

export default AddUserSchema;

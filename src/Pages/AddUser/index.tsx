import {
  Box,
  Button,
  FilledTextFieldProps,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedTextFieldProps,
  Paper,
  Radio,
  RadioGroup,
  Select,
  StandardTextFieldProps,
  Switch,
  TextField,
  TextFieldVariants,
  Typography,
} from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import "react-datepicker/dist/react-datepicker.css";
import React, { ChangeEvent, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import AddUserSchema from "../../Schemas/AddUserSchema";
import {
  CreateUserService,
  GetSingleUser,
  UpdateSingleUser,
} from "../../Services";
import Swal from "sweetalert2";
import UpdateUserSchema from "../../Schemas/UpdateUserSchema";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from 'dayjs';
import { useFormikContext } from "formik";
import { JSX } from "react/jsx-runtime";
import { Style } from "./style";

const CssTextField = styled(TextField)({
  "& label.Mui-focused": {
    color: "grey",
  },
  "& .MuiInput-underline:after": {
    borderBottomColor: "red",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "lightgrey",
      // borderRadius: 7,
      borderWidth: "1.5px",
      //   backgroundColor: "white",
    },
    "&:hover fieldset": {
      //   borderColor: Colors,
    },
    "&.Mui-focused fieldset": {
      //   borderColor: Colors.First,
    },
  },
});

const AddUser = () => {
  const fileInputRef1 = useRef<HTMLInputElement>(null);
  const fileInputRef2 = useRef<HTMLInputElement>(null);
  const fileInputRef3 = useRef<HTMLInputElement>(null);
  const fileInputRef4 = useRef<HTMLInputElement>(null);
  const [showPass, setShowPass] = useState(false);
  const [initialValues, setInitialValues] = useState({
    name: "",
    email: "",
    role_id: "",
    dob: null as Dayjs | null,
    gender: "",
    status: "0",
    profile: null, // for binary data
    user_galleries: [], // array for binary data
    user_pictures: [], // array for binary data
    password: "",
    // isActive: false,
  });
  const navigate = useNavigate();
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const mode: any = query.get("mode");
  const userId: any = query.get("id");

  console.log(mode + userId);

  useEffect(() => {
    localStorage.setItem("mode", mode);
    if (mode === "update" && userId) {
      const fetchUserData = async () => {
        try {
          const response = await GetSingleUser(userId);
          console.log(response.data.name);

          const data = response.data;

          // Map data to the initialValues structure
          setInitialValues({
            name: data.name,
            email: data.email || "",
            role_id: data.role_id || "",
            dob: data.dob || "",
            gender: data.gender || "",
            status: data.status || "0",
            profile: data.profile_thumbnail || null,
            user_galleries: [], // Map as needed
            user_pictures: [], // Map as needed
            password: data.password || "",
          });
        } catch (error) {
          console.error("Error fetching user data", error);
        }
      };

      fetchUserData();
    }
  }, [mode, userId]);

  const {
    values,
    errors,
    handleSubmit,
    handleBlur,
    handleChange,
    touched,
    isValid,
    setFieldValue,
    resetForm,
  } = useFormik({
    initialValues: initialValues,
    enableReinitialize: true,
    validationSchema: mode !== "update" ? AddUserSchema : UpdateUserSchema,
    onSubmit: async () => {
      console.log(values);
      try {
        if (mode === "update") {
          const res = await UpdateSingleUser(userId, values);

          if (res.status === 200) {
            console.log("user updated!: ", res);
            resetForm();
            navigate("/dashboard");
          }
        } else {
          const res = await CreateUserService(values);
          console.log(res);

          if (res.status === 200) {
            console.log("user created!: ", res);
            resetForm();
            navigate("/dashboard");
            if (fileInputRef1.current) fileInputRef1.current.value = "";
            if (fileInputRef2.current) fileInputRef2.current.value = "";
            if (fileInputRef3.current) fileInputRef3.current.value = "";
            if (fileInputRef4.current) fileInputRef4.current.value = "";
          }
        }
      } catch (error) {
        console.error("error in submit user", error);
        throw error;
      }
    },
  });

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ): void => {
    if (event.currentTarget.files && event.currentTarget.files[0]) {
      setFieldValue(fieldName, event.currentTarget.files[0]);
    }
  };

  // Define the type for the clearFile function
  const clearFile = (fieldName: string): void => {
    setFieldValue(fieldName, null);
  };

  const handleShowPass = () => {
    setShowPass(!showPass);
  };

  return (
    <>
      <Navbar />
      <Grid container style={{ backgroundColor: "", height: "105px" }}></Grid>
      <Box sx={{ padding: "1rem" }}>
        <Paper
          elevation={3}
          sx={{ padding: "2rem", maxWidth: "1200px", margin: "auto" }}
        >
          <Grid container>
            <h2>{mode !== "update" ? "Add User" : "Update User"}</h2>
          </Grid>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter Name"
                  variant="standard"
                  name="name"
                  id="name"
                  autoComplete="off"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: "white" }}
                />
                {touched.name && errors.name && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.name}
                  </h5>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  size="small"
                  label="Enter Email"
                  disabled={mode === "update"}
                  variant="standard"
                  name="email"
                  id="email"
                  autoComplete="off"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: "white" }}
                />
                {touched.email && errors.email && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.email}
                  </h5>
                )}
              </Grid>

              {mode !== "update" && (
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    size="small"
                    type="password"
                    label="Enter Password"
                    variant="standard"
                    name="password"
                    id="password"
                    autoComplete="off"
                    value={values.password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    sx={{ backgroundColor: "white", marginTop: "1rem" }}
                  />
                  {touched.password && errors.password && (
                    <h5
                    style={Style.error}
                      className="form-error"
                    >
                      {errors.password}
                    </h5>
                  )}
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <FormControl fullWidth size="small" sx={{ marginTop: "1rem" }}>
                  <InputLabel id="select-label">Enter Role</InputLabel>
                  <Select
                    labelId="select-label"
                    id="role_id"
                    name="role_id"
                    variant="standard"
                    value={values.role_id}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <MenuItem value="" disabled>
                      Select an option
                    </MenuItem>
                    <MenuItem value="2">Sub Admin</MenuItem>
                    <MenuItem value="1">Administator</MenuItem>
                  </Select>
                </FormControl>
                {touched.role_id && errors.role_id && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.role_id}
                  </h5>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
          <TextField
                fullWidth
                size="small"
                label="Enter DOB"
                variant="standard"
                name="dob"
                id="dob"
                autoComplete="off"
                value={values.dob}
                onChange={handleChange}
                onBlur={handleBlur}
                sx={{ backgroundColor: 'white', marginTop: '1rem' }}
              />
              {touched.dob && errors.dob && (
              <h5
              style={Style.error}
                className="form-error"
              >
                {errors.dob}
              </h5>
            )}
        </Grid>

{/* <Grid item xs={12} md={6}>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DatePicker
          label="Enter DOB"
          value={values.dob ? dayjs(values.dob) : null}
          onChange={(newValue: Dayjs | null) => {
            setFieldValue('dob', newValue ? newValue.format('YYYY-MM-DD') : '');
          }}
          renderInput : any={(params : any) => (
            <TextField
              {...params}
              fullWidth
              size="small"
              variant="standard"
              name="dob"
              id="dob"
              autoComplete="off"
              onBlur={handleBlur}
              sx={{ backgroundColor: 'white', marginTop: '1rem' }}
            />
          )}
        />
      </LocalizationProvider>
      {touched.dob && errors.dob && (
        <h5
          style={{
            marginTop: 2,
            fontFamily: 'Avenir',
            justifySelf: 'start',
            display: 'flex',
            color: 'red',
          }}
          className="form-error"
        >
          {errors.dob}
        </h5>
      )}
    </Grid> */}

              <Grid item xs={12} md={6}>
                <TextField
                  label="Choose Profile"
                  type="file"
                  name="profile"
                  variant="standard"
                  id="profile"
                  fullWidth
                  sx={{ backgroundColor: "white", marginTop: "1rem" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={fileInputRef1}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                    handleFileChange(event, "profile")
                  }
                  onBlur={handleBlur}
                />
                {touched.profile && errors.profile && (
                  <h5
                    style={Style.error}
                    className="form-error"
                  >
                    {errors.profile}
                  </h5>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Choose Galleries"
                  type="file"
                  name="user_galleries"
                  variant="standard"
                  id="user_galleries"
                  fullWidth
                  sx={{ backgroundColor: "white", marginTop: "1rem" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={fileInputRef2}
                  inputProps={{
                    multiple: true, // Allows selecting multiple files
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const files = event.currentTarget.files;
                    if (files) {
                      const fileArray = Array.from(files);
                      setFieldValue("user_galleries", fileArray); // Update the Formik state
                    }
                  }}
                  onBlur={handleBlur}
                />
                {touched.user_galleries && errors.user_galleries && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.user_galleries}
                  </h5>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  label="Choose Pictures"
                  type="file"
                  name="user_pictures"
                  variant="standard"
                  id="user_pictures"
                  fullWidth
                  sx={{ backgroundColor: "white", marginTop: "1rem" }}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  inputRef={fileInputRef3}
                  inputProps={{
                    multiple: true, // Allows selecting multiple files
                  }}
                  onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                    const files = event.currentTarget.files;
                    if (files) {
                      const fileArray = Array.from(files);
                      setFieldValue("user_pictures", fileArray); // Update the Formik state
                    }
                  }}
                  onBlur={handleBlur}
                />
                {touched.user_pictures && errors.user_pictures && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.user_pictures}
                  </h5>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <FormControl component="fieldset" sx={{ marginTop: "1rem" }}>
                  <Typography
                    variant="subtitle1"
                    sx={{ display: "flex", justifySelf: "start" }}
                  >
                    Gender
                  </Typography>
                  <RadioGroup
                    value={values.gender}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    row
                    name="gender"
                    id="gender"
                  >
                    <FormControlLabel
                      value="0"
                      control={<Radio />}
                      label="Female"
                    />
                    <FormControlLabel
                      value="1"
                      control={<Radio />}
                      label="Male"
                    />
                  </RadioGroup>
                </FormControl>
                {touched.gender && errors.gender && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.gender}
                  </h5>
                )}
              </Grid>

              <Grid
                item
                xs={12}
                md={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        sx={{ fontSize: "3rem" }}
                        checked={values.status === "1"}
                        onChange={(e) => {
                          setFieldValue("status", e.target.checked ? "1" : "0");
                        }}
                      />
                    }
                    label={
                      <Typography sx={{ fontSize: "1.3rem" }}>
                        {values.status === "1" ? "Active" : "Inactive"}
                      </Typography>
                    }
                  />
                </FormGroup>
                {touched.status && errors.status && (
                  <h5
                  style={Style.error}
                    className="form-error"
                  >
                    {errors.status}
                  </h5>
                )}
              </Grid>

              {mode !== "update" && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: "0.8rem 2rem",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        border: "1.7px solid #1976d2",
                      },
                    }}
                  >
                    Submit
                  </Button>
                </Grid>
              )}
              {mode === "update" && (
                <Grid
                  item
                  xs={12}
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    marginTop: "2rem",
                  }}
                >
                  <Button
                    type="submit"
                    variant="contained"
                    sx={{
                      padding: "0.8rem 2rem",
                      backgroundColor: "#1976d2",
                      "&:hover": {
                        border: "1.7px solid #1976d2",
                      },
                    }}
                  >
                    Update
                  </Button>
                </Grid>
              )}
            </Grid>
          </form>
        </Paper>
      </Box>
    </>
  );
};

export default AddUser;

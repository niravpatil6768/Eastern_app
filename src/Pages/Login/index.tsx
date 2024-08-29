import React, { useState } from "react";
import { Button, Grid, IconButton, InputAdornment, Paper, TextField, Typography } from "@mui/material";
import { alpha, styled } from "@mui/material/styles";
import Colors from "../../Assets/Colors";
import { useNavigate } from "react-router-dom";
import { BiSolidUser } from "react-icons/bi";
import { FaUnlockKeyhole } from "react-icons/fa6";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useFormik } from "formik";
import { SigninSchema } from "../../Schemas/SigninSchema";
import { loginService } from "../../Services";
import { storeToken, storeUser } from "../../utils/localStorage";
import toast, { Toaster } from "react-hot-toast";
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
        borderColor: "#007190",
      },
      "&.Mui-focused fieldset": {
        borderColor: "#007190",
      },
    },
  });

const Login = () => {
    // const dispatch = useDispatc();
    const navigate = useNavigate();
    const [showPass, setShowPass] = useState(false);
    const [initialValues, setInitialValues] = useState({
        email: "",
        password: ""
    })

    const handleShowPass = () => {
        setShowPass(!showPass);
    }

    const {values, errors, handleBlur, handleSubmit, handleChange, touched, resetForm} = useFormik({
      initialValues: initialValues,
      validationSchema: SigninSchema,

      onSubmit: async () => {
        try{
           const res = await loginService(values);
           if (res.status === 200) {
            storeToken(res.data.data.authorization)
            storeUser(res.data.data);
            navigate("/dashboard")
           }
           else{
            console.log("login failed: ", res);
            toast.error('Wrong Credentials', {
                duration: 5000, // Duration in milliseconds
                position: "top-right", // Position of the toast
              });
           }
           console.log(res);
        }
        catch(error) {
            console.error("Error is login user", error);
            toast.error('Wrong Credentials', {
                duration: 5000, // Duration in milliseconds
                position: "top-right", // Position of the toast
              });
        }
      resetForm();
      }
        });

    return (
        <Grid container>
            <Grid lg={4.5} md={4.5} sx={Style.grid}>

            </Grid>
            <Grid lg={7.5} md={7.5} sm={12} xs={12} sx={{padding: "0 10px"}}>
            <Toaster toastOptions={{ duration: 4000 }} />
        <Grid container sx={Style.grid1}>
        <Paper sx={Style.paper}>
           <div style={{display:"flex", flexDirection:"column", margin:"20px 0"}}>
           <Typography style={{fontSize:"1.8rem"}}>
           Sign In
            </Typography>
            <Typography style={{fontSize:"1.1rem", whiteSpace:"nowrap", color:"grey"}}>
            Enter your username and password
            </Typography>
           </div>
            <form
        onSubmit={(e) => {
          e.preventDefault(); // Prevent default form submission
          handleSubmit(); // Submit the form
        }}
      >
            <Grid container sx={Style.grid2}>
            <Grid container>
                <CssTextField
                  fullWidth
                  size="small"
                  placeholder="Email*"
                  name="email"
                  id="email"
                  autoComplete="false"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  sx={{ backgroundColor: "white", margin:"10px 0" }}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <BiSolidUser style={{fontSize:"1.6rem"}}/>
                       </InputAdornment>
                    ),
                  }}
                />
                {touched.email && errors.email && (
                  <Typography
                    style={{ marginBottom: 0, color: Colors.secondary }}
                    className="form-error"
                  >
                    {errors.email}
                  </Typography>
                )}
              </Grid>
              <Grid container>
                <CssTextField
                  fullWidth
                  size="small"
                  type={showPass ? "text" : "password"}
                  placeholder="Password*"
                  name="password"
                  id="password"
                  autoComplete="false"
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                sx={{ backgroundColor: "white", margin:"10px 0" }}
                InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <FaUnlockKeyhole style={{fontSize:"1.5rem"}}/>
                       </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="start" onClick={handleShowPass}>
                            <IconButton
                             aria-label="toggle password visibility"
                             onClick={handleShowPass}
                             
                             edge="end"
                             style={{ zIndex: 1 }}
                             >
                            {showPass ? <Visibility style={{fontSize:"1.6rem"}}/> : <VisibilityOff style={{fontSize:"1.6rem"}}/>}
                            </IconButton>
                         </InputAdornment>
                      ),
                  }}
                />
                {touched.password && errors.password && (
                  <Typography
                    style={{ marginBottom: 0, color: Colors.secondary }}
                    className="form-error"
                  >
                    {errors.password}
                  </Typography>
                )}
              </Grid>
              <Button
            type="submit"
            fullWidth
            sx={Style.button}
          >
            <Typography style={{ fontSize: "1.2rem",  fontWeight:""}}>Login</Typography>
          </Button>
            </Grid>
      </form>
        </Paper>
        </Grid>
            </Grid>
        </Grid>
    )
}

export default Login
import React from "react";
import Colors from "../../Assets/Colors";

export const Style = {
  grid: {
    // backgroundColor: Colors.primary,
    display: {xs: "none", sm:"none", md:"flex", lg:"flex"},
    background:
               "linear-gradient(to bottom,  #007190, white)",
  },

  grid1: {
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    minHeight: "100vh",
    backgroundColor: "",
  },

  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "white",
    borderRadius: "10px",
    border: "2px solid #f5c62c",
  },
  grid2: { maxWidth: "30rem", display: "flex", justifyContent: "center" },

  button: {
    backgroundColor: Colors.primary,
    color: "white",
    margin: "15px 0px",
    padding: "10px 60px",
    "&:hover": {
      border: "1px solid #007190",
      backgroundColor: "white",
      color: "black",
    },
  },
};

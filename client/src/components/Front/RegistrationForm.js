import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Button, Form } from "react-bootstrap";

import { Avatar, IconButton, TextField } from "@mui/material";
import LoaderView from "../utils.js/loaderView";

const MyForm = () => {
  const Formik = useFormik({
    initialValues: {
      firstname: "",
      lastname: "",
      username: "",
      email: "",
      password: "",
      comfirmpass: "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      firstname: Yup.string().required("field required"),
      lastname: Yup.string().required("field required"),
      username: Yup.number()
        .required("field required")
        .integer("invalid input"),
      password: Yup.string().required("field required"),
      email: Yup.string().required("field required").email("email invalid!"),
      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {},
  });

  return (
    <div>
      <form onSubmit={Formik.handleSubmit}>
        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0", color: "red" }}
          name="firstname"
          label="firstname"
          {...Formik.getFieldHelpers("firstname")}
          value={Formik.values.firstname}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.firstname && Boolean(Formik.errors.firstname)}
          helperText={Formik.touched.firstname && Formik.errors.firstname}
        ></TextField>

        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0" }}
          name="lastname"
          value={Formik.values.lastname}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.lastname && Boolean(Formik.errors.lastname)}
          helperText={Formik.touched.lastname && Formik.errors.lastname}
          {...Formik.getFieldHelpers("lastname")}
          label="Lastname"
        ></TextField>
        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0" }}
          name="username"
          value={Formik.values.username}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.age && Boolean(Formik.errors.username)}
          helperText={Formik.touched.username && Formik.errors.username}
          {...Formik.getFieldHelpers("username")}
          label="Username"
        ></TextField>
        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0" }}
          name="email"
          value={Formik.values.email}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.email && Boolean(Formik.errors.email)}
          helperText={Formik.touched.email && Formik.errors.email}
          {...Formik.getFieldHelpers("email")}
          label="Email"
        ></TextField>

        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0" }}
          name="password"
          value={Formik.values.password}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.password && Boolean(Formik.errors.password)}
          helperText={Formik.touched.password && Formik.errors.password}
          {...Formik.getFieldHelpers("password")}
          label="Password"
        ></TextField>
        
        <TextField
          variant="standard"
          style={{ margin: "10px 10px 10px 0" }}
          name="comfirmpass"
          value={Formik.values.comfirmpass}
          onChange={Formik.handleChange}
          onBlur={Formik.handleBlur}
          error={Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)}
          helperText={Formik.touched.comfirmpass && Formik.errors.comfirmpass}
          {...Formik.getFieldHelpers("comfirmpass")}
          label="comfirmpass"
        ></TextField>

        <div>
          <p
            style={{
              width: "100%",
              paddingLeft: "10px",
              fontFamily: "lato",
              fontSize: "15px",
              fontWeight: "bold",
              marginTop: "30px",
            }}
          >
            Personal Profile
          </p>
        </div>
          <Button type="submit" style={{ marginBottom: "50px", width: "25%" }}>
            Save
          </Button>
    
      </form>
    </div>
  );
};

export default MyForm;

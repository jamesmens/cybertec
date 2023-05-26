import React from "react";

import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import {useFormik} from "formik"
import * as Yup from "yup";
import { TextField } from "@mui/material";

const Resetpasspage = () => {
  const [searchParams] = useSearchParams();
  const token = searchParams.get("t");
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.Notification);
  const userDetail = useSelector((state) => state.Users);

  const Formik = useFormik({
    initialValues: {
    _id: `${token ? `${token}` :""}`,
    password: "",
    comfirmpass:""
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      password: Yup.string().required("field required"),

      comfirmpass: Yup.string().required("comfirm password"),
    }),
    onSubmit: (value) => {},
  });

  return (
    <div>
      <form onSubmit={Formik.handleSubmit}>
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
          error={
            Formik.touched.comfirmpass && Boolean(Formik.errors.comfirmpass)
          }
          helperText={Formik.touched.comfirmpass && Formik.errors.comfirmpass}
          {...Formik.getFieldHelpers("comfirmpass")}
          label="comfirmpass"
        ></TextField>

        <Button type="submit" style={{ marginBottom: "50px", width: "25%" }}>
          Save
        </Button>
      </form>
    </div>
  );
};

export default Resetpasspage;

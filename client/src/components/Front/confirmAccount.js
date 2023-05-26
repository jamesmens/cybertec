import React from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";


const ConfirmAccount = () => {
const [searchParams] = useSearchParams();
const token = searchParams.get("t");
const dispatch = useDispatch();

  return (
    <div>
      <p>
        please click on{" "}
        <span style={{ fontFamily: "Tapestry", color: "blue" }}>Verify me</span>{" "}
        to complete process
      </p>
      <Button
        style={{ width: "100%" }}
        onClick={() => {
         
        }}
      >
        Verify me
      </Button>
    </div>
  );
};

export default ConfirmAccount;

import React, { useRef } from "react";
import certificate from "../cert_templates/Volunteer Certificate.png";
import {
  exportComponentAsJPEG,
  exportComponentAsPNG,
} from "react-component-export-image";
import { Button } from "@mui/material";
const CertificateGenerator = React.forwardRef(
  ({ name, heading, desc, qr, org, hours, issuedate }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          height: "509",
          width: "720",
          position: "absolute",
          top: "20%",
          border: "1px solid gray",
        }}
        id="certificate"
      >
        <img
          src={certificate}
          style={{ height: 509, width: "720" }}
          alt="certificate"
        />
        <div
          className="info"
          style={{ position: "absolute", top: "0%", left: "45%", width: "60%" }}
        >
          <p
            style={{
              fontSize: 52,
              fontWeight: "900",
              textTransform: "uppercase",
              color: "#f68712",
            }}
          >
            {heading}
          </p>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "500",
              color: "#000000",
              textTransform: "uppercase",
              textAlign: "center",
              marginRight: "50px",
              marginTop: "-50px",
            }}
          >
            {"this certificate presented to :"}
          </p>
          <h1
            style={{
              fontSize: "3rem",
              color: "#f68712",
              textAlign: "right",
              marginRight: "6rem",
              marginTop: "-30px",
            }}
          >
            {name}
          </h1>
          <p
            style={{
              fontSize: "15px",
              fontWeight: "600",
              color: "#000000",
              textAlign: "right",
              marginTop: "-37px",
              marginRight: "60px",
            }}
          >
            {desc + "of "}
            <span
              style={{ fontSize: "15px", fontWeight: "bold", color: "#0300b0" }}
            >
              {hours + " "}
            </span>
            {"to "}
            <span
              style={{ fontSize: "15px", fontWeight: "bold", color: "#0300b0" }}
            >
              {org}
            </span>
          </p>
        </div>
        <div
          style={{
            position: "absolute",
            top: "68%",
            left: "75%",
            width: "60%",
          }}
        >
          <img
            src={qr}
            height={100}
            width={100}
            style={{ zIndex: 10 }}
            alt="QR code"
          />
        </div>
        <div
          className="info"
          style={{
            position: "absolute",
            top: "90%",
            left: "78%",
            width: "60%",
          }}
        >
          <p
            style={{
              fontSize: "12px",
              fontWeight: "100",
              color: "#000000",
              marginBottom: "1rem",
            }}
          >
            {issuedate.getDate() +
              "-" +
              (issuedate.getMonth() + 1) +
              "-" +
              issuedate.getFullYear()}
          </p>
        </div>
      </div>
    );
  }
);

const CertGenButton = () => {
  const style = {
    backgroundColor: "#f68712",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    position: "absolute",
    bottom: "0",
    right: "50%",
  };
  const style1 = {
    backgroundColor: "#f68712",
    color: "#fff",
    borderRadius: "5px",
    padding: "10px 20px",
    fontSize: "16px",
    fontWeight: "600",
    cursor: "pointer",
    position: "absolute",
    bottom: "0",
    left: "55%",
  };
  const name =
    localStorage.getItem("name").charAt(0).toUpperCase() +
    localStorage.getItem("name").slice(1);
  const heading = "Volunteer Certificate";
  const desc =
    "In recognition of outstanding and professional Volunteer Service ";
  const org = "Yasham Foundation";
  const issuedate = new Date();
  const qr =
    "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=EastWind4.github.io";
  const hours = localStorage.getItem("hours");
  const componentRef = useRef();
  return (
    <div>
      <Button
        color="inherit"
        onClick={() => {
          console.log(componentRef.current);
          exportComponentAsJPEG(componentRef);
        }}
        sx={style}
      >
        Export As JPEG
      </Button>
      <Button
        color="inherit"
        onClick={() => exportComponentAsPNG(componentRef)}
        sx={style1}
      >
        Export As PNG
      </Button>
      <div
        style={{
          flex: 0.6,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CertificateGenerator
          ref={componentRef}
          name={name}
          heading={heading}
          desc={desc}
          qr={qr}
          org={org}
          hours={hours}
          issuedate={issuedate}
        />
      </div>
    </div>
  );
};

export default CertGenButton;

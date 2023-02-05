import { useState, useEffect, useRef, React } from "react";
import Button from "@mui/material/Button";
import StudentDisplay from "../components/StudentDisplay";
import * as XLSX from "xlsx";
import axios from "axios";

const renderStudentData = (studentData) => {
  if (studentData) {
    return (
      <StudentDisplay
        studentData={studentData}
        headers={Object.keys(studentData[0])}
      />
    );
  } else {
    return <div></div>;
  }
};

const SheetReader = ({ username, submit }) => {
  const [sheetData, setSheetData] = useState(null);
  const [buttonLabel, setbuttonLabel] = useState("Upload Excel");
  const [file, setFile] = useState(null);
  const hiddenFileInput = useRef(null);
  const [rows, setRows] = useState([]);

  var tempf = null;
  useEffect(() => {}, [file]);
  const readExcel = (filex, setSheetData) => {
    if (filex) {
      let fileReader = new FileReader();
      fileReader.readAsBinaryString(filex);
      fileReader.onload = async (event) => {
        let data = event.target.result;
        let workbook = XLSX.read(data, { type: "binary" });
        let sheetName = workbook.SheetNames[0];
        let sheet = workbook.Sheets[sheetName];
        let rowObjects = XLSX.utils.sheet_to_row_object_array(sheet);
        exportData(rowObjects);
        submit(rowObjects);
        setSheetData(rowObjects);
      };
    }
  };

  const exportData = (sheetData) => {
    let date = new Date();
    let fileData = {
      sheetData: sheetData,
      filename: username + "_" + date.toLocaleString().slice(0, -2),
    };
    let jsonMap = JSON.stringify(fileData);
  };

  const renderStudentData = (studentData) => {
    if (studentData) {
      return (
        <StudentDisplay
          studentData={studentData}
          headers={Object.keys(studentData[0])}
        />
      );
    } else {
      return <div></div>;
    }
  };

  const handleChange = (event) => {
    tempf = event.target.files[0];
    readExcel(event.target.files[0], setSheetData);
    setFile(tempf);
    if (file) {
      setbuttonLabel(file["name"]);
    } else {
      setbuttonLabel("Upload Excel");
    }
  };

  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };

  return (
    <div>
      <Button
        variant="contained"
        sx={{
          color: "inherit",
          backgroundColor: "inherit",
          display: "block",
        }}
        onClick={handleClick}
      >
        Upload
        {/* {buttonLabel} */}
      </Button>
      <input
        type="file"
        onClick={submit}
        onChange={handleChange}
        style={{ display: "none" }}
        ref={hiddenFileInput}
      />
    </div>
  );
};

export default SheetReader;

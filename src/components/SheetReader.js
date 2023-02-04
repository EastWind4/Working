import { useState, useEffect, useRef, React } from "react";
import Button from '@mui/material/Button';
import StudentDisplay from "../components/StudentDisplay";
import * as XLSX from 'xlsx';

const readExcel = (filex, setSheetData) => {
    console.log(filex);
    
    if(filex) {
        let fileReader = new FileReader();
        fileReader.readAsBinaryString(filex);
        fileReader.onload = async (event) => {
            
            let data = event.target.result;
            let workbook = XLSX.read(data, {type:'binary'});
            console.log(workbook); 

            let sheetName = workbook.SheetNames[0];
            let sheet = workbook.Sheets[sheetName];
            console.log(sheet);

            let rowObjects = XLSX.utils.sheet_to_row_object_array(sheet);
            // rowObjects = Map(JSON.parse(rowObjects))
            console.log(rowObjects);

            setSheetData(rowObjects);
        }
    }
}

const renderStudentData = (studentData) => {
    if(studentData) {
        console.log(studentData);
        // let data = JSON.parse(studentData);
        // console.log(data);
        return <StudentDisplay studentData={studentData} headers={Object.keys(studentData[0])}/>
    }
    else {
        return <div></div>
    }
}

const SheetReader = () => {

    const [sheetData, setSheetData] = useState(null);
    const [buttonLabel, setbuttonLabel] = useState("Upload Excel");
    const [file, setFile] = useState(null);
    const hiddenFileInput = useRef(null);
    var tempf = null;

    useEffect(() => {}, [file]);

    //TODO: Fix SetState
    const handleChange = (event) => {
        tempf = event.target.files[0];
        console.log(tempf);
        readExcel(event.target.files[0], setSheetData);
        setFile(tempf);
        if(file) {
            setbuttonLabel(file['name']);
        }
        else {
            setbuttonLabel("Upload Excel");
        }
    }

    const handleClick = (event) => {
        hiddenFileInput.current.click();
    }

    return (
        <div>
            <Button variant="contained" onClick={handleClick}>{buttonLabel}</Button>
            <input type="file" onChange={handleChange} style={{display: 'none'}}
                ref={hiddenFileInput}
            />
            {/* {renderStudentData(sheetData)} */}
        </div>
    );
}

export default SheetReader;
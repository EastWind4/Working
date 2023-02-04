import { useState, useEffect, useRef, React } from "react";
import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import { width } from "@mui/system";

const StudentDisplay = ({studentData, headers}) => {
    let i = 0;
    let rows = studentData.map(
        (entry) => {
            entry['id'] = i;
            console.log(entry);
            i+=1;
            return entry;
        }
    )

    //TODO: Make Column width Dynamic
    let columns = headers.map(
        (h) => {
            return {
                'field': h,
                'headerName': h,
                'width': '150'
            };
        }
    )
    // [
    //     { field: 'id', headerName: 'ID', width: 70 },
    // ]

    console.log(headers);

    return (
        <div style={{height: '500px',width: '70%'}} >
            <DataGrid
                rows={rows}
                key = {rows.id}
                columns={columns}
                pageSize={5}
                rowsPerPageOptions={[5]}
                checkboxSelection
            />
        </div>
    )
}

export default StudentDisplay;
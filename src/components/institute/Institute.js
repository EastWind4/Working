import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';
import {
    Avatar,
    Card,
    CardContent,
    LinearProgress,
    Button,
  } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import DeleteIcon from "@mui/icons-material/Delete";
import Grid from "@mui/material/Grid";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import PeopleIcon from "@mui/icons-material/PeopleOutlined";
import FileDownloadIcon from "@mui/icons-material/FileDownload";
import ArrowDownwardIcon from "@mui/icons-material/ArrowDownward";
import MoneyIcon from "@mui/icons-material/Money";
import InsertChartIcon from "@mui/icons-material/InsertChartOutlined";
import DescriptionIcon from "@mui/icons-material/Description";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import * as XLSX from "xlsx";
import SheetReader from "../SheetReader";
import Dashboard from "../Dashboard";



function Institute() {
    const [institute, setInstitute] = React.useState("");

  const [rows, setRows] = React.useState([]);
    const handleDownload = async (row) => {
        var wb = XLSX.utils.book_new();
    
        var sheet = XLSX.utils.json_to_sheet(row.sheetData);
        XLSX.utils.book_append_sheet(wb, sheet, "Sheet1");
        XLSX.writeFile(wb, row.fileName);
        console.log(sheet);
      };
      const handleDelete = async (row) => {
        setRows(rows.filter((r) => r._id !== row._id));
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/excel/insti/delete/",
          {
            id: row._id,
          }
        );
        console.log(response);
      };

      const handleUpload = async (sheetData) => {
        const naam = localStorage.getItem('name')
          const response = await axios.post(
            process.env.REACT_APP_API_URL + "/excel/insti/create/",
            {
              name: naam,
              sheetData,
              to: "ADMIN",
              filename:naam+ "_"+new Date()
            }
          );
          console.log(response.data);
      };

      const fetchData = async () => {
        const email = localStorage.getItem("email")
        const response = await axios.post(
          process.env.REACT_APP_API_URL + "/excel/insti/all/in/",{to:"INSTITUTION", email}
        );
        let arr = [];
        for (let i = 0; i < response.data.excel.length; i++) {
          arr.push(response.data.excel[i]);
        }
        setRows(arr);
      };


React.useEffect(()=>{
    fetchData();
},[])

  return (
    <div>

<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
  sx={{marginTop:'30px',padding:'20px'}}
  spacing={3}
>
    <Grid item>
     <TableContainer component={Paper} elevation={3}>
          <Table sx={{ maxWidth: 400, minWidth:400}} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>
                  File Name - Admin
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Download
                </TableCell>
                <TableCell align="right" sx={{ fontWeight: "bold" }}>
                  Delete
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <TableRow
                  key={row._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell component="th" scope="row">
                    {row.fileName}
                  </TableCell>
                  <TableCell align="right">
                    {
                      <Button
                        color="inherit"
                        onClick={() => {
                          handleDownload(row);
                        }}
                      >
                        <FileDownloadIcon />
                      </Button>
                    }
                  </TableCell>
                  <TableCell align="right">
                    {
                      <Button
                        color="inherit"
                        onClick={() => {
                          handleDelete(row);
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    }
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        </Grid>
        <Grid item>
        <Card>
          <CardContent>
            <Grid
              container
              spacing={3}
              sx={{ justifyContent: "space-between", minWidth: 345 }}
            >
              <Grid item>
                <Typography
                  color="textSecondary"
                  gutterBottom
                  variant="overline"
                  sx={{ fontWeight: "bold" }}
                >
                  UPLOAD EXCEL
                </Typography>
                <Typography
                  color="textPrimary"
                  // variant="h4"
                  sx={{ fontWeight: "bold" }}
                >
                  Send to admin
                </Typography>
              </Grid>
              <Grid item>
                <Avatar
                  sx={{
                    backgroundColor: "success.main",
                    height: 56,
                    width: 56,
                  }}
                >
                  <DescriptionIcon />
                </Avatar>
              
              </Grid>
            </Grid>
            <br />
                <SheetReader submit={handleUpload} />
            </CardContent>
            </Card>
        </Grid>
        </Grid>
    </div>
  )
}

export default Institute
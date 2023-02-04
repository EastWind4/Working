import React, { useEffect } from 'react'
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DeleteIcon from '@mui/icons-material/Delete';
import Grid from '@mui/material/Grid';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import PeopleIcon from '@mui/icons-material/PeopleOutlined';
import { Avatar, Box, Card, CardContent, Typography,LinearProgress, Button } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import MoneyIcon from '@mui/icons-material/Money';
import InsertChartIcon from '@mui/icons-material/InsertChartOutlined';
import DescriptionIcon from '@mui/icons-material/Description';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from 'axios';
import * as XLSX from 'xlsx';


function Admin() {

    const [institute, setInstitute] = React.useState('');

    const [rows, setRows] = React.useState([])
const fetchData = async () => {
    const response = await axios.get(process.env.REACT_APP_API_URL+"/excel/vol/all/");
    let arr = [];
    for(let i = 0; i < response.data.excel.length; i++){
        arr.push(response.data.excel[i])
    }
    setRows(arr);
}

const handleDelete = async (row) => {
    setRows(rows.filter((r)=>r._id!==row._id))
    const response = await axios.post(process.env.REACT_APP_API_URL+"/excel/vol/delete/",{
        id:row._id
    });
    console.log(response)
}

const handleDownload = async(row) => {
    var sheet = XLSX.utils.aoa_to_sheet(row.sheetData)
    console.log(sheet)
}

React.useEffect(()=> {
    fetchData();
},[])

  const handleChange = (event) => {
    setInstitute(event.target.value);
  };

  return (

<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
  sx={{marginTop:'20px',marginLeft:'20px',marginBottom:'20px'}}
  spacing={3}
>
    <Grid item>
    <TableContainer component={Paper} elevation={3}>
      <Table sx={{ maxWidth: 400 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{fontWeight:'bold'}}>File Name</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Download</TableCell>
            <TableCell align="right" sx={{fontWeight:'bold'}}>Delete</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row._id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.fileName}
              </TableCell>
              <TableCell align="right">{<Button color="inherit" onClick={()=>{handleDownload(row)}}><FileDownloadIcon /></Button>}</TableCell>
              <TableCell align="right">{<Button color="inherit" onClick={()=>{handleDelete(row)}}><DeleteIcon /></Button>}</TableCell>
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
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TOTAL VOLUNTEERS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            1,6k
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <PeopleIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <ArrowUpwardIcon color="success" />
        <Typography
          variant="body2"
          sx={{
            mr: 1
          }}
        >
          16%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
    </Grid>
    <Grid item>
    <Card
    sx={{ height: '100%' }}
  
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
             NO OF INSTITUTES
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            50
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'error.main',
              height: 56,
              width: 56
            }}
          >
            <MoneyIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          pt: 2,
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <ArrowDownwardIcon color="error" />
        <Typography
          color="error"
          sx={{
            mr: 1
          }}
          variant="body2"
        >
          12%
        </Typography>
        <Typography
          color="textSecondary"
          variant="caption"
        >
          Since last month
        </Typography>
      </Box>
    </CardContent>
  </Card>
    </Grid>
    <Grid item>
    <Card
    sx={{ height: '100%'}}
    
  >
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between' }}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            TASKS PROGRESS
          </Typography>
          <Typography
            color="textPrimary"
            variant="h4"
          >
            75.5%
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'warning.main',
              height: 56,
              width: 56
            }}
            
          >
            <InsertChartIcon/>
          </Avatar>
        </Grid>
      </Grid>
      <Box sx={{ pt: 3 }}>
        <LinearProgress
          value={75.5}
          variant="determinate"
          color="inherit"
        />
      </Box>
    </CardContent>
  </Card>
    </Grid>
    <Grid item>
    <Card>
    <CardContent>
      <Grid
        container
        spacing={3}
        sx={{ justifyContent: 'space-between', minWidth:345}}
      >
        <Grid item>
          <Typography
            color="textSecondary"
            gutterBottom
            variant="overline"
          >
            UPLOAD EXCEL
          </Typography>
          <Typography
            color="textPrimary"
            // variant="h4"
          >
            Choose institute
          </Typography>
        </Grid>
        <Grid item>
          <Avatar
            sx={{
              backgroundColor: 'success.main',
              height: 56,
              width: 56
            }}
          >
            <DescriptionIcon />
          </Avatar>
        </Grid>
      </Grid>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          pt: 2
        }}
      >
        <FormControl variant="filled" sx={{ m: 1, minWidth: 130 }}>
        {/* <InputLabel id="demo-simple-select-filled-label">Age</InputLabel> */}
        <Select
          labelId="demo-simple-select-filled-label"
          id="demo-simple-select-filled"
          value={institute}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={10}>G D Somani</MenuItem>
          <MenuItem value={20}>Pace</MenuItem>
          <MenuItem value={30}>Allen</MenuItem>
        </Select>
      </FormControl>
      </Box>
    </CardContent>
  </Card>
    </Grid>
    </Grid>
  )
}

export default Admin

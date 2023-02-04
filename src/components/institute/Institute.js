import React from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Typography } from '@mui/material';

function Institute() {
  return (
    <div>
         <Box
      component="form"
      sx={{
        '& .MuiTextField-root': { m: 1, width: '25ch' },
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        marginTop:'50px'
      }}
      noValidate
      autoComplete="off"
    >
      <div>
        <Typography sx={{marginBottom:'20px'}}>
            Create an event
        </Typography>
        <TextField
          required
          id="filled-required"
          label="Required"
          defaultValue="Hello World"
          
        />
          </div>
    </Box>
    </div>
  )
}

export default Institute
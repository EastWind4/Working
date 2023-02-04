import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import coin from './coin.png';
import CardRequest from './CardRequest';



function Profile() {
  return (
    
<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="flex-start"
  spacing={3}
  sx={{marginLeft:"10px", marginRight:"10px", marginY:"10px"}}
>
  <Grid item>
  <Card elevation={3} 
  sx={{minWidth: 1000}}>
  <CardHeader
        avatar={
          <Avatar src="/broken-image.jpg">
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Sakshi Pandey"
        subheader="Volunteer"
      />
      <CardMedia
        component="img"
        height="194"
        image={"https://t3.ftcdn.net/jpg/03/38/48/62/360_F_338486227_qQitUvh3nILqYiuQOUGxdfindoNMbtpH.jpg"}
        alt="background image"
      />
  </Card>
  </Grid>
  <Grid item>
    <Card elevation={3}>
    <CardHeader
        title="Number of Hours"
        subheader="20"
       avatar={
        <Avatar src={coin}>
          </Avatar>
       } 
      />
    </Card>
  </Grid>
  <Grid item>
    <Typography>Status</Typography>
    <br />
    <CardRequest eventTitle={"Teaching assistant"} isRejected={false} creatorEmail={'yashbrahmbhatt'} />
  </Grid>
  <br />
</Grid>
  )
}

export default Profile
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
import { Grid } from '@mui/material';
import EventsCard from './eventsCard';

export default function Event() {

  return (

<Grid
  container
  direction="row"
  justifyContent="flex-start"
  alignItems="center"
  spacing={3}
  sx={{marginLeft:"10px", marginRight:"10px", marginY:"10px"}}
>
    <Grid item>
    <EventsCard title="Heyylloo" content="This is content" date="4th Feb 2023"/>
    </Grid>
    </Grid>
  );
}
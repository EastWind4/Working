import React from 'react';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardActions from '@mui/material/CardActions';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';

function CardRequest({eventTitle, creatorEmail, isRejected}) {
  return (
   <>
   <Card sx={{ minWidth: 275, backgroundColor:'#d18214'}} elevation={3}>
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {creatorEmail}
        </Typography>
        <Typography sx={{ mb: 1.5, fontWeight:'bold'}} color="text.secondary">
          {eventTitle}
        </Typography>
        <Typography variant="body2">
          Pending
          <br />
        </Typography>
      </CardContent>
    </Card>
   </>
  )
}

export default CardRequest
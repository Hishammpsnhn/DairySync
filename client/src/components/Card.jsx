import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import milk from '../assets/milk-bottle.png';

export default function ProductCard() {
  return (
    <Card sx={{ maxWidth: 345, bgcolor: 'darkslategrey' }}>
      <CardMedia
        sx={{ height: 200, backgroundSize: 'contain' }}
        image={milk}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Lizard
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Share</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}

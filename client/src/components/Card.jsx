import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import milk from '../assets/milk.png';

export default function ProductCard({name,image}) {
  return (
    <Card  sx={{ maxWidth: 345, bgcolor: 'transparent',cursor:'pointer' }}>
      <CardMedia
        sx={{ height: 200, backgroundSize: 'contain' }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h4" component="div" textTransform="capitalize">
          {name}
        </Typography>
      </CardContent>
    </Card>
  );
}

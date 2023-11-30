import {
  Avatar,
  Card,
  CardContent,
  CardMedia,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { groceryItems } from '../../utils/Data'
import milk from '../../assets/milk.png'
import butter from '../../assets/Butter.webp'
import ghee from '../../assets/ghee.jpg'
import paneer from '../../assets/how-to-make-paneer-1.jpg'

export default function ProductPage() {
  const { productname } = useParams()

  const selectedGroceryItem = groceryItems.find(
    (item) => item.category.toLowerCase() === productname.toLowerCase()
  )

  const imageMappings = {
    milk: milk,
    butter: butter,
    ghee: ghee,
    paneer: paneer,
  }

  // Get the corresponding image for the product name
  const image = imageMappings[productname.toLowerCase()];
  
  return (
    <Stack direction="row">
      {/* column 1 */}
      <Card sx={{ width: '50%', bgcolor: 'transparent' }}>
        <CardContent>
          <Typography
            gutterBottom
            variant="h1"
            component="div"
            textTransform="uppercase"
          >
            {selectedGroceryItem.category}
          </Typography>
        </CardContent>
        <CardMedia
          sx={{ height: 300, width: 400, backgroundSize: 'contain' }}
          image={image}
          title="green iguana"
        />
        {selectedGroceryItem.types.map(({ description, type }, index) => (
          <AlignItemsList key={index} desc={description} type={type} />
        ))}
      </Card>
      {/* column 2 */}
      
    </Stack>
  )
}

function AlignItemsList({ type, desc }) {
  return (
    <List sx={{ width: '100%' }}>
      <ListItem alignItems="flex-start">
        <ListItemText
          primary={type}
          secondary={<React.Fragment>{desc}</React.Fragment>}
        />
      </ListItem>
      <Divider variant="middle" component="li" />
    </List>
  )
}

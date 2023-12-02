import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  FormControlLabel,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Radio,
  RadioGroup,
  Stack,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { groceryItems } from '../../utils/Data'
import milk from '../../assets/milk.png'
import butter from '../../assets/Butter.webp'
import ghee from '../../assets/ghee.jpg'
import paneer from '../../assets/how-to-make-paneer-1.jpg'
import Box from '@mui/material/Box'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import { useTheme } from '@emotion/react'
import { tokens } from '../../theme'

export default function ProductPage() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const { productname } = useParams()

  const [formData, setFormData] = useState({
    milkType: '',
    quantity: '',
    paymentMethod: 'COD',
    address: '', // New field for address
  })

  const handleChange = (event) => {
    const { name, value } = event.target
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePrint = () => {
    console.log('Milk Type:', formData)
  }

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
  const image = imageMappings[productname.toLowerCase()]

  return (
    <Stack direction="row" bgcolor={colors.primary[400]} margin="10px" borderRadius="5px">
      {/* column 1 */}
      <Box sx={{ width: '50%' }}>
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
      </Box>
      {/* column 2 */}
      <Box sx={{ width: '50%' }} padding="20px">
        <FormControl fullWidth>
          {selectedGroceryItem.types.length > 0 && (
            <>
              <InputLabel id="milk-type-label">
                {selectedGroceryItem.category}
              </InputLabel>
              <Select
                labelId="milk-type-label"
                id="milk-type-select"
                name="milkType"
                value={formData.milkType}
                label="Milk Type"
                onChange={handleChange}
              >
                {selectedGroceryItem.types.map(({ type }, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </>
          )}

          <TextField
            margin="normal"
            fullWidth
            required
            name="quantity"
            id="quantity"
            type="number"
            label="Quantity/L"
            onChange={handleChange}
            value={formData.quantity}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="address"
            id="address"
            label="Address"
            onChange={handleChange}
            value={formData.address}
          />
          <Typography variant="h6" marginTop="20px">
            Payment Method
          </Typography>
          <RadioGroup
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
          >
            <FormControlLabel value="COD" control={<Radio />} label="COD" />
            <FormControlLabel
              value="Online Payment"
              control={<Radio />}
              label="Online Payment"
            />
          </RadioGroup>
          <Button
            sx={{ marginTop: '20px' }}
            variant="contained"
            color="primary"
            onClick={handlePrint}
          >
            BUY
          </Button>
        </FormControl>
      </Box>
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

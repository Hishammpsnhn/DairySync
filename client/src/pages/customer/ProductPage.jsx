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
import React, { useEffect, useState } from 'react'
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
import { DemoContainer } from '@mui/x-date-pickers/internals/demo'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { findProductSellers } from '../../actions/productAction'
import { useDispatch } from 'react-redux'

export default function ProductPage() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
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
  const image = imageMappings[productname.toLowerCase()]

  const [formData, setFormData] = useState({
    Type: '',
    quantity: '',
    paymentMethod: 'COD',
    address: '',
    bookingDate: null, // New field for booking date
    sellerId: '',
  })

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

 
  const handlePrint = () => {
    console.log('Milk Type:', formData)
  }

  useEffect(() => {
    if (selectedGroceryItem.category !== 'Milk' && formData.Type) {
      dispatch(findProductSellers(formData.Type))
    } 
  }, [selectedGroceryItem.category, formData.Type,dispatch])
  
  return (
    <Stack
      direction="row"
      bgcolor={colors.primary[400]}
      margin="10px"
      borderRadius="5px"
    >
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
        {selectedGroceryItem.category === 'Milk' ? (
          <Typography variant="h3" sx={{ marginBottom: '10px' }}>
            Booking Only
          </Typography>
        ) : (
          <Typography variant="h3" sx={{ marginBottom: '10px' }}>
            Purchase Details
          </Typography>
        )}
        <FormControl fullWidth>
          {selectedGroceryItem.types.length > 0 ? (
            <>
              <FormControl>
                <InputLabel id="milk-type-label">
                  {selectedGroceryItem.category}
                </InputLabel>
                <Select
                  labelId="milk-type-label"
                  id="milk-type-select"
                  name="Type"
                  value={formData.Type}
                  label="Milk Type"
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                >
                  {selectedGroceryItem.types.map(({ type }, index) => (
                    <MenuItem key={index} value={type}>
                      {type}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </>
          ) : (
            <FormControl>
              <InputLabel id="milk-type-label">
                Select Available Seller
              </InputLabel>
              <Select
                name="sellerId"
                value={formData.sellerId}
                label="seller Name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {/* {selectedGroceryItem.types.map(({ type }, index) => (
                  <MenuItem key={index} value={type}>
                    {type}
                  </MenuItem>
                ))} */}
              </Select>
            </FormControl>
          )}
          {formData.Type && selectedGroceryItem.category !== 'Milk' && (
            <FormControl sx={{ marginTop: '15px' }}>
              <InputLabel id="milk-type-label">
                Select Available Seller
              </InputLabel>
              <Select
                name="sellerId"
                value={formData.sellerId}
                label="seller Name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {/* {selectedGroceryItem.types.map(({ type }, index) => (
                     <MenuItem key={index} value={type}>
                       {type}
                     </MenuItem>
                   ))} */}
              </Select>
            </FormControl>
          )}
          <TextField
            margin="normal"
            required
            disabled={selectedGroceryItem.category !== 'Milk'}
            name="quantity"
            id="quantity"
            fullWidth
            type="number"
            label="Quantity/L/KG"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.quantity}
          />
          <TextField
            margin="normal"
            fullWidth
            required
            name="address"
            id="address"
            label="Address"
            onChange={(e) => handleChange(e.target.name, e.target.value)}
            value={formData.address}
          />
          {selectedGroceryItem.category === 'Milk' && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={['DatePicker']}>
                <DatePicker
                  label="Booking Date"
                  value={formData.bookingDate}
                  onChange={(newDate) => handleChange('bookingDate', newDate)}
                  renderInput={(params) => <TextField {...params} />}
                />
              </DemoContainer>
            </LocalizationProvider>
          )}
          <Typography variant="h6" marginTop="20px">
            Payment Method
          </Typography>
          <RadioGroup
            name="paymentMethod"
            value={formData.paymentMethod}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
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

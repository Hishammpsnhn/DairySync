import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
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
import {
  findProductSellers,
  productPurchase,
} from '../../actions/productAction'
import { useDispatch } from 'react-redux'

const initialErrValues = {
  Type: false,
  quantity: false,
  paymentMethod: false,
  bookingDate: false, // New field for booking date
  sellerId: false,
}

export default function ProductPage() {
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const dispatch = useDispatch()
  const { productname } = useParams()
  const [sellers, setSellers] = useState([])
  const [loading, setLoading] = useState(false)
  const [sellerLoading, setSellerLoading] = useState(false)

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
    bookingDate: '', // New field for booking date
    sellerId: null,
  })
  const [formError, setFormError] = useState(initialErrValues)

  const handleChange = (name, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handlePrint = async () => {
    setLoading(true)
    if (formData.Type && formData.address && formData.quantity) {
      if (
        formData.Type === 'Rich' ||
        formData.Type === 'Toned' ||
        formData.Type === 'Smart' ||
        formData.Type === 'Skimmed'
      ) {
        if (formData.bookingDate) {
          await dispatch(productPurchase(formData))
          setLoading(true)
        } else {
          setFormError({
            bookingDate: !formData.bookingDate,
          })
        }
      } else {
        if (formData.sellerId !== null) {
          await dispatch(productPurchase(formData))
          setLoading(true)
        } else {
          setFormError({ sellerId: !formData.sellerId })
        }
      }
    } else {
      setFormError({
        Type: !formData.Type,
        address: !formData.address,
        quantity: !formData.quantity,
      })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      if (selectedGroceryItem.category !== 'Milk' && formData.Type) {
        try {
          setSellerLoading(true)
          const sellers = await dispatch(findProductSellers(formData.Type))
          setSellerLoading(false)
          setSellers(sellers)
        } catch (error) {
          console.error('Error fetching data:', error)
        }
      }
    }

    fetchData()
  }, [selectedGroceryItem.category, formData.Type, dispatch])

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
                  error={formError.Type}
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
                error={true}
                label="seller Name"
                onChange={(e) => handleChange(e.target.name, e.target.value)}
              >
                {sellers.map(({ seller, id }, index) => (
                  <MenuItem key={id} value={id}>
                    {seller}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          )}
          {formData.Type && selectedGroceryItem.category !== 'Milk' && (
            <FormControl sx={{ marginTop: '15px' }}>
              {sellerLoading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                <>
                  {sellers.length > 0 ? (
                    <>
                      <InputLabel id="milk-type-label">
                        Select Available Seller
                      </InputLabel>
                      <Select
                        name="sellerId"
                        value={formData.sellerId}
                        label="seller Name"
                        onChange={(e) =>
                          handleChange(e.target.name, e.target.value)
                        }
                      >
                        {sellers.map(({ seller, id }, index) => (
                          <MenuItem key={id} value={id}>
                            {seller}
                          </MenuItem>
                        ))}
                      </Select>
                    </>
                  ) : (
                    <>
                      <Typography variant="body2" color="red">
                        Currently not available
                      </Typography>
                    </>
                  )}
                </>
              )}
            </FormControl>
          )}

          <TextField
            margin="normal"
            required
            name="quantity"
            id="quantity"
            error={formError.quantity}
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
            error={formError.address}
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
                  renderInput={(params) => (
                    <TextField {...params} error={formError.bookingDate} />
                  )}
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
            {loading ? <CircularProgress size={24} color="inherit" /> : 'BUY'}
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

import React, { useEffect, useState } from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import Modal from '@mui/material/Modal'
import {
  Autocomplete,
  Button,
  Chip,
  CircularProgress,
  Grid,
  Stack,
  TextField,
} from '@mui/material'
import { secondDataCompletion } from '../utils/secondAutoCompletion'
import {
  addProduct,
  deleteSellerProduct,
  getproduct,
  getproductById,
  productPurchase,
} from '../actions/productAction'
import { useDispatch, useSelector } from 'react-redux'

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 2,
}

export default function BasicModal({
  open,
  setOpen,
  id,
  handleClose,
  addMilk,
  seller,
}) {
  const { products, loading, error } = useSelector((state) => state.addProduct)
  const user = useSelector((state) => state.user.user)
  const [formData, setFormData] = useState(initialValues)
  const [isProducts, setIsProucts] = useState([])
  const [formError, setFormError] = useState(initialErrValues)
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([])
  const dispatch = useDispatch()
console.log(products)
  useEffect(() => {
    const getProductFn = async () => {
      try {
        dispatch(getproductById(id))
      } catch (error) {
        console.error('Error fetching product:', error)
      }
    }

    if (user.role !== 'user') getProductFn()
  }, [dispatch, user, id])

  const handleDeleteSellerProduct = async (productId, userId) => {
    await dispatch(deleteSellerProduct(userId, productId))
    setIsProucts((prev) => {
      return prev.filter((product) => product._id !== id)
    })
    console.log(isProducts)
  }

  const handleFieldChange = (fieldName) => (event, newValue) => {
    const updatedValue = event
      ? event.target
        ? event.target.value
        : newValue
      : newValue
    if (fieldName === 'category' || fieldName === 'type') {
      setFormData({ ...formData, [fieldName]: newValue })
      if (newValue === 'Milk') {
        setSecondAutocompleteOptions(['Cattle', 'Buffaloes', 'Goat'])
      } else if (newValue === 'Ghee') {
        setSecondAutocompleteOptions(['Cow Ghee', 'Buffalo Ghee'])
      } else if (newValue === 'Butter') {
        setSecondAutocompleteOptions(['Salted Butter', 'Unsalted Butter'])
      } else if (newValue === 'Paneer') {
        setSecondAutocompleteOptions(['Regular Paneer', 'Smoked Paneer'])
      }
    } else {
      setFormData({ ...formData, [fieldName]: updatedValue })
    }
  }
  const handleFormSubmit = () => {
    if (addMilk) {
      if (formData.category && formData.quantity) {
        console.log(formData)
        formData.price = 
        dispatch(productPurchase(formData))
        setFormData(initialValues)
        handleClose()
      } else {
        setFormError({
          category: !formData.category,
          quantity: !formData.quantity,
        })
      }
    }
    if (
      formData.category &&
      formData.quantity &&
      formData.category === 'Milk' &&
      formData.quantity
        ? formData.animalId
        : formData.type
    ) {
      dispatch(addProduct(formData, id))
      setFormData(initialValues)
    } else {
      setFormError({
        category: !formData.category,
        quantity: !formData.quantity,
        type: !formData.type,
        animalId: !formData.animalId,
        quality: !formData.quality,
      })
    }
  }
  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={style}
          display="grid"
          gap="10px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          // sx={{
          //   '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          // }}
        >
          <Box sx={{ gridColumn: 'span 4' }}>
            {addMilk ? (
              <Header title="SELL MILK" />
            ) : (
              <Header
                title={`${
                  user.role === 'admin' ? 'ADD PRODUCT' : 'MY PRODUCTS'
                }`}
                subtitle={`ID : ${id}`}
              />
            )}
            <Grid
              container
              spacing={{ xs: 2, md: 2 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
            >
              {user.role !== 'user' &&
                products.map((product, index) => (
                  <Grid item xs={2} sm={2} md={2} key={index}>
                    <Chip
                      label={product.type}
                      onDelete={() => {
                        if (user.role === 'admin')
                          handleDeleteSellerProduct(product._id, id)
                      }}
                    />
                  </Grid>
                ))}
            </Grid>
          </Box>
          {user.role !== 'seller' && (
            <Autocomplete
              options={
                addMilk
                  ? ['rich', 'skimmed', 'toned', 'smart']
                  : seller
                  ? ['Ghee', 'Butter', 'Paneer']
                  : ['Milk', 'Ghee', 'Butter', 'Paneer']
              }
              getOptionLabel={(option) => option}
              fullWidth
              value={formData.category}
              onChange={handleFieldChange('category')}
              renderInput={(params) => (
                <TextField
                  {...params}
                  variant="filled"
                  type="text"
                  label="Category"
                  error={formError.category}
                  name="Category"
                />
              )}
              sx={{ gridColumn: 'span 2' }}
            />
          )}
          {user.role !== 'seller' &&
            formData.category !== 'Milk' &&
            !addMilk && (
              <Autocomplete
                options={secondAutocompleteOptions}
                getOptionLabel={(option) => option}
                fullWidth
                value={formData.type}
                onChange={handleFieldChange('type')}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    variant="filled"
                    type="text"
                    label="Type"
                    error={formError.type}
                    name="type"
                  />
                )}
                sx={{ gridColumn: 'span 2' }}
              />
            )}

          {formData.category === 'Milk' && !addMilk && (
            <TextField
              fullWidth
              variant="filled"
              type="text"
              label="Animal Identification ID"
              value={formData.animalId}
              onChange={handleFieldChange('animalId')}
              name="cattleWeight"
              error={formError.animalId}
              sx={{ gridColumn: 'span 2' }}
            />
          )}

          {formData.category === 'Milk' && !addMilk && (
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label="Density Of Milk"
              value={formData.quality}
              onChange={handleFieldChange('quality')}
              name="cattleWeight"
              error={formError.quality}
              sx={{ gridColumn: 'span 2' }}
            />
          )}
          {user.role !== 'seller' && (
            <TextField
              fullWidth
              variant="filled"
              type="number"
              label={`quantity/${
                formData.category === 'Milk' ? 'liter' : 'kg'
              }`}
              value={formData.quantity}
              onChange={handleFieldChange('quantity')}
              name="cattleWeight"
              error={formError.quantity}
              sx={{ gridColumn: 'span 2' }}
            />
          )}
          <Box
            display="flex"
            justifyContent="end"
            mt="20px"
            sx={{ gridColumn: 'span 4' }}
          >
            {user.role !== 'seller' && (
              <Button
                color="secondary"
                variant="contained"
                onClick={handleFormSubmit}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : addMilk ? (
                  'Sell'
                ) : (
                  'Add product'
                )}
              </Button>
            )}
          </Box>
        </Box>
      </Modal>
    </div>
  )
}

const initialValues = {
  category: '',
  type: '',
  quantity: '',
  animalId: '',
  quality: '',
  price:''
}
const initialErrValues = {
  category: false,
  type: false,
  quantity: false,
  animalId: false,
  quality: false,
}

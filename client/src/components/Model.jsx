import React, { useState } from 'react'
import Box from '@mui/material/Box'
import Header from './Header'
import Modal from '@mui/material/Modal'
import { Autocomplete, Button, TextField } from '@mui/material'
import { secondDataCompletion } from '../utils/secondAutoCompletion'
import { addProduct } from '../actions/productAction'
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

export default function BasicModal({ open, setOpen, id, handleClose }) {
  const {products,loading,error} = useSelector((state) => state.addProduct)
 
  const [formData, setFormData] = useState(initialValues)
  const [formError, setFormError] = useState(initialErrValues)
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([])
  const dispatch = useDispatch()

  const handleFieldChange = (fieldName) => (event, newValue) => {
    const updatedValue = event
      ? event.target
        ? event.target.value
        : newValue
      : newValue
    console.log(fieldName, event, newValue, updatedValue)
    if (fieldName === 'category' || fieldName === 'type') {
      setFormData({ ...formData, [fieldName]: newValue })
      if (newValue === 'Milk') {
        setSecondAutocompleteOptions(['Cattle', 'Buffaloes', 'Goat'])
      } else if (newValue === 'Ghee') {
        setSecondAutocompleteOptions(['Cow Ghee', 'Buffalo Ghee'])
      } else if (newValue === 'Butter') {
        setSecondAutocompleteOptions(['Salted Butter', 'Unsalted Butter'])
      } else if (newValue === 'Paneer') {
        setSecondAutocompleteOptions([
          'Regular Paneer',
          'Malai Paneer',
          'Smoked Paneer',
        ])
      }
    } else {
      setFormData({ ...formData, [fieldName]: updatedValue })
    }
  }
  const handleFormSubmit = () => {
    if (
      formData.category && formData.quantity && formData.category === 'Milk' && formData.quantity
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
        quality:!formData.quality,
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
            <Header title="ADD PRODUCT" subtitle={`ID : ${id}`} />
          </Box>
          <Autocomplete
            options={['Milk', 'Ghee', 'Butter', 'Paneer']}
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
          {formData.category !== 'Milk' && (
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

          {formData.category === 'Milk' && (
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
          {formData.category === 'Milk' && (
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
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label={`quantity/${formData.category === 'Milk' ? 'liter' : 'kg'}`}
            value={formData.quantity}
            onChange={handleFieldChange('quantity')}
            name="cattleWeight"
            error={formError.quantity}
            sx={{ gridColumn: 'span 2' }}
          />
          <Box
            display="flex"
            justifyContent="end"
            mt="20px"
            sx={{ gridColumn: 'span 4' }}
          >
            <Button
              color="secondary"
              variant="contained"
              onClick={handleFormSubmit}
            
            >
              Add product
            </Button>
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
}
const initialErrValues = {
  category: false,
  type: false,
  quantity: false,
  animalId: false,
  quality:false,
}

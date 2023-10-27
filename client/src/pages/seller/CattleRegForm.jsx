import { Autocomplete, Box, Button, TextField } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'

const CattleRegForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const [formData, setFormData] = useState(initialValues)
  const [formError, setFormError] = useState(initialErrValues)

  const handleFieldChange = (fieldName) => (event, newValue) => {
    setFormData({
      ...formData,
      [fieldName]: newValue || (event.target ? event.target.value : ''),
    })

    setFormError((prevFormError) => ({
      ...prevFormError,
      [fieldName]: false,
    }))
  }

  const handleFormSubmit = () => {
    if (
      formData.breed &&
      formData.breedingStatus &&
      formData.purchaseDate &&
      formData.purchasePrice &&
      formData.sex &&
      formData.cattleWeight
    ) {
      console.log('Form Data:', formData)
    } else {
      setFormError({
        breed: !formData.breed,
        breedingStatus: !formData.breedingStatus,
        purchaseDate: !formData.purchaseDate,
        purchasePrice: !formData.purchasePrice,
        sex: !formData.sex,
        cattleWeight: !formData.cattleWeight,
      })
    }
  }
  return (
    <Box m="20px">
      <form>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr)"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <Autocomplete
            options={cowBreedOptions}
            getOptionLabel={(option) => option}
            fullWidth
            value={formData.breed}
            onChange={handleFieldChange('breed')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                type="text"
                label="Breed"
                error={formError.breed}
                name="breed"
                sx={{ gridColumn: 'span 4' }}
              />
            )}
            sx={{ gridColumn: 'span 2' }}
          />
          <Autocomplete
            options={['male', 'female']}
            getOptionLabel={(option) => option}
            value={formData.sex}
            fullWidth
            onChange={handleFieldChange('sex')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                type="text"
                label="Sex"
                error={formError.sex}
                name="sex"
              />
            )}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            value={formData.purchaseDate}
            onChange={handleFieldChange('purchaseDate')}
            name="purchaseDate"
            error={formError.purchaseDate}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Cattle weight/kg"
            value={formData.cattleWeight}
            onChange={handleFieldChange('cattleWeight')}
            name="cattleWeight"
            error={formError.cattleWeight}
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Purchase Price"
            value={formData.purchasePrice}
            onChange={handleFieldChange('purchasePrice')}
            name="purchasePrice"
            error={formError.purchasePrice}
            sx={{ gridColumn: 'span 4' }}
          />
          <Autocomplete
            options={['Nil', 'pregnant']}
            getOptionLabel={(option) => option}
            fullWidth
            value={formData.breedingStatus}
            onChange={handleFieldChange('breedingStatus')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                type="text"
                label="Breeding Status"
                name="breedingStatus"
                error={formError.breedingStatus}
              />
            )}
            sx={{ gridColumn: 'span 4' }}
          />
        </Box>
        <Box display="flex" justifyContent="end" mt="20px">
          <Button
            color="secondary"
            variant="contained"
            onClick={handleFormSubmit}
          >
            Add New Cattle
          </Button>
        </Box>
      </form>
    </Box>
  )
}
export default CattleRegForm

const cowBreedOptions = [
  'Holstein',
  'Jersey',
  'Guernsey',
  'Ayrshire',
  'Brown Swiss',
  'Simmental',
  'Limousin',
  'Angus',
  'Hereford',
  'Charolais',
  'Murray Grey',
  'Brahman',
  'Texas Longhorn',
  'Dexter',
  'Highland',
]

const initialValues = {
  purchaseDate: '',
  purchasePrice: '',
  sex: '',
  breed: '',
  breedingStatus: '',
  cattleWeight: '',
}
const initialErrValues = {
  breed: false,
  sex: false,
  purchaseDate: false,
  purchasePrice: false,
  breedingStatus: false,
  cattleWeight: false,
}

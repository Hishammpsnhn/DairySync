import { useTheme } from '@emotion/react'
import { Autocomplete, Box, Button, TextField, Typography } from '@mui/material'
import useMediaQuery from '@mui/material/useMediaQuery'
import { useState } from 'react'
import { tokens } from '../../theme'
import Header from '../../components/Header'

const CattleRegForm = () => {
  const isNonMobile = useMediaQuery('(min-width:600px)')
  const theme = useTheme()
  const colors = tokens(theme.palette.mode)
  const [formData, setFormData] = useState(initialValues)
  const [formError, setFormError] = useState(initialErrValues)
  const [secondAutocompleteOptions, setSecondAutocompleteOptions] = useState([])
  const [animalTypeOptions] = useState(['Cattle', 'Buffaloes', 'Goat'])
  const [cowBreedOptions] = useState(cattleBreedsInKerala)
  const [goatBreedOptions] = useState(goatBreedsInKerala)
  const [buffaloOptions] = useState(buffaloBreedsInKerala)

  const handleFieldChange = (fieldName) => (event, newValue) => {
    const updatedValue = event
      ? event.target
        ? event.target.value
        : newValue
      : newValue
    console.log(fieldName, event, newValue, updatedValue)
    if (
      fieldName === 'animalType' ||
      fieldName === 'sex' ||
      fieldName === 'breed' ||
      fieldName === 'breedingStatus'
    ) {
      setFormData({ ...formData, [fieldName]: newValue })
      if (newValue === 'Cattle') {
        setSecondAutocompleteOptions(cowBreedOptions)
      } else if (newValue === 'Goat') {
        setSecondAutocompleteOptions(goatBreedOptions)
      } else if (newValue === 'Buffaloes') {
        setSecondAutocompleteOptions(buffaloOptions)
      } else {
        setSecondAutocompleteOptions([])
      }
    } else {
      setFormData({ ...formData, [fieldName]: updatedValue })
    }
  }

  const handleFormSubmit = () => {
    if (
      formData.breed &&
      formData.breedingStatus &&
      formData.dateOfBirth &&
      formData.purchasePrice &&
      formData.sex &&
      formData.cattleWeight &&
      formData.animalIdentification &&
      formData.animalType &&
      formData.healthCondition
    ) {
      console.log('Form Data:', formData)
    } else {
      setFormError({
        breed: !formData.breed,
        breedingStatus: !formData.breedingStatus,
        dateOfBirth: !formData.dateOfBirth,
        purchasePrice: !formData.purchasePrice,
        sex: !formData.sex,
        cattleWeight: !formData.cattleWeight,
        animalIdentification: !formData.animalIdentification,
        animalType: !formData.animalType,
        healthCondition: !formData.healthCondition,
      })
    }
  }
  return (
    <Box m="20px" overflow="auto">
      <Header title="ADD NEW CATTLE" subtitle="Add Cattle Details" />
      <form>
        <Typography
          variant="h5"
          color={colors.grey[300]}
          sx={{ m: '0 0 15px 0' }}
        >
          Cattle Details
        </Typography>
        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <Autocomplete
            options={animalTypeOptions}
            getOptionLabel={(option) => option}
            fullWidth
            value={formData.animalType}
            onChange={handleFieldChange('animalType')}
            renderInput={(params) => (
              <TextField
                {...params}
                variant="filled"
                type="text"
                label="Animal Type"
                error={formError.animalType}
                name="animalType"
              />
            )}
            sx={{ gridColumn: 'span 2' }}
          />
          {formData.animalType && (
            <Autocomplete
              options={secondAutocompleteOptions}
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
                />
              )}
              sx={{ gridColumn: 'span 2' }}
            />
          )}
          <TextField
            fullWidth
            variant="filled"
            type="string"
            label="Animal Identification Code"
            value={formData.animalIdentification}
            onChange={handleFieldChange('animalIdentification')}
            name="animalIdentification"
            error={formError.animalIdentification}
            sx={{ gridColumn: 'span 2' }}
            inputProps={{ style: { textTransform: 'uppercase' } }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="date"
            label="Date Of Birth"
            value={formData.dateOfBirth}
            onChange={handleFieldChange('dateOfBirth')}
            name="dateOfBirth"
            error={formError.dateOfBirth}
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
            sx={{ gridColumn: 'span 2' }}
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
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
        <Typography
          variant="h5"
          color={colors.grey[300]}
          sx={{ m: '25px 0 15px 0' }}
        >
          Milk Production Data
        </Typography>

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(4, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Milk Yield /Liter"
            onChange={handleFieldChange('milkYeild')}
            value={formData.milkYeild}
            name="milkyeild"
            sx={{ gridColumn: 'span 2' }}
          />
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Milking Frequency /day"
            onChange={handleFieldChange('milkFrequency')}
            value={formData.milkFrequency}
            name="lastName"
            sx={{ gridColumn: 'span 2' }}
          />
        </Box>
        <Typography
          variant="h5"
          color={colors.grey[300]}
          sx={{ m: '25px 0 15px 0' }}
        >
          Health Records
        </Typography>

        <Box
          display="grid"
          gap="30px"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          sx={{
            '& > div': { gridColumn: isNonMobile ? undefined : 'span 4' },
          }}
        >
          <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Vaccine Name"
            onChange={handleFieldChange('vaccineName')}
            value={formData.vaccineName}
            name="vaccineName"
            sx={{ gridColumn: formData.vaccineName ? 'span 2' : 'span 4' }}
          />
          {formData.vaccineName && (
            <TextField
              fullWidth
              variant="filled"
              type="date"
              label="Date Administered"
              onChange={handleFieldChange('dateAdministered')}
              value={FormData.dateAdministered}
              name="lastName"
              sx={{ gridColumn:  'span 2' }}
            />
          )}
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Health Condition in %"
            onChange={handleFieldChange('healthCondition')}
            value={formData.healthCondition}
            name="lastName"
            error={formError.healthCondition}
            sx={{ gridColumn: 'span 2' }}
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

const cattleBreedsInKerala = [
  'Vechur',
  'Ongole',
  'Malnad Gidda',
  'Kerala Jersey',
]
const goatBreedsInKerala = ['Jamnapari', 'Boer', 'Malabari', 'Black Bengal']
const buffaloBreedsInKerala = [
  'Murrah Buffalo',
  'Surti Buffalo',
  'Jaffarabadi Buffalo',
  'Mehsana Buffalo',
  'Nili-Ravi Buffalo',
  'Pandharpuri Buffalo',
]

const initialValues = {
  animalType: '',
  animalIdentification: '',
  dateOfBirth: '',
  purchasePrice: '',
  breed: '',
  breedingStatus: '',
  cattleWeight: '',
  milkYeild: '',
  milkFrequency: '',
  vaccineName: '',
  dateAdministered: '',
  healthCondition: '',
}
const initialErrValues = {
  breed: false,
  dateOfBirth: false,
  purchasePrice: false,
  breedingStatus: false,
  animalIdentification: false,
  cattleWeight: false,
  animalType: false,
  healthCondition: false,
}

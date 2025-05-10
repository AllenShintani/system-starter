import enLocale from 'i18n-iso-countries/langs/en.json'
import countries from 'i18n-iso-countries'

export const MAX_FILE_SIZE = 10 * 1024 * 1024

export const ALLOWED_FILE_TYPES = [
  'application/pdf',
  'application/vnd.ms-excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  'text/csv',
  'application/zip',
]

export const AVAILABLE_TAGS = ['SNS', 'Geo Location']

countries.registerLocale(enLocale)

export const COUNTRIES = Object.entries(countries.getNames('en')).map(([code, name]) => ({
  code,
  name,
}))

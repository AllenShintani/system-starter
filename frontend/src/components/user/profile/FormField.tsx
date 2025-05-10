'use client'

import { TextField, Grid } from '@mui/material'
import styles from '@/styles/app/user/profile/edit.module.css'

interface FormFieldProps {
  name: string
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  fullWidth?: boolean
  multiline?: boolean
  rows?: number
  type?: string
  md?: number
  shrink?: boolean
}

const FormField = ({
  name,
  label,
  value,
  onChange,
  fullWidth = true,
  multiline = false,
  rows = 0,
  type = 'text',
  md = 12,
  shrink = false,
}: FormFieldProps) => (
  <Grid
    item
    xs={12}
    md={md}
  >
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      variant="outlined"
      fullWidth={fullWidth}
      className={styles.textField}
      type={type}
      multiline={multiline}
      rows={rows}
      InputLabelProps={shrink ? { shrink: true } : undefined}
    />
  </Grid>
)

export default FormField

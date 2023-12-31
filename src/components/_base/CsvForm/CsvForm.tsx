// CsvForm.tsx
import React from 'react'
import { FCC } from 'src/types'
import { LoadDataComponent } from 'src/components'

interface CsvFormProps {
  onDataUploaded: (data: Record<string, any>) => void
}

export const CsvForm: FCC<CsvFormProps> = ({ onDataUploaded }) => {
  return (
    <div>
      <LoadDataComponent onDataUploaded={onDataUploaded} />
    </div>
  )
}

export default CsvForm

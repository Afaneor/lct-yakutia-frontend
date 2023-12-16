import React from 'react'
import styles from './ProductCreateForm.module.scss'
import { FCC } from 'src/types'

interface ProductCreateFormProps {
    prop?: any
}
export const ProductCreateForm: FCC<ProductCreateFormProps> = ({prop}) => {
  return <div className={styles.container} data-testid='test-ProductCreateForm'>ProductCreateForm</div>
}

ProductCreateForm.displayName = 'ProductCreateForm'

export default ProductCreateForm
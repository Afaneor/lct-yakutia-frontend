import type { FormInstance } from 'antd/es/form/hooks/useForm'
import { useEffect } from 'react'
import isEmpty from 'lodash/isEmpty'

/**
 * Хук, который подготавливает данные для селектов формы
 * @param form
 * @param initialValues
 * @param preparedFields
 * @param options
 */
export const usePrepareRelatedForSelectFormItem = (
  form: FormInstance,
  initialValues: Record<string, any>,
  preparedFields?: string[],
  options?: {
    labelKey: string
    valueKey: string
  }
) => {
  const preparedFieldsObject: Record<string, any> = {}

  if (!isEmpty(initialValues) && preparedFields) {
    preparedFields?.forEach((field) => {
      preparedFieldsObject[field] = initialValues?.[field]?.map(
        (record: Record<string, any>) => ({
          label: record?.[options?.labelKey || 'name'],
          value: record?.[options?.valueKey || 'id'].toString(),
          record,
        })
      )
    })
  }

  const prepareRelatedToCreate = (values: Record<string, any>) => {
    preparedFields?.forEach((field) => {
      values[field] = Array.isArray(values[field])
        ? values[field]?.map((record: any) => record?.value || record?.id)
        : values[field]?.value || values[field]?.id
    })
    return values
  }

  const values = { ...initialValues, ...preparedFieldsObject }

  useEffect(() => {
    form.setFieldsValue(values)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialValues])

  return {
    values,
    prepareRelatedToCreate,
  }
}

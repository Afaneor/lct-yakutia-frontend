import { useTranslation } from 'src/hooks'
import { useParams } from 'react-router-dom'
import { useFetchOneItem, useUpdateItem } from 'src/services/base/hooks'
import { BaseModel } from 'src/models'
import { notification } from 'antd'

export const useEntityPage = (model: typeof BaseModel, entityId?: string) => {
  const { t } = useTranslation()
  const { id } = useParams<{ id: string }>()

  const {
    data,
    refetch,
    isLoading,
  }: {
    data: any
    isLoading: boolean
    refetch: CallableFunction
  } = useFetchOneItem({
    model,
    id: entityId || Number(id),
    options: {
      enabled: !!id,
    },
  })

  const { mutate: update } = useUpdateItem(model)

  const handleUpdate = (field: string, text: string) => {
    update(
      { id: data?.data?.id, fields: { [field]: text } },
      {
        onSuccess: () => {
          refetch()
          notification.success({
            message: t('Успешно обновлено'),
          })
        },
        onError: () => {
          notification.error({
            message: t('Не удалось обновить'),
          })
        },
      }
    )
  }
  return {
    data,
    refetch,
    handleUpdate,
    isLoading,
    id,
  }
}

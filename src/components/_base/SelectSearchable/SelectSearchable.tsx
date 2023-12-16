import React from 'react'
import { Button, Divider, Select, Spin } from 'antd'
import { debounce } from 'lodash'
import { useInfinityFetchData } from 'src/services/base/useInfinityFetchData'
import { BaseModel } from 'src/models'
import { useTranslation } from 'src/hooks'
import { DownloadOutlined } from '@ant-design/icons'

const { Option } = Select

interface SelectSearchableProps {
  mode?: 'multiple' | 'tags'
  value?: string | number | null
  model: typeof BaseModel
  onChange?: (value: string | number | null) => void
}

export const SelectSearchable: React.FC<SelectSearchableProps> = ({
  onChange,
  value,
  model,
  mode,
}) => {
  const { t } = useTranslation()

  const {
    rowData,
    fetchNextPage,
    isFetching,
    isLoading,
    hasNextPage,
    setFilters,
  }: any = useInfinityFetchData({
    model,
    defFilters: {},
  })

  const handleSetSearch = (searchValue: string) => {
    setFilters({ search: searchValue })
  }
  const debouncedFetchData = debounce(handleSetSearch, 500)

  const handleSearch = (searchValue: string) => {
    debouncedFetchData(searchValue)
  }

  const handleChange = (selectedValue: string | number | null) => {
    onChange?.(selectedValue)
  }

  return (
    <Select
      value={value}
      showSearch
      mode={mode}
      placeholder={t('Выбрать')}
      defaultActiveFirstOption={false}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      notFoundContent={isLoading ? <Spin size='small' /> : null}
      allowClear
      style={{ width: '100%' }}
      dropdownRender={(menu) => (
        <div>
          {menu}
          {hasNextPage ? (
            <>
              <Divider style={{ margin: '4px 0' }} />
              <Button
                loading={isFetching || isLoading}
                type={'text'}
                block
                icon={<DownloadOutlined />}
                onClick={fetchNextPage}
              >
                {t('Загрузить еще')}
              </Button>
            </>
          ) : null}
        </div>
      )}
    >
      {rowData?.length === 0 ? (
        <Option key='not_found' value='not_found' disabled>
          {t('Не найдено')}
        </Option>
      ) : null}
      {rowData?.map((item: Record<string, any>) => (
        <Option key={item.id} value={item.id}>
          {item.name}
        </Option>
      ))}
      {isFetching || isLoading ? (
        <Option key='loading' value='loading' disabled>
          <Spin size='small' />
        </Option>
      ) : null}
    </Select>
  )
}

export default SelectSearchable

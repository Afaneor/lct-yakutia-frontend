import React from 'react'
import { Button, Col, Row, Table } from 'antd'
import type { ColumnsType, TablePaginationConfig } from 'antd/es/table'
import type { FilterValue, SorterResult } from 'antd/es/table/interface'
import { useWindowSize } from 'src/hooks'
import { DeleteOutlined } from '@ant-design/icons'
import { BaseModel } from 'src/models'
import { getAdvancedColumns } from 'src/components/_base/PaginatedTable/utils'
import { TableCurrentDataSource } from 'antd/es/table/interface'

export interface Sorter extends SorterResult<Record<string, any>> {
  ordering: string
}

interface PaginatedTableProps {
  columns: ColumnsType<Record<string, any>>
  pageSize: number
  page: number
  dataCount: number
  dataSource: any[]
  isLoading?: boolean
  onDelete?: (record: BaseModel) => void
  onTableChange: (
    pagination: TablePaginationConfig,
    filters: Record<string, FilterValue | null>,
    sorter:
      | SorterResult<Record<string, any>>
      | SorterResult<Record<string, any>>[],
    extra: TableCurrentDataSource<Record<string, any>>
  ) => void
  onRowClick?: ({
    record,
    rowIndex,
    event,
  }: {
    record: Record<string, any>
    rowIndex?: number
    event: React.MouseEvent<HTMLElement>
  }) => void
}

export const PaginatedTable: React.FC<PaginatedTableProps> = ({
  columns,
  onRowClick,
  dataCount,
  dataSource,
  page,
  pageSize,
  isLoading,
  onTableChange,
  onDelete,
}) => {
  const advancedColumns = getAdvancedColumns(columns)
  if (onDelete)
    advancedColumns.push({
      title: '',
      dataIndex: '',
      key: 'x',
      width: '5%',
      render: (record: Record<string, any>) => (
        <Row justify={'end'}>
          <Col>
            <Button
              danger
              type={'text'}
              icon={<DeleteOutlined />}
              onClick={(event) => {
                event.stopPropagation()
                onDelete(record)
              }}
            />
          </Col>
        </Row>
      ),
    })

  const { height } = useWindowSize()

  return (
    <div
      style={{
        border: '1px solid #e8e8e8',
        borderRadius: '8px',
      }}
    >
      <Table
        columns={advancedColumns}
        rowKey={(record) => record.id}
        dataSource={dataSource}
        pagination={{
          showQuickJumper: true,
          showSizeChanger: true,
          position: ['bottomCenter'],
          current: page,
          pageSize,
          total: dataCount,
        }}
        loading={isLoading}
        scroll={{ x: 500, y: height - 270 }}
        onChange={onTableChange}
        onRow={(record, rowIndex) => ({
          onClick: (event) => {
            onRowClick?.({ record, rowIndex, event })
          },
        })}
      />
    </div>
  )
}

export default PaginatedTable

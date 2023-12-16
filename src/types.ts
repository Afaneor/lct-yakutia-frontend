import { FC, PropsWithChildren, SyntheticEvent } from 'react'
import type { Dayjs } from 'dayjs'

// eslint-disable-next-line @typescript-eslint/naming-convention,@typescript-eslint/ban-types
export type FCC<P = {}> = FC<PropsWithChildren<P>>
export type Nullable<T> = T | null
export type HTMLElementEvent<T extends HTMLElement> = SyntheticEvent & {
  target: T
}
export type RangeValueType = [Dayjs | null, Dayjs | null] | null

export type EntityTypes =
  | 'asset'
  | 'leak'
  | 'service'
  | 'vulnerability'
  | 'domain'
  | 'ip_address'

export type UpdateCellCallback<T> = (itemId: string | number, fields: T) => void

type Enumerate<
  N extends number,
  Acc extends number[] = []
> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>

export type IntRange<F extends number, T extends number> = Exclude<
  Enumerate<T>,
  Enumerate<F>
>

export enum FilterValueType {
  CHOICE = 'choice',
  FROM_TO_RANGE = 'from_to_range',
  FROM_TO_RANGE_DATE = 'from_to_range_date',
}

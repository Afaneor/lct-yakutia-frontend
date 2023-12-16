/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

declare module 'axios'

declare type EventValue<DateType> = DateType | null
declare type RangeValue<DateType> =
  | [EventValue<DateType>, EventValue<DateType>]
  | null
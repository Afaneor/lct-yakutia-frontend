import dayjs from 'dayjs'

export const useDateStrToDayjs = () => {
  return (dateStr: string) => {
    return dateStr ? dayjs(dateStr) : null
  }
}

import dayjs from 'dayjs'
import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import type { Dayjs } from 'dayjs'

export const useDayjsExtendTimezone = () => {
  dayjs.extend(utc)
  dayjs.extend(timezone)

  /**
   * Получаем строку даты/времени с заданным часовым поясом
   * @param dateTime
   * @param format
   * @param timezoneString
   */
  const getDatetimeByFormatAndTimezone = (
    dateTime: Dayjs | string | null,
    format = 'HH:mm',
    timezoneString = 'utc'
  ) => {
    if (!dateTime) return ''
    return dayjs(dateTime).tz(timezoneString).format(format)
  }

  /**
   * Полученному времени указываем исходный часовой пояс
   * и конвертируем в текущий
   * @param dateTime
   * @param format
   * @param defTimezone
   */
  const getCurrentTimezoneDatetime = (
    dateTime: Dayjs | string | null,
    format = 'HH:mm',
    defTimezone = 'utc'
  ) => {
    dayjs.extend(customParseFormat)
    // парсим время указывая, что оно в UTC+0
    const parse = dayjs.tz(dateTime, format, defTimezone)
    // получаем текущий часовой пояс
    const tz = dayjs.tz.guess()
    // переводим время в текущий часовой пояс
    return parse.tz(tz)
  }

  return { getDatetimeByFormatAndTimezone, getCurrentTimezoneDatetime }
}

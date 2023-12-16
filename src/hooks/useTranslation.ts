import { useTranslation as useTr } from 'react-i18next'

export type TranslateType = (str: string) => string | undefined
/**
 * Переопределил хук переводв,
 * так как по умолчанию function T возвращает null,
 * а placeholder в Input хочет str или undefined
 */
export const useTranslation = () => {
  const translation = useTr()
  const overrideT = (str: string) => translation.t(str) || undefined
  const overrideTFForce = (str: string) => translation.t(str) || str
  return { ...translation, t: overrideT, tF: overrideTFForce }
}

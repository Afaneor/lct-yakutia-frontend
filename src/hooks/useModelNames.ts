import { useTranslation } from 'src/hooks'

/**
 * Хук для получения названий моделей на текущем языке
 * @returns {Object} - объект с названиями моделей
 */
export const useModelNames = () => {
  const { t } = useTranslation()

  return {
    ipAddress: {
      name: t('IP-адрес'),
      pluralName: t('IP-адреса'),
    },
    domain: {
      name: t('Домен'),
      pluralName: t('Домены'),
    },
  }
}

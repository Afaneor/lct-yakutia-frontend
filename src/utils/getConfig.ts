export function getConfig(configVariable: string, defaultVal?: string) {
  const resultFromWindow: any = window[configVariable as any]
  if (typeof resultFromWindow === 'string' && resultFromWindow) {
    return resultFromWindow
  } else {
    return import.meta.env[configVariable] || defaultVal || ''
  }
}

export const usePrepareFormField = () => {
  const handlePrepareFormFields = (
    fields: Record<string, any>,
    exclude: string[] = []
  ) => {
    const res = {} as Record<any, string | number>
    for (const [key, value] of Object.entries(fields)) {
      // @ts-ignore
      if (!~key.indexOf(exclude)) {
        // @ts-ignore
        res[key] = value?.constructor === Object ? value.id : value
      }
    }
    return res
  }
  return handlePrepareFormFields
}

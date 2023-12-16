export const useOrdering = () => {
  return (order: 'ascend' | 'descend' | undefined, field: string) => {
    if (order === 'ascend') {
      return field
    } else if (order === 'descend') {
      return `-${field}`
    }
    return undefined
  }
}

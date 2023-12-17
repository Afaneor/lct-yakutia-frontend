import isEmpty from 'lodash/isEmpty'
import type { RcFile, BeforeUploadFileType } from 'rc-upload/lib/interface'

/**
 * Хук для представления файла из event.target.files в FormData
 */
export const useFileAsFormData = () => {
  return (
    file: Exclude<BeforeUploadFileType, File | boolean> | RcFile,
    attachTo?: any
  ) => {
    const formData = new FormData()
    formData.append('file', file)
    if (!isEmpty(attachTo)) {
      const { contentType, objectId } = attachTo
      formData.set('contentType', contentType?.toString())
      formData.set('objectId', objectId?.toString())
    }
    return formData
  }
}

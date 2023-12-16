export const routerLoader = <T>(
  factory: () => Promise<T>,
  maxRetry = 0
): Promise<T> => {
  return new Promise((resolve, reject) => {
    factory()
      .then(resolve)
      .catch((error) => {
        if (maxRetry === 0) {
          reject(error)
          // this is probably a white page error. reload the main page
          // alt - add better messaging or load another page
          // window.location.reload()
          return
        }

        // recursively try again reducing the retry count
        routerLoader(factory, --maxRetry).then(resolve, reject)
      })
  })
}

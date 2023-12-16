import { Link } from 'src/routes'

export const usePrepareRoutesList = (links: Link[]) => {
  const res = [] as Link[]
  links.map((link) => {
    res.push(link)
    if (link.collapseLinks) {
      res.push(...link.collapseLinks.map((cL) => cL))
    }
  })
  return res
}

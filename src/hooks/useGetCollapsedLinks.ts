import isEmpty from 'lodash/isEmpty'
import cloneDeep from 'lodash/cloneDeep'
import { useMemo } from 'react'
import { Link } from 'src/routes'

export const useGetCollapsedLinks = (links: Link[]) => {
  return useMemo(() => {
    const linksCopy = cloneDeep(links?.filter((link) => link.navLink))
    const collapsed = {} as any
    const linksWithCollapsed = [] as any

    linksCopy?.forEach((item: any) => {
      if (item.collapseFrom) {
        if (!collapsed[item.collapseFrom]) {
          collapsed[item.collapseFrom] = []
        }
        collapsed[item.collapseFrom].push(item)
      } else {
        linksWithCollapsed.push(item)
      }
    })

    if (!isEmpty(collapsed)) {
      for (const [key, value] of Object.entries(collapsed)) {
        const el = linksWithCollapsed.find((item: any) => item.name === key)
        el.collapseLinks = value
      }
    }

    return linksWithCollapsed
  }, [links])
}

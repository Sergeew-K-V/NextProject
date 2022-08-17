export const getParentPath = (path: string, query: string | undefined): string => {
  if (query !== undefined) {
    const lengthOfQuery = query.length
    const parentPath = path.slice(0, -lengthOfQuery)
    return parentPath
  } else {
    return ''
  }
}

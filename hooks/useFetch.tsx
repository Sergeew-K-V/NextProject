import { useCallback } from 'react'

export const useFetch = () => {
  const request = useCallback(async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
    try {
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const responce = await fetch(url, { method, body, headers })
      const data = await responce.json()

      return data
    } catch (error) {
      return ''
    }
  }, [])

  return { request }
}

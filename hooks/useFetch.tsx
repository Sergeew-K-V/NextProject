import { useCallback, useState } from 'react'

export const useFetch = () => {
  const [loading, setLoading] = useState<boolean>(false)

  const request = useCallback(async (url: string, method = 'GET', body: any = null, headers: any = {}) => {
    try {
      setLoading(true)
      if (body) {
        body = JSON.stringify(body)
        headers['Content-Type'] = 'application/json'
      }

      const responce = await fetch(url, { method, body, headers })
      const data = await responce.json()

      setLoading(false)
      return data
    } catch (error) {
      setLoading(false)
      return ''
    }
  }, [])

  return { request, loading }
}

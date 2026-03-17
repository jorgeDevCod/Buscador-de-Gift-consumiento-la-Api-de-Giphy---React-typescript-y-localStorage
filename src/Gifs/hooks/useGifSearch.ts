// src/gifs/hooks/useGifSearch.ts
import { useState, useEffect } from 'react'
import type { Gif, GiphyResponse } from '../../types/gif.types'

// La forma del objeto que retorna el hook
interface UseGifSearchReturn {
  gifs: Gif[];
  loading: boolean;
  error: string | null;
}

// Transformar el dato crudo de Giphy al tipo limpio de la app
// Esta función "mapea" — es el único lugar que conoce la estructura de Giphy
const mapGiphyToGif = (data: GiphyResponse['data']): Gif[] => {
  return data.map(item => ({
    id: item.id,
    title: item.title,
    url: item.images.fixed_height.url,
    width: Number(item.images.fixed_height.width),
    height: Number(item.images.fixed_height.height),
  }))
}

export const useGifSearch = (searchTerm: string): UseGifSearchReturn => {
  const [gifs, setGifs] = useState<Gif[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // Si no hay término, no buscar nada
    if (!searchTerm.trim()) {
      setGifs([])
      return
    }

    // AbortController cancela el fetch si el componente se desmonta
    // o si el usuario escribe otra búsqueda antes de que termine la anterior
    const controller = new AbortController()

    const fetchGifs = async (): Promise<void> => {
      setLoading(true)
      setError(null)

      try {
        const apiKey = import.meta.env.VITE_GIPHY_API_KEY
        const url = `https://api.giphy.com/v1/gifs/search?api_key=${apiKey}&q=${encodeURIComponent(searchTerm)}&limit=20&lang=es`

        const response = await fetch(url, { signal: controller.signal })

        if (!response.ok) {
          throw new Error(`Error ${response.status}: ${response.statusText}`)
        }
        const json: GiphyResponse = await response.json()

        setGifs(mapGiphyToGif(json.data))

      } catch (err) {
        // AbortError no es un error real — es la cancelación intencional
        if (err instanceof Error && err.name === 'AbortError') return
        setError(err instanceof Error ? err.message : 'Error desconocido')

      } finally {
        setLoading(false)
      }
    }

    fetchGifs()

    // Cleanup: si searchTerm cambia antes de que termine el fetch,
    // cancelamos el anterior para no pisar el estado con datos viejos
    return () => controller.abort()

  }, [searchTerm])  // solo re-ejecutar cuando searchTerm cambie

  return { gifs, loading, error }
}

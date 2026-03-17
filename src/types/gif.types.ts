// Esto modela exactamente lo que devuelve la API de Giphy
export interface GiphyImage {
    url: string
    width: string 
    height: string
}

export interface GiphyGifData {
    id: string
    title: string
    images: {
        fixed_height: GiphyImage
        original: GiphyImage
    }
}

export interface GiphyResponse {
    data: GiphyGifData[]
    pagination: {
        total_count: number
        count: number
        offset: number
    }
}

// Esta es la interface "limpia" que usa tu app internamente
// Nunca expongas la estructura de Giphy a toda la app — si cambian su API,
// solo actualizás el hook, no todos los componentes
export interface Gif {
    id: string
    title: string
    url: string
    width: number
    height: number
}

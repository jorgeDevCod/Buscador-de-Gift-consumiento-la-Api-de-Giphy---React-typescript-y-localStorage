import { useState } from "react"
import styles from "./GifsApp.module.css"
import { CustomHeader } from "./shared/components/CustomHeader"
import { SearchBar } from "./shared/components/SearchBar"
import { PreviousSearches } from "./Gifs/components/PreviousSearches"
import { LoadingSpinner } from "./shared/components/LoadingSpinner"
import { GifGrid } from "./Gifs/components/GifGrid"
import { useLocalStorage } from "./Gifs/hooks/useLocalStorage"
import { useGifSearch } from './Gifs/hooks/useGifSearch'

export const GifsApp = () => {
   const { app, errorStl, empty } = styles

   const [searchTerm, setSearchTerm] = useState<string>("")

   const [previousSearches, setPreviousSearches] = useLocalStorage<string[]>('gif-searches', [])

   // El hook encapsula fetch + loading + error. GifsApp no sabe CÓMO se busca, solo CUÁNDO y QUÉ mostrar
   const { gifs, loading, error } = useGifSearch(searchTerm)

   const handleSearch = (term: string): void => {
      const normalized = term.toLowerCase().trim();
      setSearchTerm(normalized)
      setPreviousSearches(
         [normalized, ...previousSearches.filter(t => t !== normalized)].slice(0, 8)
      )
   }

   const handleDeleteSearch = (term: string): void => {
      // Eliminar del historial
      setPreviousSearches(previousSearches.filter(t => t !== term))
      // Si era el termino activo: limpiara los Gifs
      if (term === searchTerm) setSearchTerm('')
   }

   const handleReset = (): void => {
      setPreviousSearches([])
      setSearchTerm('')
   }

   return (
      <div className={app}>
         {/* Header */}
         <CustomHeader />

         {/* Barra de busqueda*/}
         <SearchBar onSearch={handleSearch} />

         {/* Busquedas Previas */}
         <PreviousSearches
            searches={previousSearches}
            onReset={handleReset}
            onTermClicked={handleSearch}
            onTermDeleted={handleDeleteSearch}
         />

         {loading && <LoadingSpinner />}

         {error && !loading && (
            <p className={errorStl}
            >Error: {error}</p>
         )}

         {!loading && !error && searchTerm && gifs.length === 0 && (
            <p className={empty}
            >Sin resultados para "{searchTerm}"</p>
         )}

         {!loading && !error && (
            <GifGrid gifs={gifs} />
         )}

         {/* Pantalla de bienvenida — solo cuando no hay búsqueda todavía */}
         {!searchTerm && !loading && (
            <div className={styles.welcome}>
               <span className={styles.welcomeIcon}>👀</span>
               <p>Buscá cualquier cosa y encuentra tus GIFs</p>
            </div>
         )}
      </div>
   )
}


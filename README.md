# 🎬 GIFs App

> Buscador de GIFs en tiempo real construido con React + TypeScript + Giphy API

![React](https://img.shields.io/badge/React-19-61DAFB?style=flat-square&logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat-square&logo=vite&logoColor=white)
![CSS Modules](https://img.shields.io/badge/CSS-Modules-000?style=flat-square&logo=cssmodules&logoColor=white)

---

## ✨ Features

- 🔍 **Búsqueda en tiempo real** conectada a la API de Giphy
- 🕐 **Historial de búsquedas** con chips clicables
- 💾 **Persistencia** — el historial sobrevive recargas gracias a localStorage
- ❌ **Eliminar búsquedas** individualmente o todas de una vez
- ⌨️ **Buscar con Enter** además del botón
- ⚡ **Cancelación de requests** con AbortController — sin race conditions
- 📱 **Grid responsivo** con CSS Grid auto-fill
- 🎨 **CSS Modules** — estilos encapsulados por componente

---

## 🏗️ Arquitectura

```
src/
├── gifs/
│   ├── components/
│   │   ├── GifGrid.tsx          # Grid responsivo de resultados
│   │   ├── GifItem.tsx          # Card individual de un GIF
│   │   └── PreviousSearches.tsx # Historial con chips
│   └── hooks/
│       └── useGifSearch.ts      # Lógica de fetch + estados
├── shared/
│   ├── components/
│   │   ├── SearchBar.tsx        # Input + botón de búsqueda
│   │   ├── CustomHeader.tsx     # Header de la app
│   │   └── LoadingSpinner.tsx   # Indicador de carga
│   └── hooks/
│       └── useLocalStorage.ts   # Persistencia genérica
├── types/
│   └── gif.types.ts             # Interfaces TypeScript
├── GifsApp.tsx                  # Componente raíz — orquesta el estado
└── main.tsx                     # Punto de entrada
```

**Principios aplicados:**
- Separación por dominio (`gifs/` vs `shared/`)
- Custom hooks para aislar lógica de negocio
- Componentes presentacionales sin efectos secundarios
- Un solo lugar que conoce la estructura de la API externa (`mapGiphyToGif`)

---

## 🚀 Cómo correrlo

**1. Clonar el repo**
```bash
git clone https://github.com/tu-usuario/gifs-app.git
cd gifs-app
```

**2. Instalar dependencias**
```bash
npm install
```

**3. Configurar la API Key**

Crear un archivo `.env` en la raíz:
```bash
VITE_GIPHY_API_KEY=tu_api_key_aqui
```

> Conseguí tu API Key gratis en [developers.giphy.com](https://developers.giphy.com)

**4. Correr en desarrollo**
```bash
npm run dev
```

---

## 🧠 Lo más interesante del código

### AbortController — sin race conditions

Cuando el usuario escribe rápido, cada búsqueda cancela la anterior antes de hacer la nueva. Así nunca pisás resultados viejos sobre nuevos.

```ts
const controller = new AbortController()
const response = await fetch(url, { signal: controller.signal })
return () => controller.abort() // cleanup de useEffect
```

### useLocalStorage — hook genérico con TypeScript

Un hook reutilizable que funciona con cualquier tipo gracias a generics:

```ts
const [searches, setSearches] = useLocalStorage<string[]>('gif-searches', [])
```

### mapGiphyToGif — capa de transformación

La API de Giphy devuelve objetos complejos con muchos campos. Esta función los transforma al tipo limpio que usa la app. Si Giphy cambia su API, solo se toca este lugar.

---

## 🛠️ Stack

| Tecnología | Uso |
|---|---|
| React 19 | UI y manejo de estado |
| TypeScript 5 | Tipado estático |
| Vite 6 | Bundler y dev server |
| CSS Modules | Estilos encapsulados |
| Giphy API | Fuente de los GIFs |

---

## 📄 Licencia

MIT — hacé lo que quieras con el código.

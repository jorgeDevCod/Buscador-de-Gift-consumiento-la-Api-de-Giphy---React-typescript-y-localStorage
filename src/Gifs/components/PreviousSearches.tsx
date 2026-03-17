import styles from "./PreviousSearches.module.css"


interface Props {
  searches: string[];
  onTermClicked: (term: string) => void
  onTermDeleted: (term: string) => void
  onReset: () => void
}

export const PreviousSearches = ({ searches, onTermClicked, onTermDeleted, onReset }: Props) => {

  const { history, historyHeader, historyLabel, resetBtn, list, chipBtn, deleteBtn } = styles

  if (searches.length === 0) return null


  return (
    <nav className={history}>
      <div className={historyHeader}>
        <span className={historyLabel}>Búsquedas recientes</span>
        <button className={resetBtn}
          type="button"
          onClick={onReset}
        >
          Borrar todas las busquedas
        </button>
      </div>

      <ul className={list}>
        {
          searches.map(term => (
            <li key={term}>
              <button
                className={chipBtn}
                type="button"
                onClick={() => onTermClicked(term)}
              >
                {term}
              </button>

              <button className={deleteBtn}
                type="button"
                onClick={() => onTermDeleted(term)}
                aria-label={`Eliminar ${term}`}
              >
                x
              </button>
            </li>
          ))
        }
      </ul>
    </nav>
  )
}


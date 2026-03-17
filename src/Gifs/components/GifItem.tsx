import type { Gif } from "../../types/gif.types"
import styles from "./GifItem.module.css"


interface Props {
  gif: Gif
}

export const GifItem = ({ gif }: Props) => {

  const { card } = styles

  return (
    <article className={card}>
      <img
        className={styles.image}
        src={gif.url}
        alt={gif.title}
        width={gif.width}
        height={gif.height}
        loading="lazy" />
      <p className={styles.title}>{gif.title}</p>
    </article>
  )
}


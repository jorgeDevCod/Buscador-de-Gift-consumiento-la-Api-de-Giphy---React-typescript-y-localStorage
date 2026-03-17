import type { Gif } from "../../types/gif.types";
import styles from "./GifGrid.module.css"
import { GifItem } from "./GifItem";

interface Props {
  gifs: Gif[];
}

export const GifGrid = ({ gifs }: Props) => {

  if (gifs.length === 0) return null;

  return (
    <section className={styles.grid}>

      {gifs.map(gif => (
        <GifItem key={gif.id} gif={gif} />
      ))}

    </section>
  )
}


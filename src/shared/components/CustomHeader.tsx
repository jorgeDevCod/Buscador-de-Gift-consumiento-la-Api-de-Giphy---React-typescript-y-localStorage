import styles from "./CustomHeader.module.css"


export const CustomHeader = () => {
  const { header, title, subtitle } = styles

  return (
    <header className={header}>
      <h1 className={title}>Buscador de GIFs</h1>
      <p className={subtitle}>Powered by Giphy</p>
    </header>
  )
}

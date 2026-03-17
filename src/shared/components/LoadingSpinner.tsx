import styles from "./LoadingSpinner.module.css"

export const LoadingSpinner = () => {

    const { wrapper, spinner, text } = styles;
    return (
        <div className={wrapper}>
            <div className={spinner} />
            <p className={text}>Buscando GIFs...</p>
        </div>
    )
}

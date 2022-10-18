import { SingInButton } from '../SignInButton'
import styles from './styles.module.scss'

export function Header() {
    return (
        <header className={styles.headerContainer}>
            <div className={styles.headerContent}>
                <img src="/images/logo.svg" alt="Logotipo" />
                <nav>
                    <a className={styles.active}>Home</a>
                    <a href="#">Posts</a>
                </nav>
                <SingInButton />
            </div>
        </header>
    )
}
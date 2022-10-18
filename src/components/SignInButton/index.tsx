import { FaGithub } from 'react-icons/fa'
import { FiX } from 'react-icons/fi'
import { useSession, signIn, signOut } from "next-auth/react"

import styles from './styles.module.scss'

export function SingInButton() {
    const {data: session} = useSession()
    return session ? (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signOut()}
        >
            <FaGithub color='#04d361' />
            João Felipe Lima
            <FiX color='#737380' className={styles.closeIcon} />
        </button>
    ) : (
        <button
            type="button"
            className={styles.signInButton}
            onClick={() => signIn('github')}
        >
            <FaGithub color='#eba417' />
            Sing in with Github
        </button>
    )
}
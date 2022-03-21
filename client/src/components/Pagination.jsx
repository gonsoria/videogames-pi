import React from 'react'
import styles from './styles/Pagination.module.css'

export default function Pagination({ cardsPerPage, totalCards, selectPage, activePage }) {

    const pages = []

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pages.push(i)
    }


    return (
        <div >
            <nav className={styles.nav_container}>
                {pages.map(num => (
                    <ul key={num} className={styles.button_container}>
                        <button onClick={() => selectPage(num)} className={`${activePage === num ? styles.active : styles.button}`}>
                            {num}
                        </button>
                    </ul>
                ))}
            </nav>

        </div>
    )
}

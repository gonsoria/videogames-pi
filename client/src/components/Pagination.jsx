import React from 'react'

export default function Pagination({ cardsPerPage, totalCards, selectPage }) {
    const pages = []

    for (let i = 1; i <= Math.ceil(totalCards / cardsPerPage); i++) {
        pages.push(i)
    }

    return (
        <div >
            <nav>
                {pages.map(num => (
                    <ul key={num}>
                        <button onClick={() => selectPage(num)}>
                            {num}
                        </button>
                    </ul>
                ))}
            </nav>
        </div>
    )
}

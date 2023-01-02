import React from "react";
import styles from '../styles/Paginado.module.css'

export default function Paginado ({videogamesPerPage, allVideogames, pages}) {
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className={styles.numbersContainer}>
                {
                    pageNumbers?.map((number) => {
                        return (
                        <li key={number}>
                            <button onClick={() => pages(number)} className={styles.pageNumbers} >{number}</button>
                        </li>
                        )
                    })
                }
            </ul>
        </nav>
    )
}
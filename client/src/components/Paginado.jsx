import React from "react";
import styles from '../styles/Paginado.module.css'

export default function Paginado ({videogamesPerPage, allVideogames, pages, currentPage}) {
    const pageNumbers = [];
    
    for (let i = 1; i <= Math.ceil(allVideogames/videogamesPerPage); i++) {
        pageNumbers.push(i);
    }

    function handlePrev() {
        pageNumbers.includes(currentPage-1) && pages(currentPage-1)
    }

    function handleNext() {
        pageNumbers.includes(currentPage+1) && pages(currentPage+1)
    }

    return(
        <nav>  
            <ul className={styles.numbersContainer}>
                <li><button onClick={handlePrev} className={styles.pageNumbers} disabled={currentPage === 1}>⇦</button></li>
                {
                    pageNumbers?.map((number) => {
                        return (
                        <li key={number}>
                            <button 
                            onClick={() => pages(number)} 
                            className={currentPage === number ? styles.currentNumber : styles.pageNumbers}
                            >{number}</button>
                        </li>
                        )
                    })
                }
                <li><button onClick={handleNext} className={styles.pageNumbers} disabled={!pageNumbers.includes(currentPage+1)}>⇨</button></li>
            </ul>

        </nav>
    )
}
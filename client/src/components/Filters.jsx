import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { filterByOrigin, filterVideogamesByGenre, getVideogames, getGenres, sort, cleanVideogames } from "../redux/actions";
import styles from "../styles/Filters.module.css";

export default function Filters({pages}) {

    const dispatch = useDispatch();
    const genres = useSelector((state) => state.genres);

    function handleFilterByGenre(event) {
        dispatch(cleanVideogames())
        dispatch(filterVideogamesByGenre(event.target.value))
        dispatch(getVideogames()) 
        pages(1)
    }

    function handleFilterByOrigin(event) {
        dispatch(cleanVideogames())
        dispatch(filterByOrigin(event.target.value))
        dispatch(getVideogames())
        pages(1)
    }

    function handleSort(event) {
        dispatch(sort(event.target.value))
        dispatch(getVideogames())
    }

    useEffect(() => {
        dispatch(getGenres())
    },[dispatch])


    return(
        <div className={styles.filtersContainer}>
            
                <select onChange={(event)=> handleSort(event)} className={styles.selectFilters}>
                    <option value='' hidden>Sort</option>
                    <option value='A-Z'>A-Z</option>
                    <option value='Z-A'>Z-A</option>
                    <option value='5-0'>Best valued</option>
                    <option value='0-5'>Worst valued</option>
                </select>
           
                <select onChange={(event) => handleFilterByOrigin(event)} className={styles.selectFilters}>
                    <option value='' hidden>Filter by origin</option>
                    <option value='Created'>Created By User</option>
                    <option value='Api'>From Api</option>
                </select>
           
                <select onChange={(event) => handleFilterByGenre(event)} className={styles.selectFilters}>
                    <option value='' hidden>Filter by genre</option>

                   { genres.map((genre) => {
                        return(
                            <option
                            key={genre.id}
                            >{genre.name}</option>
                            )
                        })}
                </select>
           
        </div>

    )
}
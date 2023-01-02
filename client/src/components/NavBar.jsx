import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGame, restoreGames, getVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Filters from './Filters';
import styles from '../styles/NavBar.module.css';

export default function NavBar() {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(event) {

        event.preventDefault();
        if(search.length) {
            dispatch(searchGame(search))
        }
    }

    function handleRestoreGames() {
        dispatch(restoreGames())
        dispatch(getVideogames())
        setSearch("");
        //aca tmb podria agregar que limpie los filtros que quedan "puestos" en los select
    }
        
  
    return(
        <div className={styles.navContainer}>
            <div>
                <button onClick={handleRestoreGames} className={styles.navButtons}>Restore Games</button>
            </div>
            <div className={styles.searchContainer}>
                <input 
                    type='text' 
                    placeholder="Search game..." 
                    value={search} 
                    onChange={(event) => setSearch(event.target.value)}
                    className={styles.search}
                    >
                </input>
                <button type="submit" onClick={(event) => handleSubmit(event)} className={styles.navButtons}>Search</button>
            </div>
            <div>
                <Filters />
            </div>
            <div>
                <Link to="/addGame" className={styles.addGameLink}><button className={styles.navButtons}>Add Game</button></Link>
            </div>

        </div>
    )
}

import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { searchGame, restoreGames, getVideogames, cleanVideogames } from "../redux/actions";
import { Link } from "react-router-dom";
import Filters from './Filters';
import styles from '../styles/NavBar.module.css';

export default function NavBar({pages}) {

    const [search, setSearch] = useState("");
    const dispatch = useDispatch();

    function handleSubmit(event) {

        event.preventDefault();
        if(search.length) {
            dispatch(searchGame(search))
            pages(1)
        }
    }

    function handleRestoreGames() {
        dispatch(cleanVideogames())
        dispatch(restoreGames())
        dispatch(getVideogames())
        setSearch("");
        //aca tmb podria agregar que limpie los filtros que quedan "puestos" en los select
    }
        
  
    return(
        <div className={styles.navContainer}>
            <div className={styles.logoAndRestore}>
                <Link to="/">
                <div className={styles.logoContainer}><img src="https://i.pinimg.com/originals/b9/ab/17/b9ab174206571509bfac1379ea8c95f7.jpg" alt="" className={styles.logoImg}/></div>
                </Link>
                <div>
                    <button onClick={handleRestoreGames} className={styles.navButtons}>Reload Games</button>
                </div>
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
                <Filters 
                pages={pages}
                />
            </div>
            <div>
                <Link to="/addGame" className={styles.addGameLink}><button className={styles.navButtons}>Add Game</button></Link>
            </div>

        </div>
    )
}

import React from 'react';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Loading from "./Loading";

import {getVideogames } from '../redux/actions';
import Card from '../components/Card'
import Paginado from './Paginado';
import NavBar from './NavBar';
import styles from '../styles/Home.module.css'

export default function Home() {
    const dispatch = useDispatch();
    const allVideogames = useSelector((state) => state.videogames);

    const [currentPage, setCurrentPage] = useState(1) 
    const videogamesPerPage = 15;
    const indexOfLastVideogame = currentPage * videogamesPerPage 
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage 
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) 

    const pages = (pageNumber) => {
        setCurrentPage(pageNumber);
    }

    useEffect(() => {
        dispatch(getVideogames());
    },[dispatch])

    return(
        <>
            <div>
                { !allVideogames[0] && <Loading/> } 
            </div>
            <div className={styles.home}>
                <div>
                <NavBar
                pages={pages}/>  
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                pages={pages}
                currentPage={currentPage}
                />
                </div>
                
                <div className={styles.cardContainer} >
                {  
                    currentVideogames?.map((game) => {
                        return(
                            <Link to={`/home/${game.id}`} key={game.id}>
                                <Card
                                key = {game.id}
                                name = {game.name}
                                genres = {game.genres}
                                image = {game.image}
                                />
                            </Link>
                        )
                    }) 
                }
                </div>

            </div>
        </>
    )
}
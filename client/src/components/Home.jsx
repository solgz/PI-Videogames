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

    const [currentPage, setCurrentPage] = useState(1) //declaro estado local de la pagina actual (que arranca en 1)
    const [videogamesPerPage, setVideogamesPerPage] = useState(15) //declaro otro estado local que define la cantidad de juegos x pag
    const indexOfLastVideogame = currentPage * videogamesPerPage //seteo el indice del ult juego, que es el resultado de multiplicar la pag actual x la cant de juegos x pag
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage //seteo el indice del 1er juego
    const currentVideogames = allVideogames.slice(indexOfFirstVideogame, indexOfLastVideogame) //esta constante recibe todos los personajes y recorta el array en base al indice del 1er juego y el indice del ult

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
                <NavBar/>  
                <Paginado
                videogamesPerPage={videogamesPerPage}
                allVideogames={allVideogames.length}
                pages={pages}
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
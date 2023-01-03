import styles from '../styles/CardStyles.module.css'
import React from 'react';

export default function Card({id, name, image, genres, Genres}) {
    //en Genres no me esta llegando nada
    console.log(Genres) 
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                <img src={image} alt="Game cover" className={styles.cardImg}/>
            </div>

            <div className={styles.infoContainer}>
                <h2>{name}</h2>
                <h3>
                    {/* {genres.map((gen) => {
                            return " - " + gen 
                        })} Con este se rompe la pag donde estan los juegos de la db */}
                    {/* CON ESTE QUE ESTA ABAJO NO SE ROMPE NINGUNA PAG PERO NO TRAE GENEROS DE LOS JUEGOS DE DB*/}
                    { genres?.map((gen) => {
                        return " - " + gen
                    })
                    }
                    {Genres?.map((gen) => {
                        return " - " + gen
                    })}

                    {/* { con este no me muestra ni los generos de los juegos de la api ni los de la db
                            isNaN(id)
                            ? Genres?.map((gen) => {
                                    return " - " + gen
                            })
                            : genres?.map((gen) => {
                                return " - " + gen
                            })
                        } */}
                </h3>
            </div>
        </div>
    )
}


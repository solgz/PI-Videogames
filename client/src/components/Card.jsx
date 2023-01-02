import styles from '../styles/CardStyles.module.css'
import React from 'react';

export default function Card({id, name, image, genres, Genres}) {
 
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
                        })} */}
                    { genres?.map((gen) => {
                        return " - " + gen
                    })
                    }
                    {Genres?.map((gen) => {
                        return " - " + gen
                    })}
                </h3>
            </div>
        </div>
    )
}


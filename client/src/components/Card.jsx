import styles from '../styles/CardStyles.module.css'
import React from 'react';

export default function Card({name, image, genres}) {
    return (
        <div className={styles.card}>
            <div className={styles.imgContainer}>
                {image 
                ?  <img src={image} alt="Game cover" className={styles.cardImg}/> 
                : <img src="https://alicepos.com/wp-content/uploads/2018/08/video_games_header_2022.jpg" alt="Game cover" className={styles.cardImg} />} 
            </div>

            <div className={styles.infoContainer}>
                <h2>{name}</h2>
                <h3>
                    { genres?.map((gen) => {
                        return " - " + gen
                    })
                    }
                </h3>
            </div>
        </div>
    )
}


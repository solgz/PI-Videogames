import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

export default function LandingPage() {
    return(
        <div className={styles.wholeLanding}>
            <div className={styles.border} >
                <div className={styles.imgContainer}><img src="https://i.pinimg.com/originals/b9/ab/17/b9ab174206571509bfac1379ea8c95f7.jpg" alt="" className={styles.cardImg}/></div>
                <Link to='/home' className={styles.videogamesLink}>
                    <h1 className={styles.videogamesTitle}>Videogames App</h1>
                </Link>
            </div>
        </div>
    )
}
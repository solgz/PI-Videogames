import React from 'react';
import {Link} from 'react-router-dom';
import styles from '../styles/LandingPage.module.css';

export default function LandingPage() {
    return(
        <div className={styles.wholeLanding}>
            <Link to='/home' className={styles.videogamesLink}> <h1 className={styles.videogamesTitle}>Videogames App</h1></Link>
        </div>
    )
}
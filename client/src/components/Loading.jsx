import React from 'react';
import styles from '../styles/Loading.module.css';

export default function Loading () {
    return(
        <div className={styles.wholeLoading}>
            <h1 className={styles.loadingTitle}>Loading...</h1>
        </div>
    )
}
import React from 'react';
import styles from '../styles/Loading.module.css';

export default function Error () {
    return(
        <div className={styles.wholeError}>
            <h1 className={styles.errorTitle}>Error 404 NOT FOUND</h1>
        </div>
    )
}
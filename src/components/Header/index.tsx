import React from 'react';
import styles from './styles.module.scss';
import { useHeroes } from '../../hooks/useHeroes';

export function Header() {
    const { handleChange } = useHeroes();

    return(
        <>
            <div className={styles.container}>
                <div className={styles.content}>
                    <p>Pesquisar</p>
                    <input
                      type='text'
                      id='heroSearch'
                      placeholder='Pesquisar'
                      onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
}
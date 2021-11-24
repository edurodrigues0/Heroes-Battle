import styles from './styles.module.scss';
import { useHeroes } from '../../hooks/useHeroes';

export function Card() {
    const { heroesFiltered, createBattle, battle, battleHero, openModal } = useHeroes();

    function modalIsOpen(id: number) {
        createBattle(id);
        battle(id)

        if(battleHero.length === 1) {
            openModal();
        }
    }

    return(
        <div className={styles.container}>
            {heroesFiltered.map(hero => {
                return(
                    <div className={styles.cardContainer} key={hero.id}>
                        <p>{hero.name}</p>
                        <button onClick={() => modalIsOpen(hero.id)}>
                            <img src={hero.images.sm} alt={hero.name} />
                        </button>
                    </div>
                )
            })} 
        </div>
    );
}
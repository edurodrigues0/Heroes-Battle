import Modal from 'react-modal';
import styles from './styles.module.scss';
import { useHeroes } from '../../hooks/useHeroes';

export function BattleModal() {
    const { battleHero, closeModal, modalIsOpen, winner, newWinner } = useHeroes();

    if(modalIsOpen === true) {
        newWinner()
    }
    return(
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            overlayClassName={styles.reactModalOverlay}
            className={styles.reactModalContent}
        >
            <h1><span>Winner</span> {winner}</h1>
            <div className={styles.Container}>
                    {battleHero.map(hero => {
                        return(
                            <div className={styles.Content} key={hero.id}>
                                <h2>{hero.name}</h2>
                                <img src={hero.images.sm} alt={hero.name} />
                                <div>
                                    <p>intelligence: {hero.powerstats.intelligence}</p>
                                    <p>strength: {hero.powerstats.strength}</p>
                                    <p>speed: {hero.powerstats.speed}</p>
                                    <p>durability: {hero.powerstats.durability}</p>
                                    <p>power: {hero.powerstats.power}</p>
                                    <p>combat: {hero.powerstats.combat}</p>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </Modal>
    );
}
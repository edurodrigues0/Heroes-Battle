import { ReactNode, createContext, useContext, useEffect, useState } from 'react';

import { Heroes } from '../types';
import { api } from '../services/api';

interface HeroesProviderProps {
    children: ReactNode;
}

interface HeroesContextData {
    handleChange: (e: any) => void;
    createBattle: (id: number) => void;
    battle: (id: number) => void;
    closeModal: () => void;
    openModal: () => void;
    newWinner: () => void;
    modalIsOpen: boolean;
    heroesFiltered: Heroes[];
    battleHero: Heroes[];
    winner: string;
}

const HeroesContext = createContext<HeroesContextData>(
    {} as HeroesContextData
)

export function HeroesProvider({ children }: HeroesProviderProps) {
    const [heroes, setHeroes] = useState<Heroes[]>([])
    const [battleHero, setBattleHero] = useState<Heroes[]>([]);  
    const [searchField, setSearchField] = useState('')
    const [modalIsOpen, setIsOpen] = useState(false);
    const [heroRightFullPower, setHeroRightFullPower] = useState(0);
    const [heroLeftFullPower, setHeroLeftFullPower] = useState(0);
    const [winner, setWinner] = useState('')
    
    useEffect(() => {
        api.get('/')
        .then(response => {
            setHeroes(response.data)
        })
    }, [])
    
    const heroesFiltered = heroes.filter(hero => {
        return (hero.name.toLowerCase()).startsWith(searchField.toLocaleLowerCase());
    })
    
    function handleChange(e: any) {
        setSearchField(e.target.value)
    }

    function createBattle(id: number) {
        const newHero = [...heroes]
        const heroIndex = newHero.findIndex(hero => hero.id === id)

        setBattleHero([...battleHero, heroes[heroIndex]])

        if(battleHero.length === 0) {
            setBattleHero([heroes[heroIndex]])
        }
    }

    function battle(id: number) {
        const heroIndex = heroes.findIndex(hero => hero.id === id)
        
        const heroRightIntelligence = heroes[heroIndex].powerstats.intelligence;
        const heroRightStrength = heroes[heroIndex].powerstats.strength;
        const heroRightSpeed = heroes[heroIndex].powerstats.speed;
        const heroRightDurability = heroes[heroIndex].powerstats.durability;
        const heroRightPower = heroes[heroIndex].powerstats.power;
        const heroRightCombat = heroes[heroIndex].powerstats.combat;

        const heroLeftIntelligence = battleHero[0]?.powerstats.intelligence;
        const heroLeftStrength = battleHero[0]?.powerstats.strength;
        const heroLeftSpeed = battleHero[0]?.powerstats.speed;
        const heroLeftDurability = battleHero[0]?.powerstats.durability;
        const heroLeftPower = battleHero[0]?.powerstats.power;
        const heroLeftCombat = battleHero[0]?.powerstats.combat;
        
        setHeroRightFullPower(heroRightIntelligence + heroRightStrength + heroRightSpeed + heroRightDurability + heroRightCombat + heroRightPower);
        
        setHeroLeftFullPower(heroLeftIntelligence + heroLeftStrength + heroLeftSpeed + heroLeftDurability + heroLeftCombat + heroLeftPower);
    }
    
    function openModal() {
        setIsOpen(true);
    }
      
    function closeModal() {
        setIsOpen(false);
        setBattleHero([]);
        setWinner('');
        setHeroLeftFullPower(0);
        setHeroRightFullPower(0);
    }

    function newWinner() {
        // heroLeftFullPower > heroRightFullPower ? setWinner(battleHero[0]?.name) : setWinner(battleHero[1]?.name)
        if (heroLeftFullPower === heroRightFullPower)
            return setWinner('Empate')
        if (heroLeftFullPower > heroRightFullPower)
            return setWinner(battleHero[0]?.name) 
        if (heroLeftFullPower < heroRightFullPower)
            return setWinner(battleHero[1]?.name)
    }
    
    return(
        <HeroesContext.Provider
          value={{handleChange,
          heroesFiltered,
          winner,
          newWinner,
          createBattle,
          battleHero,
          closeModal,
          openModal,
          battle,
          modalIsOpen}}
        >
            {children}
        </HeroesContext.Provider>
    );
}

export function useHeroes() {
    const context = useContext(HeroesContext);

    return context;
}

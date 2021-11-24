import { BattleModal } from './components/BattleModal';
import { Card } from './components/Card';
import { Header } from './components/Header';
import { HeroesProvider } from './hooks/useHeroes';
import Modal from 'react-modal';

Modal.setAppElement('#root');

export function App() {
  return (
    <HeroesProvider>
      <Header />
      <BattleModal />
      <Card />
    </HeroesProvider>
  );
}

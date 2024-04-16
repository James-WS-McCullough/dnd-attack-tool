import { ChakraProvider } from '@chakra-ui/react';
import AttackForm from './AttackForm';
import DiceComponent from './components/DiceComponent';
import DamageDiceComponent from './components/DamageDiceComponent';

function App() {
  return (
    <ChakraProvider>
      <AttackForm />
      <DamageDiceComponent />
    </ChakraProvider>
  );
}

export default App;
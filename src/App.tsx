import { ChakraProvider } from '@chakra-ui/react';
import AttackForm from './AttackForm';
import DamageDiceComponent from './DamageDiceComponent';

function App() {
  return (
    <ChakraProvider>
      <AttackForm />
      <DamageDiceComponent />
    </ChakraProvider>
  );
}

export default App;
import { ChakraProvider } from '@chakra-ui/react';
import AttackForm from './AttackForm';

function App() {
  return (
    <ChakraProvider>
      <AttackForm />
    </ChakraProvider>
  );
}

export default App;
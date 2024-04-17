import { ChakraProvider, DarkMode, extendBaseTheme, extendTheme } from '@chakra-ui/react';
import AttackForm from './AttackForm';
import DiceComponent from './components/DiceComponent';
import DamageDiceComponent from './components/DamageDiceComponent';
import theme from './theme';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <AttackForm />
    </ChakraProvider>
  );
}

export default App;
import { ChakraProvider, DarkMode, extendBaseTheme, extendTheme } from '@chakra-ui/react';
import DiceComponent from './components/DiceComponent';
import DamageDiceComponent from './components/DamageDiceComponent';
import theme from './theme';
import InitiativeTracker from './components/IniciativeTracket';

function App() {

  return (
    <ChakraProvider theme={theme}>
      <InitiativeTracker />
    </ChakraProvider>
  );
}

export default App;
import { extendTheme } from "@chakra-ui/react"; // eslint-disable-next-line
import { Fonts } from "./fonts";

// Global style overrides
import styles from './styles';

// Color style overrides
import colors from './colors';

// Components style overrides
import Button from './components/Button';
import Heading from './components/Heading';
import Modal from './components/Modal';

const theme = extendTheme({
   colors,
   styles,
   components: {
      Button,
      Heading,
      Modal
   },
   fonts: {
      heading: "Inter",
      body: "Inter",
   },
   config: {
      useSystemColorMode: false,
      initialColorMode: "dark",
   },
   shadows: {
      outline: "none"
   },
})

export default theme;
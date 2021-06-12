import React from 'react';
import { Stack, Flex, Heading, Button } from '@chakra-ui/react';
import ScrimCards from './components/ScrimCards';

function Scrims(props) {
   return (
      <Stack>
         <Flex align="center">
            <Heading mr="2">Find Scrims</Heading>
            <Button size="sm" px="4">EU</Button>
         </Flex>
         <ScrimCards />
      </Stack>
   );
}

export default Scrims;
import React from 'react';
import { Stack, Button, Accordion } from '@chakra-ui/react';
import TeamCard from './components/TeamCard';
import HubsAccordion from './components/HubsAccordion';
import CreateScrim from '../Scrims/components/CreateScrim';

function Sidebar(props) {
   return (
      <Stack px="5" py="5" minW="310" bg="gray.800" h="100%">
         <Stack mb="3">
            <TeamCard name="Fnatic" membersNumber={2} />
            <Button size="xs">Change team</Button>
         </Stack>
         <Accordion defaultIndex={[0]} allowToggle allowMultiple>
            <HubsAccordion />
         </Accordion>
         <CreateScrim />
      </Stack>
   );
}

export default Sidebar;
import React from 'react';
import { Text, AccordionItem, AccordionPanel, AccordionButton, AccordionIcon } from '@chakra-ui/react';
import HubCard from './HubCard';

function HubsAccordion(props) {
   return (
      <AccordionItem border="none">
         <AccordionButton px="2" borderRadius="xl" _hover={{bg: "gray.800"}}>
            <Text fontSize="sm" fontWeight="500">Hubs</Text>
            <AccordionIcon />
         </AccordionButton>
         <AccordionPanel>
            <HubCard name="ProTeams" scrimsGoing={5} />
            <HubCard name="SilverNoobs" scrimsGoing={12} />
            <HubCard name="Pediks" scrimsGoing={8} />
         </AccordionPanel>
      </AccordionItem>
   );
}

export default HubsAccordion;
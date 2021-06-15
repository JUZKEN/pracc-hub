import React, { useState, useEffect } from 'react';
import { Stack, Heading, Flex } from '@chakra-ui/react';
import HubCards from './components/HubCards';
import FilterHubs from './components/FilterHubs';

function Hubs({ items }) {
   const [ hubs, setHubs ] = useState();

   useEffect(() => {
      // todo: get hubs from api and setHubs state
      setTimeout(() => {
         const hubs = [
            { id: 1, name: "Pro Teams", type: "public",  teams: [1, 2, 3, 4, 5, 6]},
            { id: 2, name: "Pediks", type: "invite",  teams: [1, 2, 3, 4, 5]},
            { id: 3, name: "Only Lose", type: "invite",  teams: [1, 2, 3, 4, 5, 6]},
            { id: 4, name: "Pediks", type: "invite",  teams: [1, 2, 3, 4]},
            { id: 5, name: "Only Lose", type: "invite",  teams: [1, 2, 3, 4, 5, 6]},
            { id: 6, name: "Pro Teams", type: "public",  teams: [1, 2]},
         ];
         setHubs([...hubs]);
      }, 1000);
      
   }, [])

   const handleFilter = (filters) => {
      console.log(filters)
   }

   return (
      <Stack>
         <Flex justifyContent="space-between">
            <Flex>
               <Heading mr="3">Find Hubs</Heading>
            </Flex>
            <FilterHubs onFilter={handleFilter} />
         </Flex>
         <HubCards items={hubs} />
      </Stack>
   );
}

export default Hubs;
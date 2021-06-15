import React, { useEffect, useState } from 'react';
import { Stack, Flex, Heading, Button } from '@chakra-ui/react';
import ScrimCards from './components/ScrimCards';
import FilterScrims from './components/FilterScrims';

function Scrims(props) {
   const [ scrims, setScrims ] = useState();

   useEffect(() => {
      setTimeout(() => {
         const scrims = [
            { id: 1, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" },
            { id: 2, team: "Fnatic", date: "Today at 18:00h", maps: "Bind, Icebox" },
            { id: 3, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" },
            { id: 4, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" }
         ];
         setScrims([...scrims]);
      }, 1000)
      
   }, [])

   const handleFilter = (filters) => {
   }

   return (
      <Stack>
         <Flex justifyContent="space-between">
            <Flex>
               <Heading mr="3">Find Scrims</Heading>
               <Button size="sm" px="4" mt="1">EU</Button>
            </Flex>
            <FilterScrims onFilter={handleFilter} />
         </Flex>
         <ScrimCards items={scrims} />
      </Stack>
   );
}

export default Scrims;
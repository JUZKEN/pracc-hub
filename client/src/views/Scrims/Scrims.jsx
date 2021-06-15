import React, { useEffect, useState } from 'react';
import { Stack, Flex, Heading } from '@chakra-ui/react';
import ScrimCards from './components/ScrimCards';
import FilterScrims from './components/FilterScrims';
import RegionSelect from './components/RegionSelect';

function Scrims(props) {
   const [ region, setRegion ] = useState();
   const [ scrims, setScrims ] = useState();

   useEffect(() => {
      // todo: get scrims from api and setScrims state
      // todo: get selected region from cache and setRegion state
      setRegion("eu");

      setTimeout(() => {
         const scrims = [
            { id: 1, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" },
            { id: 2, team: "Fnatic", date: "Today at 18:00h", maps: "Bind, Icebox" },
            { id: 3, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" },
            { id: 4, team: "Team Liquid", date: "Today at 16:00h", maps: "Bind, Ascent, Icebox" }
         ];
         setScrims([...scrims]);
      }, 1000);
      
   }, [])

   const handleFilter = (filters) => {
   }

   const handleRegionSelect = (value) => {
      setRegion(value);
   }

   return (
      <Stack>
         <Flex justifyContent="space-between">
            <Flex>
               <Heading mr="3">Find Scrims</Heading>
               <RegionSelect current={region} onSelect={handleRegionSelect} />
            </Flex>
            <FilterScrims onFilter={handleFilter} />
         </Flex>
         <ScrimCards items={scrims} />
      </Stack>
   );
}

export default Scrims;
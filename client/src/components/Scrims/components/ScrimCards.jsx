import React from 'react';
import { SimpleGrid, Heading, Stack, Skeleton } from '@chakra-ui/react';
import ScrimCardsItem from './ScrimCardsItem';
import { RiZzzFill } from 'react-icons/ri';

function ScrimCards({ items }) {

   const buildSkeletons = () => {
      let skeletons = [];
      for (var i = 0; i < 6; i++)
         skeletons.push(<Skeleton borderRadius="xl" h="220px" />);
      return skeletons;
   }

   return (
      <SimpleGrid minChildWidth="370px" columns={3} spacing={5} py="4">
         {!items &&
         <React.Fragment>
            {buildSkeletons()}
         </React.Fragment>
         }
         {items && items.length === 0 &&
            <Stack align="center" justify="center" h="300px">
               <RiZzzFill size={26} />
               <Heading size="md">No Scrims at the moment!</Heading>
            </Stack>
         }
         {items && items.map(scrim => {
            return(
               <ScrimCardsItem key={scrim.id} scrim={scrim} />
            )
         })}
      </SimpleGrid>
   )
}

export default ScrimCards;
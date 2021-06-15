import React from 'react';
import { SimpleGrid, Heading, Stack, Skeleton } from '@chakra-ui/react';
import { RiZzzFill } from 'react-icons/ri';
import HubCardsItem from './HubCardsItem';

function HubCards({ items }) {

   const buildSkeletons = () => {
      let skeletons = [];
      for (var i = 0; i < 9; i++)
         skeletons.push(<Skeleton key={i} borderRadius="xl" h="112px" />);
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
               <Heading size="md">No Hubs at the moment!</Heading>
            </Stack>
         }
         {items && items.map(hub => {
            return(
               <HubCardsItem key={hub.id} hub={hub} />
            )
         })}
      </SimpleGrid>
   )
}

export default HubCards;
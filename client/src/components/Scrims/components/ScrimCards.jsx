import React from 'react';
import { SimpleGrid } from '@chakra-ui/react';
import ScrimCardsItem from './ScrimCardsItem';

function ScrimCards(props) {
   return (
      <SimpleGrid columns={3} spacing={5} py="4">
         <ScrimCardsItem team="Team Liquid" date="Today at 16:00h" maps="Bind, Ascent, Icebox" />
         <ScrimCardsItem team="Sentinels" date="Tomorrow at 18:00h" maps="Bind, Icebox" />
         <ScrimCardsItem team="Team Liquid" date="Today at 16:00h" maps="Bind, Ascent, Icebox" />
         <ScrimCardsItem team="Sentinels" date="Tomorrow at 18:00h" maps="Bind, Icebox" />
         <ScrimCardsItem team="Team Liquid" date="Today at 16:00h" maps="Bind, Ascent, Icebox" />
         <ScrimCardsItem team="Sentinels" date="Tomorrow at 18:00h" maps="Bind, Icebox" />
      </SimpleGrid>
   );
}

export default ScrimCards;
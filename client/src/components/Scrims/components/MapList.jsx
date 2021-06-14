import React from 'react';
import { Wrap, WrapItem, Avatar, Text, Stack } from '@chakra-ui/react';

function MapList({ name, items, isSelected, onSelect }) {
   return (
      <Wrap spacing={4}>
         {items.map(item => {
            return(
               <WrapItem key={item} onClick={() => onSelect(item, name)} opacity={isSelected(item, name) ? 1.0 : 0.3} cursor="pointer" transitionDuration="0.2s">
                  <Stack>
                     <Text textTransform="capitalize" color="white" fontWeight="bold" mb={-1}>{item}</Text>
                     <Avatar size="xl" borderRadius="xl" bg="gray.800" src={process.env.PUBLIC_URL+`/img/maps/${item}.jpg`} />
                  </Stack>
               </WrapItem>
            )
         })}
      </Wrap>
   );
}

MapList.defaultProps = {
   name: "maps"
}

export default MapList;
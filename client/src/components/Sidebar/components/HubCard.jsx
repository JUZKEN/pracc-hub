import React from 'react';
import { Flex, Avatar, Text, Badge } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function HubCard({ name, scrimsGoing }) {
   return (
      <NavLink to="/hub">
         <Flex align="center" borderRadius="10" p="2" _hover={{bg:"gray.700"}}>
            <Avatar size="sm" name={name} bg="gray.600" mr="2" />
            <Flex align="center">
               <Text fontSize="sm" fontWeight="500" mr="1">
                  {name}
               </Text>
               <Badge textTransform="initial" colorScheme="green" mt="0">{scrimsGoing} Scrims</Badge>
            </Flex>
         </Flex>
      </NavLink>
   );
}

export default HubCard;
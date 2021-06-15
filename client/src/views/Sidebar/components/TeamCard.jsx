import React from 'react';
import { Flex, Avatar, Text, Badge } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function TeamCard({ name }) {
   return (
      <NavLink to="/team">
         <Flex flexWrap="wrap" justifyContent="center" align="flex-start" borderRadius="xl" px="2" p="4" pb="5" _hover={{bg:"gray.700"}}>
            <Flex w="100%" justifyContent="center">
               <Avatar size="xl" name={name} bg="gray.600" mb="1" />
            </Flex>
            <Text w="100%" mb="1" textAlign="center" fontSize="md" fontWeight="500">{name}</Text>
            <Badge variant="solid" textTransform="initial" mt="0">Active team</Badge>
         </Flex>
      </NavLink>
   );
}

export default TeamCard;
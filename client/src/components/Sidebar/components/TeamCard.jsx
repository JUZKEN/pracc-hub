import React from 'react';
import { Flex, Avatar, AvatarGroup, Stack, Text, Badge } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function TeamCard({ name }) {
   return (
      <NavLink to="/team">
         <Flex align="flex-start" borderRadius="10" px="2" py="3" _hover={{bg:"gray.700"}}>
            <Avatar size="lg" name={name} bg="gray.600" mr="2" />
            <Stack align="flex-start">
               <Flex align="center">
                  <Text fontSize="md" fontWeight="500" mr="1">{name}</Text>
                  <Badge textTransform="initial" bg="gray.600" mt="0">Current team</Badge>
               </Flex>
               <AvatarGroup size="xs" max={2}>
                  <Avatar />
                  <Avatar />
                  <Avatar />
               </AvatarGroup>
            </Stack>
         </Flex>
      </NavLink>
   );
}

export default TeamCard;
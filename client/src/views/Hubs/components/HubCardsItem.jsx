import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Heading, Stack, Button, Avatar } from '@chakra-ui/react';

function HubCardsItem({ hub }) {

   const handleJoinRequest = (e) => {
      e.preventDefault();
   }

   return (
      <NavLink to={`/hub/${hub.id}`}>
         <Box bg="gray.800" borderRadius="xl" padding="4" transition="all 0.15s ease-in-out" userSelect="none" _hover={{transform: "scale(1.04)"}}>
            <Stack>
               <Flex justify="space-between" mb="4">
                  <Flex align="center">
                     <Avatar bg="gray.500" color="white" name={hub.name} size="lg" mr="3" />
                     <Stack>
                        <Heading size="sm" mb="-1">{hub.name}</Heading>
                        <Text textTransform="capitalize">{hub.type}</Text>
                     </Stack>
                  </Flex>
                  <Button
                     onClick={handleJoinRequest}
                     size="md"
                     variant={hub.type === "public" ? "red" : "default"}>
                     {hub.type === "public" ? "Join" : "Apply"}
                  </Button>
               </Flex>
            </Stack>
         </Box>
      </NavLink>
   );
}

export default HubCardsItem;
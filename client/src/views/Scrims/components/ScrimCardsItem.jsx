import React from 'react';
import { NavLink } from 'react-router-dom';
import { Box, Flex, Text, Heading, Stack, Button, AvatarGroup, Avatar } from '@chakra-ui/react';

function ScrimCardsItem({ scrim }) {

   const handleJoinRequest = (e) => {
      e.preventDefault();
   }

   return (
      <NavLink to={`/scrim/${scrim.id}`}>
         <Box bg="gray.800" borderRadius="xl" padding="4" transition="all 0.15s ease-in-out" userSelect="none" _hover={{transform: "scale(1.04)", cursor: "pointer"}}>
            <Stack>
               <Box mb="5">
                  <Flex align="center" mb="4">
                     <Avatar bg="gray.500" color="white" name={scrim.team} size="md" mr="2" />
                     <Stack>
                        <Heading size="sm" mb="-1">{scrim.team}</Heading>
                        <Text fontSize="xs" fontWeight="500">{scrim.date}</Text>
                     </Stack>
                  </Flex>
                  <AvatarGroup size="lg">
                     <Avatar borderRadius="xl" bg="gray.800" src={process.env.PUBLIC_URL+'/img/maps/split.jpg'} />
                     <Avatar borderRadius="xl" bg="gray.800" src={process.env.PUBLIC_URL+'/img/maps/bind.jpg'} />
                     <Avatar borderRadius="xl" bg="gray.800" src={process.env.PUBLIC_URL+'/img/maps/ascent.jpg'} />
                  </AvatarGroup>
               </Box>
               <Flex>
                  <Button
                     onClick={handleJoinRequest}
                     size="sm"
                     flexGrow="2">
                     Request to join
                  </Button>
               </Flex>
            </Stack>
         </Box>
      </NavLink>
   );
}

export default ScrimCardsItem;
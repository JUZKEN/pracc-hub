   import React from 'react';
   import { NavLink } from 'react-router-dom';
   import { Box, Flex, Text, Heading, Stack, Button, AvatarGroup, Avatar } from '@chakra-ui/react';

   function ScrimCardsItem({ id, team, maps, date }) {
      return (
         <Box bg="gray.800" borderRadius="10" padding="4" transition="all 0.15s ease-in-out" userSelect="none" _hover={{transform: "scale(1.04)", cursor: "pointer"}}>
            <Stack>
               <Box mb="5">
                  <Flex align="center" mb="4">
                     <Avatar bg="gray.500" color="white" name={team} size="md" mr="2" />
                     <Stack>
                        <Heading size="sm" mb="-1">{team}</Heading>
                        <Text fontSize="xs" fontWeight="500">{date}</Text>
                     </Stack>
                  </Flex>
                  <AvatarGroup size="lg">
                     <Avatar borderRadius="10" src={process.env.PUBLIC_URL+'/img/maps/split.png'} />
                     <Avatar borderRadius="10" src={process.env.PUBLIC_URL+'/img/maps/bind.jpg'} />
                     <Avatar borderRadius="10" src={process.env.PUBLIC_URL+'/img/maps/split.png'} />
                  </AvatarGroup>
               </Box>
               <Flex>
                  <Stack mr="3" flexGrow="1" >
                     <NavLink to={`/scrim/${id}`}>
                        <Button w="100%" variant="red">View</Button>
                     </NavLink>
                  </Stack>
                  <Button flexGrow="2" >Request to join</Button>
               </Flex>
            </Stack>
         </Box>
      );
   }

   export default ScrimCardsItem;
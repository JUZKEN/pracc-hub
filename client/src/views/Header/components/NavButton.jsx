import React from 'react';
import { Stack, Text } from '@chakra-ui/react';
import { NavLink } from 'react-router-dom';

function NavButton({ name, to }) {
   return (
      <Stack mr="2">
         <NavLink to={to}>
            <Stack py="2.5" px="3.5" borderRadius="xl" sx={{".active &, a:hover &": { color: "white" }}}>
               <Text fontWeight="500" fontSize="13px">{name}</Text>
            </Stack>
         </NavLink>
      </Stack>
   );
}

export default NavButton;
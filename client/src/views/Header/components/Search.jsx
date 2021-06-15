import React from 'react';
import { Box, Input } from '@chakra-ui/react';

function Search(props) {
   return (
      <Box mr="4">
         <Input pr="5rem" placeholder="Search..." fontSize="sm" />
      </Box>
   );
}

export default Search;
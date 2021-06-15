import React from 'react';
import { Flex, Text } from '@chakra-ui/react';

function ModalContentBlock({ name, children, ...rest }) {
   return (
      <Flex mt={2} mb={8} {...rest}>
         <Text minW="100px" fontWeight="500" fontSize="sm">{name}</Text>
         {children}
      </Flex>
   );
}

export default ModalContentBlock;
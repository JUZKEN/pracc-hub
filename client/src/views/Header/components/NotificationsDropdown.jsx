import React from 'react';
import { IconButton, Box, Icon } from '@chakra-ui/react';
import { FaBell } from "react-icons/fa";

function NotificationsDropdown(props) {
   return (
      <Box mr="4">
         <IconButton aria-label="Notifications" size="md" icon={<Icon as={FaBell} />} />
      </Box>
   );
}

export default NotificationsDropdown;
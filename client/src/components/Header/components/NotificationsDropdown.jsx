import React from 'react';
import { IconButton, Box } from '@chakra-ui/react';
import { BellIcon } from '@chakra-ui/icons';

function NotificationsDropdown(props) {
   return (
      <Box mr="4">
         <IconButton aria-label="Notifications" size="md" icon={<BellIcon />} />
      </Box>
   );
}

export default NotificationsDropdown;
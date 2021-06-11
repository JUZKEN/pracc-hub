import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar, AvatarBadge } from '@chakra-ui/react';

function UserAvatar(props) {
   return (
      <Link to="/profile">
         <Avatar size="sm" bg="gray.600" mr="2">
            <AvatarBadge boxSize="1em" bg="green.500" />
         </Avatar>
      </Link>
   );
}

export default UserAvatar;
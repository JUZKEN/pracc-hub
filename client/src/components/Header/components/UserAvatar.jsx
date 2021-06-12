import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, AvatarBadge } from '@chakra-ui/react';

function UserAvatar(props) {
   return (
      <NavLink to="/profile">
         <Avatar size="sm" bg="gray.600" mr="2">
            <AvatarBadge boxSize="1em" bg="green.500" />
         </Avatar>
      </NavLink>
   );
}

export default UserAvatar;
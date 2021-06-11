import React from 'react';
import { Flex, Image, Box } from '@chakra-ui/react';
import UserAvatar from './components/UserAvatar';
import NotificationsDropdown from './components/NotificationsDropdown';
import Search from './components/Search';
import NavButton from './components/NavButton';
import { Link } from 'react-router-dom';

function Header(props) {
   return (
      <Box id="header" bg="gray.800" w="100%">
         <Flex justify="space-between" px={5} py={3}>
            <Flex align="center">
               <Link to="/">
                  <Image src={process.env.PUBLIC_URL+'/img/pracchub-logo.svg'} w="140px" />
               </Link>
               <Flex as="nav" mx="5">
                  <NavButton name="Find Scrims" to="/scrims" />
                  <NavButton name="Find Hubs" to="/hubs" />
               </Flex>
            </Flex>
            <Flex align="center">
               <Search />
               <NotificationsDropdown />
               <UserAvatar />
            </Flex>
         </Flex>
      </Box>
   );
}

export default Header;
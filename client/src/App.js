import React, { Component } from 'react';
import { ChakraProvider, Stack, Flex, Image } from "@chakra-ui/react";
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import theme from './theme/index';
import MainRoutes from './routes/MainRoutes';

class App extends Component {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <Stack h="100vh" overflowY="hidden">
          <Header />
          <Flex h="100%" mt="0 !important">
            <Stack w="100%">
              <Image src={process.env.PUBLIC_URL+'/img/valorant-wallpaper.png'} objectFit="cover" w="100%" h="150px" opacity="0.15" />
              <Stack p="16">
               <MainRoutes />
              </Stack>
            </Stack>
            <Sidebar />
          </Flex>
        </Stack>
      </ChakraProvider>
    );
  }
}

export default App;
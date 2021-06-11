import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';
import { ChakraProvider, Stack, Flex } from "@chakra-ui/react";
import Header from './components/Header/Header';
import Sidebar from './components/Sidebar/Sidebar';
import Scrims from './components/Scrims/Scrims';
import theme from './theme/index';

class App extends Component {
  render() {
    return (
      <ChakraProvider theme={theme}>
        <Stack h="100vh" overflowY="hidden">
          <Header />
          <Flex h="100%" mt="0 !important">
            <Stack p="16" w="100%">
              <Switch>
                <Route path="/scrims" component={Scrims} />
                <Redirect to="/scrims" />
              </Switch>
            </Stack>
            <Sidebar />
          </Flex>
        </Stack>
      </ChakraProvider>
    );
  }
}

export default App;
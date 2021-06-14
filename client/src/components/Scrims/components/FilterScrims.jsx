import React, { useState } from 'react';
import { MdFilterList } from "react-icons/md";
import { Flex, Text, useDisclosure, Box, Button, Icon, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import ButtonList from './ButtonList';
import MapList from './MapList';

const maps = ["bind", "ascent", "haven", "split", "icebox", "breeze"]; // TODO: Copy this to a constants file
const hubs = [{ id: 1, name: "Noobs" }, { id: 2, name: "Pediks" }, { id: 3, name: "Pros" }]; // TODO: Get active team's hubs from backend

function FilterScrims({ onFilter }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [ filters, setFilters ] = useState({
      hubs: {
         index: [...hubs],
         selected: hubs.map(hub => hub.id)
      },
      maps: {
         index: [...maps],
         selected: [...maps]
      }
   });

   const handleSelect = (id, name) => {
      let selectedItems = filters[name].selected;
      isSelected(id, name) ? selectedItems.splice(selectedItems.indexOf(id), 1) : selectedItems.push(id);
      setFilters({...filters});
      onFilter(filters);
   }

   const isSelected = (id, name) => filters[name].selected.includes(id);

   return (
      <Box>
         <Button onClick={onOpen} rightIcon={<Icon as={MdFilterList} />}>Filter</Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="xl" >
               <ModalHeader>Filter Scrims</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <Flex mt={2} mb={8}>
                     <Text minW="100px" fontWeight="500" fontSize="sm">Hubs</Text>
                     <ButtonList
                        name="hubs"
                        items={filters.hubs.index}
                        isSelected={isSelected}
                        onSelect={handleSelect} />
                  </Flex>
                  <Flex>
                     <Text minW="100px" fontWeight="500" fontSize="sm">Maps</Text>
                     <MapList
                        items={filters.maps.index}
                        isSelected={isSelected}
                        onSelect={handleSelect} />
                  </Flex>
               </ModalBody>
               <ModalFooter>
                  
               </ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   );
}

export default FilterScrims;
import React, { useState } from 'react';
import { MdFilterList } from "react-icons/md";
import { useDisclosure, Box, Button, Icon, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalCloseButton, ModalFooter } from '@chakra-ui/react';
import ButtonList from '../../../components/ButtonList';
import MapList from '../../../components/MapList';
import ModalContentBlock from '../../../components/ModalContentBlock';
import { VALORANT_MAPS } from '../../../constants';

const hubs = [{ id: 1, name: "Noobs" }, { id: 2, name: "Pediks" }, { id: 3, name: "Pros" }]; // TODO: Get active team's hubs from backend

function FilterScrims({ onFilter }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [ filters, setFilters ] = useState({
      hubs: hubs.map(hub => hub.id),
      maps: [...VALORANT_MAPS]
   });

   const handleSelect = (id, name) => {
      let selectedItems = filters[name];
      isSelected(id, name) ? selectedItems.splice(selectedItems.indexOf(id), 1) : selectedItems.push(id);
      setFilters({...filters});
      onFilter(filters);
   }
   const isSelected = (id, name) => filters[name].includes(id);

   return (
      <Box>
         <Button onClick={onOpen} rightIcon={<Icon as={MdFilterList} />}>Filter</Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="xl" >
               <ModalHeader>Filter Scrims</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <ModalContentBlock name="Hubs">
                     <ButtonList
                        name="hubs"
                        items={hubs}
                        isSelected={isSelected}
                        onSelect={handleSelect}
                        showAvatar={true} />
                  </ModalContentBlock>
                  <ModalContentBlock name="Maps">
                     <MapList
                        items={VALORANT_MAPS}
                        isSelected={isSelected}
                        onSelect={handleSelect} />
                  </ModalContentBlock>
               </ModalBody>
               <ModalFooter></ModalFooter>
            </ModalContent>
         </Modal>
      </Box>
   );
}

export default FilterScrims;
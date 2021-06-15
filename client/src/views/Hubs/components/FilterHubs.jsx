import React, { useState } from 'react';
import { MdFilterList } from "react-icons/md";
import { useDisclosure, Box, Button, Icon, Modal, ModalOverlay, ModalBody, ModalContent, ModalHeader, ModalCloseButton } from '@chakra-ui/react';
import ModalContentBlock from '../../../components/ModalContentBlock';
import ButtonList from '../../../components/ButtonList';
import { HUB_TYPES } from '../../../constants';

function FilterHubs({ onFilter }) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [ filters, setFilters ] = useState({
      type: [...HUB_TYPES]
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
               <ModalHeader>Filter Hubs</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <ModalContentBlock name="Type">
                     <ButtonList
                        name="type"
                        items={HUB_TYPES}
                        onSelect={handleSelect}
                        isSelected={isSelected}
                        onlySingleValueAllowed={true}
                        isObjectsArray={false}
                        textTransform="capitalize" />
                  </ModalContentBlock>
               </ModalBody>
            </ModalContent>
         </Modal>
      </Box>
   );
}

export default FilterHubs;
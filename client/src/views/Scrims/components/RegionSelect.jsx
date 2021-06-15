import React from 'react';
import { useDisclosure, Image, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import ButtonList from '../../../components/ButtonList';
import RegionFlag from '../../../components/RegionFlag';
import { ALLOWED_REGIONS } from '../../../constants';

function RegionSelect({ current, onSelect }) {
   const { isOpen, onOpen, onClose } = useDisclosure();

   const isSelected = (value) => value === current;

   return (
      <React.Fragment>
         <Button
            onClick={onOpen}
            textTransform="uppercase"
            size="sm"
            pr="4"
            mt="1"
            leftIcon={<RegionFlag region={current} />}>
            {current}
         </Button>
         <Modal size="sm" isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="xl">
               <ModalHeader>Select region</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <ButtonList
                     name="region"
                     items={ALLOWED_REGIONS}
                     isSelected={isSelected}
                     onSelect={(value) => {
                        onSelect(value);
                        onClose();
                     }}
                     onlySingleValueAllowed={true}
                     isObjectsArray={false}
                     textTransform="uppercase"
                     showRegionFlag={true} />
               </ModalBody>
               <ModalFooter>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </React.Fragment>
   );
}

export default RegionSelect;
import React, { useState } from 'react';
import { useDisclosure, Button, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter } from '@chakra-ui/react';
import ModalContentBlock from '../../../components/ModalContentBlock';
import ButtonList from '../../../components/ButtonList';
import MapList from '../../../components/MapList';
import { ALLOWED_REGIONS, VALORANT_MAPS } from '../../../constants';

const hubs = [{ id: 1, name: "Noobs" }, { id: 2, name: "Pediks" }, { id: 3, name: "Pros" }]; // TODO: Get active team's hubs from backend

function CreateScrim(props) {
   const { isOpen, onOpen, onClose } = useDisclosure();
   const [ values, setValues ] = useState({
      region: ALLOWED_REGIONS[0],
      hub: hubs[0].id,
      maps: [...VALORANT_MAPS]
   });

   const handleCreate = () => {}

   const handleSelect = (id, name) => {
      let selectedItems = values[name];
      isSelected(id, name) ? selectedItems.splice(selectedItems.indexOf(id), 1) : selectedItems.push(id);
      setValues({...values});
   }

   const handleSelectSingleValue = (id, name) => {
      values[name] = id;
      setValues({...values});
   }

   const isSelected = (id, name) => values[name].includes(id);
   const isSelectedSingleValue = (id, name) => values[name] === id;

   return (
      <React.Fragment>
         <Button onClick={onOpen} variant="red">Create scrim</Button>
         <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent borderRadius="xl">
               <ModalHeader>Create Scrim</ModalHeader>
               <ModalCloseButton />
               <ModalBody>
                  <ModalContentBlock name="Region">
                     <ButtonList
                        name="region"
                        items={ALLOWED_REGIONS}
                        isSelected={isSelectedSingleValue}
                        onSelect={handleSelectSingleValue}
                        onlySingleValueAllowed={true}
                        isObjectsArray={false}
                        textTransform="uppercase" />
                  </ModalContentBlock>
                  <ModalContentBlock name="Hubs">
                     <ButtonList
                        name="hub"
                        items={hubs}
                        isSelected={isSelectedSingleValue}
                        onSelect={handleSelectSingleValue}
                        onlySingleValueAllowed={true}
                        showAvatar={true} />
                  </ModalContentBlock>
                  <ModalContentBlock name="Maps">
                     <MapList
                        name="maps"
                        items={VALORANT_MAPS}
                        isSelected={isSelected}
                        onSelect={handleSelect} />
                  </ModalContentBlock>
               </ModalBody>
               <ModalFooter>
                  <Button variant="red" onClick={() => {
                     handleCreate();
                     onClose();
                  }}>
                     Create Scrim
                  </Button>
               </ModalFooter>
            </ModalContent>
         </Modal>
      </React.Fragment>
   );
}

export default CreateScrim;
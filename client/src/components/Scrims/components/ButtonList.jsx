import React from 'react';
import { ButtonGroup, Button, Avatar } from '@chakra-ui/react';

function ButtonList({ name, items, isSelected, onSelect, textProperty, valueProperty }) {
   return (
      <ButtonGroup>
         {items.map(item => {
            return(
               <Button
                  key={item[valueProperty]}
                  onClick={() => onSelect(item[valueProperty], name)}
                  isActive={isSelected(item[valueProperty], name)}
                  leftIcon={<Avatar bg="gray.600" name={item[textProperty]} size="xs" />}>
                  {item[textProperty]}
               </Button>
            )
         })}
      </ButtonGroup>
   );
}

ButtonList.defaultProps = {
   textProperty: "name",
   valueProperty: "id"
}

export default ButtonList;
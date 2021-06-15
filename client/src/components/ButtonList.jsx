import React from 'react';
import { ButtonGroup, Button, Avatar } from '@chakra-ui/react';

function ButtonList({ name, items, isSelected, onSelect, showAvatar, textProperty, valueProperty, onlySingleValueAllowed, isObjectsArray, ...rest }) {
   return (
      <ButtonGroup>
         {items.map(item => {
            const [value, text] = [!isObjectsArray ? item : item[valueProperty], !isObjectsArray ? item : item[textProperty]];
            return(
               <Button
                  key={value}
                  onClick={() => onSelect(value, name)}
                  isActive={isSelected(value, name)}
                  leftIcon={showAvatar && <Avatar bg="gray.600" name={text} size="xs" />}
                  {...rest}>
                  {text}
               </Button>
            )
         })}
      </ButtonGroup>
   );
}

ButtonList.defaultProps = {
   textProperty: "name",
   valueProperty: "id",
   onlySingleValueAllowed: false,
   isObjectsArray: true,
   items: []
}

export default ButtonList;
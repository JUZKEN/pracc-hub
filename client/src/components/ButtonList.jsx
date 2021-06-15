import React from 'react';
import { ButtonGroup, Button, Avatar } from '@chakra-ui/react';
import RegionFlag from './RegionFlag';

function ButtonList({ name, items, isSelected, onSelect, showAvatar, showRegionFlag, textProperty, valueProperty, onlySingleValueAllowed, isObjectsArray, ...rest }) {
   return (
      <ButtonGroup>
         {items.map(item => {
            const [value, text] = [!isObjectsArray ? item : item[valueProperty], !isObjectsArray ? item : item[textProperty]];
            return(
               <Button
                  key={value}
                  onClick={() => onSelect(value, name)}
                  isActive={isSelected(value, name)}
                  leftIcon={
                     showAvatar ? <Avatar bg="gray.600" name={text} size="xs" /> :
                     showRegionFlag && <RegionFlag region={value} />
                  }
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
import React from 'react';
import { Image } from '@chakra-ui/react';

function RegionFlag({ region }) {
   return (
      <Image boxSize="26" src={process.env.PUBLIC_URL+`/img/flags/${region}.svg`} />
   );
}

export default RegionFlag;
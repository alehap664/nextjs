import React from 'react';
import { css } from '@emotion/react';
import { OptionSelect } from '../../types';

type ItemListProps = {
  options: (OptionSelect & { checked: boolean })[];
};

const ItemList: React.FC<ItemListProps> = ({ options }) => {
  const handleClick = () => {
    
  }
  return (
    <>
      {options 
        ? options.map(opt => (
          <div key={opt.value} onClick={handleClick}>{opt.label}</div>
        ))
        : <div>No Options</div>
      }
    </>
  )
};

export default ItemList;
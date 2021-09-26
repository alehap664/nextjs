import React from 'react';
import { css } from '@emotion/react';

const Effect = ({ children }: { children: React.ReactNode }) => {
  return (
    <div css={css({ boxShadow: '0px 6px 12px rgb(140 152 164 / 25%)' })}>{ children }</div>
  )
};

export default Effect;
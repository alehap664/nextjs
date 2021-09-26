import React from 'react';
import { css, SerializedStyles } from '@emotion/react';
import Close from './svg/Close';

const icons = {
  close: Close,
};

export type IconType = keyof typeof icons;

export type SVG = {
  width?: string
  height?: string
};

export type Icon = {
  type: IconType
  color?: string
  size?: string
  customStyle?: SerializedStyles
  onClick?: () => void
}

const Icon: React.FC<Icon> = ({ type, color, size, customStyle, onClick }) => {
  const RenderIcon = icons[type];
  if (RenderIcon) {
    return (
      <span css={css({ display: 'flex', justifyContent: 'center', alignItems: 'center' }, customStyle)} onClick={onClick}>
        <RenderIcon
          width={size}
          height={size}
          css={css({
            fontSize: size || '12px',
            fill: color || 'black',
            width: size || 'auto',
            height: size || 'auto',
          })}
        />
      </span>
    )
  }
  return null;
};

export default Icon;